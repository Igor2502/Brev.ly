import { env } from "@/env";
import { fastifyCors } from "@fastify/cors";
import { fastify } from "fastify";

const server = fastify();

server.register(fastifyCors, { origin: "*" });

const port = +(env.PORT || 3000);
server.listen({ port, host: "0.0.0.0" }).then(() => {
	console.log(`Server is running on http://localhost:${port}`);
	console.log("Press CTRL+C to stop the server");
});
