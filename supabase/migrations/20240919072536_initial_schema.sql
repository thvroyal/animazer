drop trigger if exists "generate-image" on "public"."images";

CREATE TRIGGER "embedding-prompt" AFTER INSERT OR UPDATE ON public.images FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('http://host.docker.internal:54321/functions/v1/embedding', 'POST', '{"Content-type":"application/json"}', '{}', '1000');

CREATE TRIGGER publicise AFTER UPDATE ON public.images FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('http://host.docker.internal:54321/functions/v1/publicise', 'POST', '{"Content-type":"application/json"}', '{}', '1000');

CREATE TRIGGER "generate-image" AFTER INSERT ON public.images FOR EACH ROW EXECUTE FUNCTION supabase_functions.http_request('http://host.docker.internal:54321/functions/v1/generate', 'POST', '{"Content-type":"application/json"}', '{}', '1000');


