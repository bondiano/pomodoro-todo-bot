import * as joi from 'joi';

const envVarsSchema = joi.object({
  REDIS_HOST: joi.string().required(),
  REDIS_PORT: joi.string().required(),
  REDIS_PASSWORD: joi.string(),
}).unknown().required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  PASSWORD: envVars.REDIS_PASSWORD || '',
  HOST: envVars.REDIS_HOST,
  PORT: +envVars.REDIS_PORT,
};

export default config;
