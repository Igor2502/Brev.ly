import { findUrlById } from "@/app/services/find-url";
import { incrementUrlAccessCount } from "@/app/services/increment-url-access";
import { isSuccess, unwrapEither } from "@/shared/either";
import type { FastifyPluginAsync } from "fastify";
import { z } from "zod";

export const accessUrlRoute: FastifyPluginAsync = async (server) => {
	server.get(
		"/:urlId",
		{
			schema: {
				summary: "Access a URL",
				description:
					"Redirect to the original URL using the compact URL ⚠️ This route redirects to an external domain and cannot be tested via Swagger UI.",
				params: z.object({
					urlId: z.string().uuid(),
				}),
				response: {
					302: z.object({}).describe("Redirect to the original URL"),
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
				await incrementUrlAccessCount({ urlId, accessCount: url.accessCount });

				return reply.status(302).redirect(url.originalUrl);
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
