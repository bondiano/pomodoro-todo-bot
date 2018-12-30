import * as joi from 'joi';

const envVarsSchema = joi.object({
  BOT_TOKEN: joi.string().required(),
  PUBLIC_HOST: joi.string().required(),
  HOST: joi.string().required(),
  PORT: joi.string().required(),
  SECRET_PATH: joi.string().required()
}).unknown().required();

const { error, value: envVars } = joi.validate(process.env, envVarsSchema);
if (error) {
  throw new Error(`Config validation error: ${error.message}`);
}

const config = {
  BOT_TOKEN: envVars.BOT_TOKEN,
  PUBLIC_HOST: envVars.PUBLIC_HOST,
  HOST: envVars.HOST,
  PORT: Number(envVars.PORT),
  SECRET_PATH: envVars.SECRET_PATH
};

export default config;
