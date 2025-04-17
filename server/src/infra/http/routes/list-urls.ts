import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { desc } from "drizzle-orm";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const listUrlsRoute: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/list-urls",
		{
			schema: {
				summary: "List all URLs",
				description: "Retrieve a list of all URLs in the database",
				response: {
					200: z
						.array(
							z.object({
								id: z.string().uuid(),
								originalUrl: z.string().url(),
								compactUrl: z.string(),
								createdAt: z.date(),
							}),
						)
						.describe("List of URLs retrieved successfully"),
					500: z
						.object({ message: z.string() })
						.describe("Internal Server Error"),
				},
			},
		},
		async (request, reply) => {
			const urls = await db
				.select()
				.from(schema.urls)
				.orderBy(desc(schema.urls.createdAt))
				.execute();

			return reply.status(200).send(urls);
		},
	);
};
