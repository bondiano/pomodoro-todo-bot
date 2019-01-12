import { Markup } from 'telegraf';
import { I18n } from 'telegraf-i18n';
import { InlineKeyboardMarkup } from 'telegram-typings';

import { actionNames } from '@/constants';

export const startPomodoroKeyboard = (translation: I18n): InlineKeyboardMarkup =>
  Markup.inlineKeyboard([Markup.callbackButton(translation.t('startPomodoro'), actionNames.START_POMODORO)]);

export const pausePomodoroKeyboard = (translation: I18n): InlineKeyboardMarkup =>
  Markup.inlineKeyboard([Markup.callbackButton(translation.t('pausePomodoro'), actionNames.PAUSE_POMODORO)]);

export const stopPomodoroKeyboard = (translation: I18n): InlineKeyboardMarkup =>
  Markup.inlineKeyboard([
    Markup.callbackButton(translation.t('continuePomodoro'), actionNames.CONTINUE_POMODORO),
    Markup.callbackButton(translation.t('stopPomodoro'), actionNames.STOP_POMODORO)
  ]);
