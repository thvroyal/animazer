create extension if not exists "vector" with schema "public" version '0.7.0';

create table "public"."images" (
    "id" uuid not null default gen_random_uuid(),
    "input" text,
    "created_at" timestamp with time zone not null default now(),
    "created_by" uuid not null default auth.uid(),
    "is_public" boolean not null default false,
    "embedding" vector
);


alter table "public"."images" enable row level security;

CREATE INDEX images_embedding_idx ON public.images USING btree (embedding);

CREATE UNIQUE INDEX images_pkey ON public.images USING btree (id);

alter table "public"."images" add constraint "images_pkey" PRIMARY KEY using index "images_pkey";

alter table "public"."images" add constraint "images_created_by_fkey" FOREIGN KEY (created_by) REFERENCES auth.users(id) not valid;

alter table "public"."images" validate constraint "images_created_by_fkey";

grant delete on table "public"."images" to "anon";

grant insert on table "public"."images" to "anon";

grant references on table "public"."images" to "anon";

grant select on table "public"."images" to "anon";

grant trigger on table "public"."images" to "anon";

grant truncate on table "public"."images" to "anon";

grant update on table "public"."images" to "anon";

grant delete on table "public"."images" to "authenticated";

grant insert on table "public"."images" to "authenticated";

grant references on table "public"."images" to "authenticated";

grant select on table "public"."images" to "authenticated";

grant trigger on table "public"."images" to "authenticated";

grant truncate on table "public"."images" to "authenticated";

grant update on table "public"."images" to "authenticated";

grant delete on table "public"."images" to "service_role";

grant insert on table "public"."images" to "service_role";

grant references on table "public"."images" to "service_role";

grant select on table "public"."images" to "service_role";

grant trigger on table "public"."images" to "service_role";

grant truncate on table "public"."images" to "service_role";

grant update on table "public"."images" to "service_role";

create policy "authenticated user can insert new image"
on "public"."images"
as permissive
for insert
to authenticated
with check (true);


create policy "everyone can view public images"
on "public"."images"
as permissive
for select
to public
using ((is_public = true));


create policy "user can view the owner images"
on "public"."images"
as permissive
for select
to authenticated
using ((created_by = auth.uid()));


CREATE TRIGGER "generate-image" AFTER INSERT ON public.images FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('http://localhost:54321/functions/v1/generate', 'POST', '{"Content-type":"application/json"}', '{}', '1000');


