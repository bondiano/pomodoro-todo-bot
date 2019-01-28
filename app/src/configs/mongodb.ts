import * as joi from 'joi';

const envVarsSchema = joi.object({
  MONGO_DB_URL: joi.string().required(),
  MONGO_DB_USERNAME: joi.string().required(),
  MONGO_DB_PASSWORD: joi.string().required(),
  MONGO_DB_PORT: joi.string().required(),
}).unknown().required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  MONGO_DB_URL: envVars.MONGO_DB_URL,
  MONGO_DB_USERNAME: envVars.REDIS_HOST || '',
  MONGO_DB_PASSWORD: envVars.REDIS_PASSWORD || '',
  MONGO_DB_PORT: +envVars.MONGO_DB_PORT,
};

export default config;
