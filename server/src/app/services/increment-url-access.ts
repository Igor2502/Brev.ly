import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeError, makeSuccess } from "@/shared/either";
import { eq } from "drizzle-orm";
import { z } from "zod";
import { UrlNotFound } from "./errors/url-not-found";

const paramsInput = z.object({
	urlId: z.string().uuid(),
	accessCount: z.number(),
});

type ParamsInput = z.input<typeof paramsInput>;

export async function incrementUrlAccessCount({
	urlId,
	accessCount,
}: ParamsInput): Promise<Either<UrlNotFound, string>> {
	const updated = await db
		.update(schema.urls)
		.set({ accessCount: accessCount + 1 })
		.where(eq(schema.urls.id, urlId))
		.returning({ id: schema.urls.id })
		.execute();

	if (updated.length === 0) {
		return makeError(new UrlNotFound("URL não encontrada"));
	}

	return makeSuccess(updated[0].id);
}
