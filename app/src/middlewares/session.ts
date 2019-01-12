import { merge } from 'lodash';
import * as RedisSession from 'telegraf-session-redis';

import * as configs from '@/configs';
import { IBotContext } from '@/typing';

export const getSessionKey = (ctx: IBotContext) => {
  if (ctx.from && ctx.chat) {
    return `${ctx.from.id}:${ctx.chat.id}`;
  } else if (ctx.from && ctx.inlineQuery) {
    return `${ctx.from.id}:${ctx.from.id}`;
  }
  return null;
};

const session = new RedisSession({
  store: {
    host: configs.redis.HOST,
    port: configs.redis.PORT,
    password: configs.redis.PASSWORD
  },
  getSessionKey
});

export const forceSaveSession = (ctx: IBotContext, newSession: IBotContext['session']) =>
  session.saveSession(session.options.getSessionKey(ctx), newSession);

export const forceUpdateSession = async (ctx, updateObject: object) => {
  const sessionKey = session.options.getSessionKey(ctx);
  const currentSession = await session.getSession(sessionKey);
  const newSession = merge(currentSession, updateObject);
  return session.saveSession(sessionKey, newSession);
};

export default session.middleware();
