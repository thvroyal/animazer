import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient } from 'jsr:@supabase/supabase-js';
import { Database, Tables } from '../_shared/database.types.ts';
import { WebhookPayload } from '../_shared/webhook.types.ts';

type ImagesRecord = Tables<'images'>;

const embeddingModel = new Supabase.ai.Session('gte-small');

Deno.serve(async (req) => {
  const payload: WebhookPayload<ImagesRecord> = await req.json();
  const { input, id } = payload.record;

  if (input === payload.old_record?.input || !input) {
    return new Response('ok');
  }

  const supabase = createClient<Database>(
    Deno.env.get('SUPABASE_URL') ?? '',
    Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
  );

  const embedding = await embeddingModel.run(input, {
    mean_pool: true,
    normalize: true,
  });

  // Store in DB
  const { error } = await supabase
    .from('images')
    .update({
      embedding: JSON.stringify(embedding),
    })
    .eq('id', id);

  if (error) console.warn(error.message);

  return new Response('ok - updated');
});
