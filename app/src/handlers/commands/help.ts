import { IBotContext } from '@/typing';

export const helpCmdHandler = async ({ replyWithMarkdown, i18n }: IBotContext) => {
  await replyWithMarkdown(i18n.t('help'));
}
