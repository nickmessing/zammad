CREATE TABLE IF NOT EXISTS "ticket_comments" (
	"id" char(24) PRIMARY KEY NOT NULL,
	"comment" text NOT NULL,
	"author_id" char(24) NOT NULL,
	"ticket_id" char(24) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ticket_comments_created_at_unique" UNIQUE("created_at")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "tickets" (
	"id" char(24) PRIMARY KEY NOT NULL,
	"title" varchar(64) NOT NULL,
	"description" text NOT NULL,
	"status_id" char(24) NOT NULL,
	"author_id" char(24) NOT NULL,
	"assignee_id" char(24),
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "tickets_created_at_unique" UNIQUE("created_at")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "ticket_statuses" (
	"id" char(24) PRIMARY KEY NOT NULL,
	"name" varchar(64) NOT NULL,
	"description" varchar(255) NOT NULL,
	"colorHue" integer NOT NULL,
	"colorSaturation" integer NOT NULL,
	"order" integer NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "ticket_statuses_created_at_unique" UNIQUE("created_at")
);
--> statement-breakpoint
CREATE TABLE IF NOT EXISTS "users" (
	"id" char(24) PRIMARY KEY NOT NULL,
	"username" varchar(32) NOT NULL,
	"display_name" varchar(64) NOT NULL,
	"created_at" timestamp DEFAULT now() NOT NULL,
	"updated_at" timestamp DEFAULT now() NOT NULL,
	CONSTRAINT "users_created_at_unique" UNIQUE("created_at")
);
--> statement-breakpoint
CREATE UNIQUE INDEX IF NOT EXISTS "username_idx" ON "users" ("username");--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ticket_comments" ADD CONSTRAINT "ticket_comments_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "ticket_comments" ADD CONSTRAINT "ticket_comments_ticket_id_tickets_id_fk" FOREIGN KEY ("ticket_id") REFERENCES "tickets"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets" ADD CONSTRAINT "tickets_status_id_ticket_statuses_id_fk" FOREIGN KEY ("status_id") REFERENCES "ticket_statuses"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets" ADD CONSTRAINT "tickets_author_id_users_id_fk" FOREIGN KEY ("author_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
--> statement-breakpoint
DO $$ BEGIN
 ALTER TABLE "tickets" ADD CONSTRAINT "tickets_assignee_id_users_id_fk" FOREIGN KEY ("assignee_id") REFERENCES "users"("id") ON DELETE cascade ON UPDATE no action;
EXCEPTION
 WHEN duplicate_object THEN null;
END $$;
