import { Markup } from 'telegraf';
import { I18n } from 'telegraf-i18n';
import { InlineKeyboardMarkup } from 'telegram-typings';

import { actionNames } from '@/constants';

export default (translation: I18n): InlineKeyboardMarkup => {
  const firstLine = [
    Markup.callbackButton(translation.t('enButton'), actionNames.LANG_EN),
    Markup.callbackButton(translation.t('ruButton'), actionNames.LANG_RU)
  ];

  return Markup.oneTime().inlineKeyboard([firstLine], {});
};
