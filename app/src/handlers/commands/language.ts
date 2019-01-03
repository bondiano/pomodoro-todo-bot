import { languageExtra } from '@/extras';
import { IBotContext } from '@/typing';

export const languageCmdHandler = async ({ replyWithMarkdown, i18n }: IBotContext) => {
  await replyWithMarkdown(i18n.t('language'), languageExtra(i18n));
}