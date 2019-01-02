import { actionNames } from '@/constants';

import { selectLangActionHandler } from './language';
import { pomodoroActionHandler } from './pomodoro';

export const registerActions = (bot) => {
  bot.action([actionNames.LANG_EN, actionNames.LANG_RU], selectLangActionHandler);
  bot.action([actionNames.START_POMODORO, actionNames.STOP_POMODORO, actionNames.CONTINUE_POMODORO, actionNames.PAUSE_POMODORO], pomodoroActionHandler);
};