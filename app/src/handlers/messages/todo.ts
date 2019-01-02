import { IBotContext } from '@/typing';

export const todoMessageHandler = async ({ reply, i18n }: IBotContext) => {
  await reply(i18n.t('wip'));
}