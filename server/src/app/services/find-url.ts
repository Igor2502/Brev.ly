import { db } from "@/infra/db";
import { schema } from "@/infra/db/schemas";
import { type Either, makeError, makeSuccess } from "@/shared/either";
import { eq } from "drizzle-orm";
import { z } from "zod";
import UrlDTO from "../dtos/url-dto";
import { UrlNotFound } from "./errors/url-not-found";

const urlIdInput = z.string().uuid();

type UrlIdInput = z.input<typeof urlIdInput>;

export async function findUrlById(
	urlId: UrlIdInput,
): Promise<Either<UrlNotFound, UrlDTO>> {
	const url = await db
		.select()
		.from(schema.urls)
		.where(eq(schema.urls.id, urlId))
		.limit(1)
		.execute();

	if (url.length === 0) {
		makeError(new UrlNotFound("URL não encontrada"));
	}

	const urlData = url[0];
	const urlDTO = new UrlDTO({
		id: urlData.id,
		originalUrl: urlData.originalUrl,
		compactUrl: urlData.compactUrl,
		createdAt: urlData.createdAt,
		accessCount: urlData.accessCount,
	});

	return makeSuccess(urlDTO);
}
