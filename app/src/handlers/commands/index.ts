import { commandNames } from '@/constants';

import { helpCmdHandler } from './help';
import { languageCmdHandler } from './language';
import { resetPomodoroHandler } from './reset-pomodoro';
import { startCmdHandler } from './start';

export const registerCommands = (bot) => {
  bot.start(startCmdHandler);
  bot.help(helpCmdHandler);
  bot.command(commandNames.LANGUAGE, languageCmdHandler);
  bot.command(commandNames.RESET_POMODORO, resetPomodoroHandler);
};
