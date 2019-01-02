import { IBotContext } from '@/typing';

export const startCmdHandler = async ({ replyWithMarkdown, i18n }: IBotContext) => {
  await replyWithMarkdown(i18n.t('greeting'));
}
