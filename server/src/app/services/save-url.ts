import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeError, makeSuccess } from "@/shared/either";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { InvalidUrlFormat } from "./errors/invalid-url-format";
import { UrlAlreadyExists } from "./errors/url-already-exists";

const saveUrlInput = z.object({
	originalUrl: z.string().url(),
	compactUrl: z.string(),
});

type SaveUrlInput = z.input<typeof saveUrlInput>;

export async function saveUrl(
	data: SaveUrlInput,
): Promise<Either<InvalidUrlFormat | UrlAlreadyExists, { urlId: string }>> {
	const { originalUrl, compactUrl } = data;

	if (!URL.canParse("", originalUrl)) {
		return makeError(new InvalidUrlFormat("Informe uma URL válida"));
	}

	if (!/^[a-z0-9-]+$/.test(compactUrl)) {
		return makeError(
			new InvalidUrlFormat(
				"Informe uma URL minúscula e sem espaço/caracter especial",
			),
		);
	}

	const compactUrlAlreadyExists = await db.$count(
		schema.urls,
		eq(schema.urls.compactUrl, compactUrl),
	);
	if (compactUrlAlreadyExists > 0) {
		return makeError(new UrlAlreadyExists("Essa URL encurtada já existe."));
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

	return makeSuccess({ urlId: savedUrl.id });
}
