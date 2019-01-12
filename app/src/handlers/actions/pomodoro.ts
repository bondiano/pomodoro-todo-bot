import { pausePomodoroExtra } from '@/extras';
import { pausePomodoroKeyboard, stopPomodoroKeyboard } from '@/keyboards';
import { forceSaveSession, getSessionKey } from '@/middlewares/session';
import { IBotContext } from '@/typing';
import { getActionType, millisToMinutesAndSeconds } from '@/utils';

// TODO: Use periods set by user
const timerPeriods = [25 * 60 * 1000, 5 * 60 * 1000, 25 * 60 * 1000, 5 * 60 * 1000, 25 * 60 * 1000, 15 * 60 * 1000];

/** Interval between update message with timer */
const INTERVAL_DURATION = 1000;
/** Container for pomodoro timers by sessionKeys */
const activeIntervals = {};

const intervalHandler = async (ctx: IBotContext) => {
  if (ctx.session.currentPomodoro.currentTime <= 0) {
    ctx.session.currentPomodoro.period++;

    if (ctx.session.currentPomodoro.period >= timerPeriods.length) {
      ctx.session.currentPomodoro.period = 0;
    }

    if (ctx.session.currentPomodoro.period % 2) {
      await ctx.reply(ctx.i18n.t('restTime'));
    } else {
      await ctx.reply(ctx.i18n.t('focusTime'));
    }

    ctx.session.currentPomodoro.currentTime = timerPeriods[ctx.session.currentPomodoro.period];
  }
  await ctx.editMessageText(millisToMinutesAndSeconds(ctx.session.currentPomodoro.currentTime), pausePomodoroExtra(ctx.i18n));
  ctx.session.currentPomodoro.currentTime -= INTERVAL_DURATION;
  await forceSaveSession(ctx, ctx.session);
};

const startPomodoro = async (ctx: IBotContext) => {
  if(ctx.session.currentPomodoro.currentTime) {
    return;
  }

  await ctx.reply(ctx.i18n.t('focusTime'));
  await ctx.editMessageReplyMarkup(pausePomodoroKeyboard(ctx.i18n));
  ctx.session.currentPomodoro.currentTime = timerPeriods[0];
  const sessionKey = getSessionKey(ctx);
  activeIntervals[sessionKey] = setInterval(intervalHandler, INTERVAL_DURATION, ctx);
};

const continuePomodoro = async (ctx: IBotContext) => {
  await ctx.editMessageReplyMarkup(pausePomodoroKeyboard(ctx.i18n));

  const sessionKey = getSessionKey(ctx);
  activeIntervals[sessionKey] = setInterval(intervalHandler, INTERVAL_DURATION, ctx);
};

const pausePomodoro = async (ctx: IBotContext) => {
  const sessionKey = getSessionKey(ctx);
  const interval = activeIntervals[sessionKey];
  clearInterval(interval);
  activeIntervals[sessionKey] = null;
  await ctx.editMessageReplyMarkup(stopPomodoroKeyboard(ctx.i18n));
};

const stopCurrentPomodoro = async (ctx: IBotContext) => {
  const sessionKey = getSessionKey(ctx);
  const interval = activeIntervals[sessionKey];
  clearInterval(interval);
  activeIntervals[sessionKey] = null;

  ctx.session.currentPomodoro.period = 0;
  ctx.session.currentPomodoro.currentTime = null;
  await ctx.editMessageReplyMarkup();
};

const actionByType: { [key: string]: (ctx: IBotContext) => Promise<any> } = {
  start: startPomodoro,
  continue: continuePomodoro,
  pause: pausePomodoro,
  stop: stopCurrentPomodoro
};

export const pomodoroActionHandler = async (ctx: IBotContext) => {
  if (!ctx.session.currentPomodoro) {
    ctx.session.currentPomodoro = {};
  }

  const type = getActionType(ctx);
  const actionHandler = actionByType[type];
  await actionHandler(ctx);
};
