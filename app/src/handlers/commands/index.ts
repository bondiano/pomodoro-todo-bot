import { commandNames } from '@/constants';

import { helpCmdHandler } from './help';
import { languageCmdHandler } from './language';
import { startCmdHandler } from './start';

export const registerCommands = (bot) => {
  bot.command(commandNames.START, startCmdHandler);
  bot.command(commandNames.HELP, helpCmdHandler);
  bot.command(commandNames.LANGUAGE, languageCmdHandler);
};