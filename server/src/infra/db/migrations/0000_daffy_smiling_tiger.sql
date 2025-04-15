CREATE TABLE "urls" (
	"id" text PRIMARY KEY NOT NULL,
	"compact_url" text NOT NULL,
	"original_url" text NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "urls_compact_url_unique" UNIQUE("compact_url")
);
