import { IBotContext } from '@/typing';

export const resetPomodoroHandler = async (ctx: IBotContext) => {
  ctx.session.currentPomodoro = {};
};
