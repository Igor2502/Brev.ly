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
					409: z.object({ message: z.string() }).describe("URL already exists"),
				},
			},
		},
		async (request, reply) => {
			return reply.status(201).send({ urlId: "123456789" });
		},
	);
};
