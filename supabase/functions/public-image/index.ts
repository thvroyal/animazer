import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js';
import { Database, Tables } from '../_shared/database.types.ts';
import { WebhookPayload } from '../_shared/webhook.types.ts';

type ImagesRecord = Tables<'images'>;

Deno.serve(async (req) => {
  const payload: WebhookPayload<ImagesRecord> = await req.json();
  const { is_public: isPublic, id } = payload.record;
  const { is_public: oldIsPublic } = payload.old_record || {};

  if (isPublic === oldIsPublic) {
    return new Response('ok - not change');
  }

  const supabase = createClient<Database>(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  const oldPath = oldIsPublic ? `public/${id}.jpeg` : `${id}.jpeg`;
  const newPath = isPublic ? `public/${id}.jpeg` : `${id}.jpeg`;

  const { error } = await supabase.storage
    .from('animazer')
    .move(oldPath, newPath);

  if (error) return new Response(error?.message);

  return new Response(`ok - moved file to ${isPublic ? 'public' : 'private'}`);
});
