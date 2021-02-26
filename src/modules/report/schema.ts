import { joi } from '@/lib/joi';

export const storeSchema = joi.object({
  status: joi.string().required().trim().valid('Success', 'Failed'),
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
