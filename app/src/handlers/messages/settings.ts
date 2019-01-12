import { IBotContext } from '@/typing';

export const settingsMessageHandler = async ({ replyWithMarkdown, i18n }: IBotContext) => {
  await replyWithMarkdown(i18n.t('wip'));
};
