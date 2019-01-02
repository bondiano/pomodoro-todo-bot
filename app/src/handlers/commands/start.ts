import { mainExtra } from '@/extra';
import { IBotContext } from '@/typing';

export const startCmdHandler = async ({ replyWithMarkdown, i18n }: IBotContext) => {
  await replyWithMarkdown(i18n.t('greeting'), mainExtra(i18n));
}
