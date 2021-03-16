import baseJoi from 'joi';

export type PayloadSource = 'body' | 'params' | 'query';

export const joi = baseJoi.defaults((schema) =>
  schema.options({
    abortEarly: false,
    convert: true,
    stripUnknown: true,
    errors: {
      escapeHtml: true,
    },
  }),
);
