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

const getCurrentSession = async (ctx: IBotContext) => session.getSession(session.options.getSessionKey(ctx));

export const forceUpdateSession = async (ctx: IBotContext, updateObject: object) => {
  const currentSession = await getCurrentSession(ctx);
  const newSession = merge(currentSession, updateObject);
  return session.saveSession(session.options.getSessionKey(ctx), newSession);
};

export default session.middleware();
