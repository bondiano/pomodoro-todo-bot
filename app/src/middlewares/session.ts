import * as RedisSession from 'telegraf-session-redis';

import * as configs from '@/configs';

const session = new RedisSession({
  store: {
    host: configs.redis.HOST,
    port: configs.redis.PORT,
    password: configs.redis.PASSWORD
  }
});

export default session.middleware();
