import { IBotContext } from '@/typing';

export const resetPomodoroHandler = (ctx: IBotContext) => {
  ctx.session.currentPomodoro.period = 0;
  ctx.session.currentPomodoro.currentTime = null;
}