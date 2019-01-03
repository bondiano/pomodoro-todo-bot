import * as fastify from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import * as https from 'https';
import Telegraf, { ContextMessageUpdate } from 'telegraf';

import * as configs from '@/configs';
import { registerActions, registerCommands, registerMessages } from '@/handlers';
import { i18nMiddleware, sessionMiddleware } from '@/middlewares';

const configApp = ({ app, bot }: {
  app: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse>,
  bot: Telegraf<ContextMessageUpdate>
}): void => {
  app.use(bot.webhookCallback(configs.bot.WEBHOOK_PATH));
};

const configBot = ({ bot, app }: { bot: Telegraf<ContextMessageUpdate>, app}): void => {
  bot.telegram.setWebhook(`${configs.bot.WEBHOOK_DOMAIN}${configs.bot.WEBHOOK_PATH}`);
  https.createServer(configs.tlsOptions, app).listen(configs.bot.WEBHOOK_PORT, configs.bot.WEBHOOK_DOMAIN);
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

      configApp({ app, bot });
      configBot({ bot, app });

      app.listen(configs.bot.WEBHOOK_PORT, configs.bot.HOST, (error, address) => {
        if (error) {
          return reject(error);
        }
        // tslint:disable-next-line:no-console
        console.log(`Listening on ${address}`);
        return resolve();
      });
    } catch (error) {
      console.error(error);
    }
  });
};
