import { mainExtra } from '@/extras';
import { IBotContext } from '@/typing';
import { getActionType } from '@/utils';

/**
 * Hack with "<any>i18n" here while waiting for merge this PR
 * https://github.com/telegraf/telegraf-i18n/pull/20
 */

export const selectLangActionHandler = async ({ i18n, deleteMessage, reply, update }: IBotContext) => {
  const lang = getActionType({update});
  (<any>i18n).locale(lang);
  await deleteMessage();
  await reply(i18n.t('languageSelected'), mainExtra(i18n));
};
