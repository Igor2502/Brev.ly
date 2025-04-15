import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeError, makeSuccess } from "@/shared/either";
import { eq } from "drizzle-orm";
import { UrlNotFound } from "./errors/url-not-found";

export async function deleteUrl(
	urlId: string,
): Promise<Either<UrlNotFound, { urlId: string }>> {
	const urlExists = await db
		.select()
		.from(schema.urls)
		.where(eq(schema.urls.id, urlId))
		.limit(1);

	if (urlExists.length === 0) {
		return makeError(new UrlNotFound("URL not found"));
	}

	const deletedUrl = await db
		.delete(schema.urls)
		.where(eq(schema.urls.id, urlId))
		.returning();

	return makeSuccess({ urlId: deletedUrl[0].id });
}
