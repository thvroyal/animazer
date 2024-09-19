drop trigger if exists "publicise" on "public"."images";

CREATE TRIGGER "public-image" AFTER UPDATE ON public.images FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('http://host.docker.internal:54321/functions/v1/public-image', 'POST', '{"Content-type":"application/json"}', '{}', '1000');


