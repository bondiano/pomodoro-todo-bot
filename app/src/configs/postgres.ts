import * as joi from 'joi';

const envVarsSchema = joi.object({
  POSTGRES_NAME: joi.string().required(),
  POSTGRES_HOST: joi.string().required(),
  POSTGRES_PASSWORD: joi.string().required(),
  POSTGRES_PORT: joi.string().required(),
  POSTGRES_USERNAME: joi.string().required(),
}).unknown().required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  DATABASE: envVars.POSTGRES_NAME,
  HOST: envVars.POSTGRES_HOST,
  PASSWORD: envVars.POSTGRES_PASSWORD,
  PORT: +envVars.POSTGRES_PORT,
  USERNAME: envVars.POSTGRES_USERNAME,
};

export default config;
