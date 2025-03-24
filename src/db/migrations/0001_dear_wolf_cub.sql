CREATE TABLE "blog" (
	"id" text PRIMARY KEY NOT NULL,
	"user_id" text NOT NULL,
	"blog_name" text NOT NULL,
	"description" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL
);
--> statement-breakpoint
CREATE TABLE "blog_post" (
	"id" text PRIMARY KEY NOT NULL,
	"blog_id" text NOT NULL,
	"title" text NOT NULL,
	"slug" text NOT NULL,
	"elements" text NOT NULL,
	"status" text DEFAULT 'draft',
	"tags" text,
	"created_at" timestamp NOT NULL,
	"updated_at" timestamp NOT NULL,
	"author" text NOT NULL,
	CONSTRAINT "blog_post_slug_unique" UNIQUE("slug")
);
--> statement-breakpoint
ALTER TABLE "blog" ADD CONSTRAINT "blog_user_id_user_id_fk" FOREIGN KEY ("user_id") REFERENCES "public"."user"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_post" ADD CONSTRAINT "blog_post_blog_id_blog_id_fk" FOREIGN KEY ("blog_id") REFERENCES "public"."blog"("id") ON DELETE cascade ON UPDATE no action;--> statement-breakpoint
ALTER TABLE "blog_post" ADD CONSTRAINT "blog_post_author_user_id_fk" FOREIGN KEY ("author") REFERENCES "public"."user"("id") ON DELETE set null ON UPDATE no action;