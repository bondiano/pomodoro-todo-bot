import { IBotContext } from '@/typing';

/**
 * Hack with (<any>i18n) here while waiting this PR
 * https://github.com/telegraf/telegraf-i18n/pull/20
 */

export const selectRuLangActionHandler = async ({ i18n, editMessageText }: IBotContext) => {
  (<any>i18n).locale('ru');
  await editMessageText(i18n.t('languageSelected'));
};

export const selectEnLangActionHandler = async ({ i18n, editMessageText }: IBotContext) => {
  (<any>i18n).locale('en');
  await editMessageText(i18n.t('languageSelected'));
};