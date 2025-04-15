import type { FastifyPluginAsyncZod } from "fastify-type-provider-zod";

export const saveUrlRoute: FastifyPluginAsyncZod = async (server) => {
	server.post("/save-url", async (request, reply) => {
		return "Hello World";
	});
};
