export interface WebhookPayload<T, TSchema extends string = 'public'> {
  type: 'INSERT' | 'UPDATE' | 'DELETE';
  table: string;
  record: T;
  schema: TSchema;
  old_record: null | T;
}