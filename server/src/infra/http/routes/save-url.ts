import { saveUrl } from "@/app/services/save-url";
import { isSuccess, unwrapEither } from "@/shared/either";
import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";
import { z } from "zod";

export const saveUrlRoute: FastifyPluginAsyncZod = async (server) => {
	server.post(
		"/save-url",
		{
			schema: {
				summary: "Save a URL",
				body: z.object({
					originalUrl: z.string().url(),
					compactUrl: z.string(),
				}),
				response: {
					201: z.object({ urlId: z.string() }),
					400: z.object({ message: z.string() }).describe("Invalid URL format"),
					409: z.object({ message: z.string() }).describe("URL already exists"),
				},
			},
		},
		async (request, reply) => {
			const url = request.body;
			const result = await saveUrl(url);

			if (isSuccess(result)) {
				const { urlId } = unwrapEither(result);
				return reply.status(201).send({ urlId });
			}

			const error = unwrapEither(result);
			switch (error.constructor.name) {
				case "InvalidUrlFormat":
					return reply.status(400).send({ message: error.message });
				case "UrlAlreadyExists":
					return reply.status(409).send({ message: error.message });
				default:
					return reply.status(500).send({ message: "Internal Server Error" });
			}
		},
	);
};
