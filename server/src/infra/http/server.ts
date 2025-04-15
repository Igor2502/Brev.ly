import { env } from "@/env";
import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";
import {
	hasZodFastifySchemaValidationErrors,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { saveUrlRoute } from "./routes/save-url";

const server = fastify();

server.setValidatorCompiler(validatorCompiler);
server.setSerializerCompiler(serializerCompiler);

server.setErrorHandler((error, request, reply) => {
	if (hasZodFastifySchemaValidationErrors(error)) {
		reply.status(400).send({
			message: "Validation error",
			issues: error.validation,
		});
	}

	console.error(error);
	reply.status(500).send({ error: "Internal Server Error" });
});

server.register(fastifyCors, {
	origin: "*",
});

server.register(fastifyCors, { origin: "*" });

server.register(saveUrlRoute);

const port = +(env.PORT || 3000);
server.listen({ port, host: "0.0.0.0" }).then(() => {
	console.log(`Server is running on http://localhost:${port}`);
	console.log("Press CTRL+C to stop the server");
});
