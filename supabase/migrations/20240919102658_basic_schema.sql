drop trigger if exists "generate-image" on "public"."images";

create policy "user can public the images"
on "public"."images"
as permissive
for update
to authenticated
using ((auth.uid() = created_by));



