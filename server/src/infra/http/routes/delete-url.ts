import { deleteUrl } from "@/app/services/delete-url";
import { isSuccess, unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const deleteUrlRoute: FastifyPluginAsyncZod = async (server) => {
	server.delete(
		"/delete-url/:urlId",
		{
			schema: {
				summary: "Delete a URL by ID",
				description: "Delete a URL by its unique ID",
				params: z.object({
					urlId: z.string().uuid(),
				}),
				response: {
					200: z
						.object({ message: z.string() })
						.describe("URL deleted successfully"),
					404: z.object({ message: z.string() }).describe("URL not found"),
					500: z
						.object({ message: z.string() })
						.describe("Internal Server Error"),
				},
			},
		},
		async (request, reply) => {
			const { urlId } = request.params as { urlId: string };

			const result = await deleteUrl(urlId);

			if (isSuccess(result)) {
				return reply.status(200).send({ message: "URL deleted successfully" });
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
