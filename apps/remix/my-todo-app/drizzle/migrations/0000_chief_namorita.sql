CREATE TABLE "todos" (
	"id" serial PRIMARY KEY NOT NULL,
	"title" text NOT NULL,
	"description" text,
	"completed" boolean DEFAULT false,
	"priority" text,
	"created_at" timestamp DEFAULT now()
);
