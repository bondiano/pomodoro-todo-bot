import * as joi from 'joi';

const isDev = process.env.NODE_ENV !== 'production';

const envVarsSchema = joi.object({
  BOT_TOKEN: joi.string().required(),
  WEBHOOK_DOMAIN: joi.string().required(),
  HOST: joi.string().required(),
  WEBHOOK_PATH: joi.string().required(),
  WEBHOOK_PORT: joi.string(),
  WEBHOOK_KEY: joi.string(),
  WEBHOOK_CERT: joi.string()
}).unknown().required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  BOT_TOKEN: envVars.BOT_TOKEN,
  HOST: envVars.HOST,
  WEBHOOK_PORT: Number(envVars.WEBHOOK_PORT),
  WEBHOOK_PATH: envVars.WEBHOOK_PATH,
  WEBHOOK_DOMAIN: envVars.WEBHOOK_DOMAIN
};

export const tlsOptions = {
  key: !isDev && envVars.WEBHOOK_KEY,
  cert: !isDev && envVars.WEBHOOK_CERT,
};

export default config;
