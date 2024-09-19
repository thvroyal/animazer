import {
  FunctionsFetchError,
  FunctionsHttpError,
  FunctionsRelayError,
} from 'jsr:@supabase/supabase-js';

// deno-lint-ignore no-explicit-any
export async function handleError(error: any) {
  if (error instanceof FunctionsHttpError) {
    const errorMessage = await error.context.json();
    console.log('Function returned an error', errorMessage);
    return { message: errorMessage };
  } else if (error instanceof FunctionsRelayError) {
    console.log('Relay error:', error.message);
    return { message: error.message };
  } else if (error instanceof FunctionsFetchError) {
    console.log('Fetch error:', error.message);
    return { message: error.message };
  }
}
