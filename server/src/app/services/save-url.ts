import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { eq } from "drizzle-orm";
import { z } from "zod";

const saveUrlInput = z.object({
	originalUrl: z.string().url(),
	compactUrl: z.string(),
});

type SaveUrlInput = z.input<typeof saveUrlInput>;

export async function saveUrl(data: SaveUrlInput) {
	const { originalUrl, compactUrl } = data;

	if (!URL.canParse("", originalUrl)) {
		throw new Error("Informe uma URL válida");
	}

	if (!/^[a-z0-9-]+$/.test(compactUrl)) {
		throw new Error("Informe uma URL minúscula e sem espaço/caracter especial");
	}

	const compactUrlAlreadyExists = await db.$count(
		schema.urls,
		eq(schema.urls.compactUrl, compactUrl),
	);
	if (compactUrlAlreadyExists > 0) {
		throw new Error("Essa URL encurtada já existe.");
	}

	const savedUrl = (
		await db
			.insert(schema.urls)
			.values({
				originalUrl,
				compactUrl,
			})
			.returning()
	)[0];

	return {
		urlId: savedUrl.id,
	};
}
