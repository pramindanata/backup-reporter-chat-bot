import { joi } from '@/lib/joi';

export const successSchema = joi.object({
  computerName: joi.string().required().trim(),
  projectName: joi.string().required().trim(),
  ip: joi.string().required().trim(),
  startedAt: joi.date().required(),
  finishedAt: joi.date().required(),
  detail: joi.object({
    name: joi.string().required().trim(),
    type: joi
      .string()
      .required()
      .trim()
      .valid('PostgreSQL', 'MySQL', 'MongoDB'),
    fileSize: joi.number().required().min(0),
    filePath: joi.string().required().trim(),
  }),
});

export const failedSchema = joi.object({
  computerName: joi.string().required().trim(),
  projectName: joi.string().required().trim(),
  ip: joi.string().required().trim(),
  startedAt: joi.date().required(),
  detail: joi.object({
    name: joi.string().required().trim(),
    type: joi
      .string()
      .required()
      .trim()
      .valid('PostgreSQL', 'MySQL', 'MongoDB'),
    message: joi.string().required().trim(),
  }),
});
