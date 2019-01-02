import { mainExtra } from '@/extra';
import { IBotContext } from '@/typing';

/**
 * Hack with "<any>i18n" here while waiting this PR
 * https://github.com/telegraf/telegraf-i18n/pull/20
 */

export const selectLangActionHandler = async ({ i18n, deleteMessage, reply, update }: IBotContext) => {
  const [, lang] = update.callback_query.data.split('/');
  (<any>i18n).locale(lang);
  await deleteMessage();
  await reply(i18n.t('languageSelected'), mainExtra(i18n));
};
