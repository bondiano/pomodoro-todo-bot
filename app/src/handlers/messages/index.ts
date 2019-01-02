import { pomodoroMessageHandler } from './pomodoro';
import { settingsMessageHandler } from './settings';
import { todoMessageHandler } from './todo';

const { match } = require('telegraf-i18n');

export const registerMessages = (bot) => {
  bot.hears(match('pomodoroButton'), pomodoroMessageHandler);
  bot.hears(match('settingsButton'), settingsMessageHandler);
  bot.hears(match('todoButton'), todoMessageHandler);
};