import type { Context } from 'hono';
import type { ZodError, ZodObject, ZodRawShape } from 'zod';
import { serveUnprocessableEntity } from '../controller/resp/error.js';

const getErrorPhrase = (error: ZodError) => {
  const path = error.issues[0].path[0];
  const message = error.issues[0].message;
  return `${path}: ${message}`;
};

const validateSchema = <T extends ZodRawShape>(c: Context, schema: ZodObject<T>, value: unknown) => {
  const parsed = schema.safeParse(value);
  if (!parsed.success) {
    return serveUnprocessableEntity(c, getErrorPhrase(parsed.error));
  }
  return parsed.data;
};

export { getErrorPhrase, validateSchema };
