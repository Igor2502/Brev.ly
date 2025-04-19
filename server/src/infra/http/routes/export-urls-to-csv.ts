import { PassThrough, Transform } from "node:stream";
import { pipeline } from "node:stream/promises";
import { db, pg } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { uploadFileToStorage } from "@/infra/storage/upload-file-to-storage";
import { stringify } from "csv-stringify";
import { desc } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const exportUrlsToCsvRoute: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/export-urls-to-csv",
		{
			schema: {
				summary: "Export URLs to CSV",
				description: "Export all URLs in the database to a CSV file",
				response: {
					200: z
						.object({
							message: z.string(),
							url: z.string().url(),
						})
						.describe("CSV file exported successfully"),
					500: z
						.object({ message: z.string() })
						.describe("Internal Server Error"),
				},
			},
		},
		async (request, reply) => {
			const { sql, params } = db
				.select()
				.from(schema.urls)
				.orderBy(desc(schema.urls.createdAt))
				.toSQL();

			const cursor = pg.unsafe(sql, params as string[]).cursor(2);

			const csv = stringify({
				delimiter: ",",
				header: true,
				columns: [
					{ key: "id", header: "ID" },
					{ key: "originalUrl", header: "Original URL" },
					{ key: "compactUrl", header: "Short URL" },
					{ key: "accessCount", header: "Access Count" },
					{ key: "createdAt", header: "Created At" },
				],
			});

			const uploadToStorageStream = new PassThrough();

			const convertToCSVPipeline = pipeline(
				cursor,
				new Transform({
					objectMode: true,
					transform(chunks: unknown[], encoding, callback) {
						for (const chunk of chunks) {
							this.push(chunk);
						}
						callback();
					},
				}),
				csv,
				uploadToStorageStream,
			);

			const uploadToStorage = uploadFileToStorage({
				contentType: "text/csv",
				folder: "downloads",
				fileName: `${new Date().toISOString()}-urls.csv`,
				contentStream: uploadToStorageStream,
			});

			const [{ url }] = await Promise.all([
				uploadToStorage,
				convertToCSVPipeline,
			]);

			await convertToCSVPipeline;

			return reply.status(200).send({
				message: "CSV file exported successfully",
				url,
			});
		},
	);
};
