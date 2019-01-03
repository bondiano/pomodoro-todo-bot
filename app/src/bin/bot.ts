import * as fastify from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import Telegraf, { ContextMessageUpdate } from 'telegraf';

import * as configs from '@/configs';
import { registerActions, registerCommands, registerMessages } from '@/handlers';
import { i18nMiddleware, sessionMiddleware } from '@/middlewares';

const configApp = ({ app, bot }: {
  app: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>,
  bot: Telegraf<ContextMessageUpdate>
}): void => {
  app.use(bot.webhookCallback(configs.bot.SECRET_PATH));
};

const configBot = ({ bot }: { bot: Telegraf<ContextMessageUpdate>}): void => {
  bot.telegram.setWebhook(`${configs.bot.PUBLIC_HOST}${configs.bot.SECRET_PATH}`);

  bot.use(sessionMiddleware);
  bot.use(i18nMiddleware);

  registerCommands(bot);
  registerActions(bot);
  registerMessages(bot);

  bot.catch((err) => {
    console.error(err);
  });
};

export const start = async () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const bot = new Telegraf(configs.bot.BOT_TOKEN);
      const app: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
        logger: true
      });

      configApp({app, bot});
      configBot({bot});

      app.listen(configs.bot.PORT, configs.bot.HOST, (error, address) => {
        if (error) {
          return reject(error);
        }
        // tslint:disable-next-line:no-console
        console.log(`Listening from ${__dirname} on ${address}`);
        return resolve();
      });
    } catch (error) {
      console.error(error);
    }
  });
};
