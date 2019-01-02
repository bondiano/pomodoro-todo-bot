import { Markup } from 'telegraf';
import { I18n } from 'telegraf-i18n';
import { InlineKeyboardMarkup } from 'telegram-typings';

export default (translation: I18n): InlineKeyboardMarkup => {
  const buttons = [
    translation.t('pomodoroButton'),
    translation.t('todoButton'),
    translation.t('settingsButton')
  ];

  return Markup.resize().oneTime().keyboard(buttons);
};
