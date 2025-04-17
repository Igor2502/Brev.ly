import { env } from "@/env";
import { fastifyCors } from "@fastify/cors";
import fastifyMultipart from "@fastify/multipart";
import fastifySwagger from "@fastify/swagger";
import fastifySwaggerUi from "@fastify/swagger-ui";
import { fastify } from "fastify";
import {
	hasZodFastifySchemaValidationErrors,
	jsonSchemaTransform,
	serializerCompiler,
	validatorCompiler,
} from "fastify-type-provider-zod";
import { deleteUrlRoute } from "./routes/delete-url";
import { findUrlRoute } from "./routes/find-url";
import { listUrlsRoute } from "./routes/list-urls";
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

server.register(fastifyMultipart);
server.register(fastifySwagger, {
	openapi: {
		info: {
			title: "Brev.ly",
			version: "1.0.0",
		},
	},
	transform: jsonSchemaTransform,
});
server.register(fastifySwaggerUi, {
	routePrefix: "/docs",
});

server.register(saveUrlRoute);
server.register(deleteUrlRoute);
server.register(findUrlRoute);
server.register(listUrlsRoute);

const port = +(env.PORT || 3000);
server.listen({ port, host: "0.0.0.0" }).then(() => {
	console.log(`Server is running on http://localhost:${port}`);
	console.log("Press CTRL+C to stop the server");
});
