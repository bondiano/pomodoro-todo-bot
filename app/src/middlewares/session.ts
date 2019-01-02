import * as RedisSession from 'telegraf-session-redis';

import * as configs from '@/configs';
import { IBotContext } from '@/typing';

export const getSessionKey = (ctx) => {
  if (ctx.from && ctx.chat) {
    return `${ctx.from.id}:${ctx.chat.id}`
  } else if (ctx.from && ctx.inlineQuery) {
    return `${ctx.from.id}:${ctx.from.id}`
  }
  return null
}

const session = new RedisSession({
  store: {
    host: configs.redis.HOST,
    port: configs.redis.PORT,
    password: configs.redis.PASSWORD
  },
  getSessionKey
});

export const forceSaveSession = (ctx: IBotContext) =>
  session.saveSession(session.options.getSessionKey(ctx), ctx.session);

export default session.middleware();
