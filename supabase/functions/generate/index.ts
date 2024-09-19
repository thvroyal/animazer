import { HfInference } from 'https://esm.sh/@huggingface/inference@2.8.0';
import 'jsr:@supabase/functions-js/edge-runtime.d.ts';
import { createClient, FunctionsHttpError } from 'jsr:@supabase/supabase-js';
import { Database, Tables } from '../_shared/database.types.ts';
import { handleError } from '../_shared/error-handling.ts';

type GeneratePayload = {
  upload: {
    signedUrl: string;
    token: string;
    path: string;
  };
  record: Tables<'images'>;
};

const hf = new HfInference(Deno.env.get('HUGGINGFACE_KEY'));

Deno.serve(async (req) => {
  const payload: GeneratePayload = await req.json();
  const { input } = payload.record;
  const { token, path } = payload.upload;

  try {
    const supabase = createClient<Database>(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_SERVICE_ROLE_KEY') ?? '',
    );

    if (!input) throw new FunctionsHttpError('Missing input');

    const blobImage = (await hf.request({
      model: 'alvdansen/littletinies',
      inputs: input,
    })) as File;

    const { error } = await supabase.storage
      .from('animazer')
      .uploadToSignedUrl(path, token, blobImage);

    if (error) throw error;

    return new Response('generate::Generated new image');
  } catch (error) {
    const message = await handleError(error);
    return new Response(`Failed with error: ${message}`, { status: 500 });
  }
});
