drop trigger if exists "public-image" on "public"."images";

drop policy "everyone can view public images" on "public"."images";

drop policy "user can public the images" on "public"."images";

drop policy "user can view the owner images" on "public"."images";

alter table "public"."images" drop constraint "images_created_by_fkey";

create table "public"."profiles" (
    "id" uuid not null,
    "updatedAt" timestamp with time zone,
    "username" text,
    "fullName" text,
    "avatarUrl" text
);


alter table "public"."profiles" enable row level security;

alter table "public"."images" drop column "created_at";

alter table "public"."images" drop column "created_by";

alter table "public"."images" drop column "is_public";

alter table "public"."images" add column "createdAt" timestamp with time zone not null default now();

alter table "public"."images" add column "isPublic" boolean not null default false;

alter table "public"."images" add column "profileId" uuid not null default auth.uid();

CREATE UNIQUE INDEX profiles_pkey ON public.profiles USING btree (id);

CREATE UNIQUE INDEX profiles_username_key ON public.profiles USING btree (username);

alter table "public"."profiles" add constraint "profiles_pkey" PRIMARY KEY using index "profiles_pkey";

alter table "public"."images" add constraint "images_profileId_fkey" FOREIGN KEY ("profileId") REFERENCES profiles(id) ON UPDATE CASCADE ON DELETE CASCADE not valid;

alter table "public"."images" validate constraint "images_profileId_fkey";

alter table "public"."profiles" add constraint "profiles_id_fkey" FOREIGN KEY (id) REFERENCES auth.users(id) ON DELETE CASCADE not valid;

alter table "public"."profiles" validate constraint "profiles_id_fkey";

alter table "public"."profiles" add constraint "profiles_username_key" UNIQUE using index "profiles_username_key";

alter table "public"."profiles" add constraint "username_length" CHECK ((char_length(username) >= 3)) not valid;

alter table "public"."profiles" validate constraint "username_length";

alter table "public"."images" add constraint "images_created_by_fkey" FOREIGN KEY ("profileId") REFERENCES auth.users(id) not valid;

alter table "public"."images" validate constraint "images_created_by_fkey";

set check_function_bodies = off;

CREATE OR REPLACE FUNCTION public.handle_new_user()
 RETURNS trigger
 LANGUAGE plpgsql
 SECURITY DEFINER
 SET search_path TO ''
AS $function$
begin
  insert into public.profiles (id, full_name, avatar_url)
  values (new.id, new.raw_user_meta_data->>'full_name', new.raw_user_meta_data->>'avatar_url');
  return new;
end;
$function$
;

grant delete on table "public"."profiles" to "anon";

grant insert on table "public"."profiles" to "anon";

grant references on table "public"."profiles" to "anon";

grant select on table "public"."profiles" to "anon";

grant trigger on table "public"."profiles" to "anon";

grant truncate on table "public"."profiles" to "anon";

grant update on table "public"."profiles" to "anon";

grant delete on table "public"."profiles" to "authenticated";

grant insert on table "public"."profiles" to "authenticated";

grant references on table "public"."profiles" to "authenticated";

grant select on table "public"."profiles" to "authenticated";

grant trigger on table "public"."profiles" to "authenticated";

grant truncate on table "public"."profiles" to "authenticated";

grant update on table "public"."profiles" to "authenticated";

grant delete on table "public"."profiles" to "service_role";

grant insert on table "public"."profiles" to "service_role";

grant references on table "public"."profiles" to "service_role";

grant select on table "public"."profiles" to "service_role";

grant trigger on table "public"."profiles" to "service_role";

grant truncate on table "public"."profiles" to "service_role";

grant update on table "public"."profiles" to "service_role";

create policy "Public profiles are viewable by everyone."
on "public"."profiles"
as permissive
for select
to public
using (true);


create policy "Users can insert their own profile."
on "public"."profiles"
as permissive
for insert
to public
with check ((( SELECT auth.uid() AS uid) = id));


create policy "Users can update own profile."
on "public"."profiles"
as permissive
for update
to public
using ((( SELECT auth.uid() AS uid) = id));


create policy "everyone can view public images"
on "public"."images"
as permissive
for select
to public
using (("isPublic" = true));


create policy "user can public the images"
on "public"."images"
as permissive
for update
to authenticated
using ((auth.uid() = "profileId"));


create policy "user can view the owner images"
on "public"."images"
as permissive
for select
to authenticated
using (("profileId" = auth.uid()));



