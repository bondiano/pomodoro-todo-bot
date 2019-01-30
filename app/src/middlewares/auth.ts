import { user as userService } from '@/services';
import { IBotContext } from '@/typing';

export default async (ctx: IBotContext, next) => {
  let user = await userService.findUserByTelegramId(ctx.from.id);

  if (!user) {
    user = await userService.findUserByTelegramId(ctx.from.id);
  }

  ctx.state.user = user;
  next();
};
