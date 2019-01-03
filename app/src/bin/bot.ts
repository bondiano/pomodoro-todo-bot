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
  app.use(bot.webhookCallback(configs.bot.WEBHOOK_PATH));

  app.get('/webhook', async (_, reply) => {
    const data = await bot.telegram.getWebhookInfo();
    reply.send({ data});
  });
};

const configBot = async ({ bot }: { bot: Telegraf<ContextMessageUpdate>, app}): Promise<void> => {
  try {
    await bot.telegram.setWebhook(`${configs.bot.WEBHOOK_DOMAIN}${configs.bot.WEBHOOK_PATH}`, {
      source: configs.tlsOptions.cert
    });
    bot.use(sessionMiddleware);
    bot.use(i18nMiddleware);

    registerCommands(bot);
    registerActions(bot);
    registerMessages(bot);
  } catch(error) {
    console.error(error);
  }
};

export const start = async () => {
  return new Promise<void>(async (resolve, reject) => {
    try {
      const bot = new Telegraf(configs.bot.BOT_TOKEN);
      const app: fastify.FastifyInstance<Server, IncomingMessage, ServerResponse> = fastify({
        logger: true
      });

      configApp({ app, bot });
      await configBot({ bot, app });

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
