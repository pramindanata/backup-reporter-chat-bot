import { joi } from '../shared/utils/joi';

export const successSchema = joi.object({
  computerName: joi.string().required().trim(),
  projectName: joi.string().required().trim(),
  ip: joi.string().required().trim(),
  startedAt: joi.date().required(),
  finishedAt: joi.date().required(),
  dbName: joi.string().required().trim(),
  dbType: joi
    .string()
    .required()
    .trim()
    .valid('PostgreSQL', 'MySQL', 'MongoDB'),
  fileSize: joi.number().required().min(0),
  filePath: joi.string().required().trim(),
});

export const failedSchema = joi.object({
  computerName: joi.string().required().trim(),
  projectName: joi.string().required().trim(),
  ip: joi.string().required().trim(),
  startedAt: joi.date().required(),
  dbName: joi.string().required().trim(),
  dbType: joi
    .string()
    .required()
    .trim()
    .valid('PostgreSQL', 'MySQL', 'MongoDB'),
  message: joi.string().required().trim(),
});
