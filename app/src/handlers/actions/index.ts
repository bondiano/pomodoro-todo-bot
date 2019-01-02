import { actionNames } from '@/constants';

import { selectEnLangActionHandler, selectRuLangActionHandler } from './language';

export const registerActions = (bot) => {
  bot.action(actionNames.LANG_EN, selectEnLangActionHandler);
  bot.action(actionNames.LANG_RU, selectRuLangActionHandler);
};