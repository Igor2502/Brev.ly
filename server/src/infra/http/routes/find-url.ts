import { findUrlById } from "@/app/services/find-url";
import { isSuccess, unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const findUrlRoute: FastifyPluginAsyncZod = async (server) => {
	server.get(
		"/find-url/:urlId",
		{
			schema: {
				summary: "Find a URL by ID",
				description: "Find a URL by its unique ID",
				params: z.object({
					urlId: z.string().uuid(),
				}),
				response: {
					200: z
						.object({
							originalUrl: z.string().url(),
							compactUrl: z.string(),
							createdAt: z.date(),
						})
						.describe("URL found successfully"),
					404: z.object({ message: z.string() }).describe("URL not found"),
					500: z
						.object({ message: z.string() })
						.describe("Internal Server Error"),
				},
			},
		},
		async (request, reply) => {
			const { urlId } = request.params as { urlId: string };

			const result = await findUrlById(urlId);

			if (isSuccess(result)) {
				const url = unwrapEither(result);

				return reply.status(200).send({
					originalUrl: url.originalUrl,
					compactUrl: url.compactUrl,
					createdAt: url.createdAt,
				});
			}

			const error = unwrapEither(result);

			switch (error.constructor.name) {
				case "UrlNotFound":
					return reply.status(404).send({ message: error.message });
				default:
					return reply.status(500).send({ message: "Internal Server Error" });
			}
		},
	);
};
