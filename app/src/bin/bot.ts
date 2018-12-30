import * as fastify from 'fastify';
import { IncomingMessage, Server, ServerResponse } from 'http';
import * as path from 'path';
import Telegraf from 'telegraf';
import TelegrafI18n from 'telegraf-i18n';

// import RedisSession from 'telegraf-session-redis';
import * as configs from '@/configs';

const configApp = ({app, bot}): void => {
  app.use(bot.webhookCallback(configs.bot.SECRET_PATH));
  app.get('/', async (request, reply) => {
    // tslint:disable-next-line:no-console
    console.log(reply.res); // this is the http.ServerResponse with correct typings!
    return { hello: 'world' };
  });
};

const configBot = ({bot}): void => {
  bot.telegram.setWebhook(`${configs.bot.PUBLIC_HOST}${configs.bot.SECRET_PATH}`);
  // const session = new RedisSession({
  //   store: {
  //     host: configs.redis.HOST,
  //     port: configs.redis.PORT,
  //     password: configs.redis.PASSWORD
  //   }
  // });
  // bot.use(session);

  const i18n = new TelegrafI18n({
    useSession: true,
    defaultLanguage: 'en',
    allowMissing: true,
    sessionName: 'session',
    directory: path.resolve(__dirname, 'locales')
  });
  bot.use(i18n.middleware());

  bot.on('text', ({ reply }) => reply('Hello mew mew mew'));
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
        console.log(`Listening on ${address}, ${app.printRoutes()}`);
        return resolve();
      });
    } catch (error) {
      console.error(error);
    }
  });
};
