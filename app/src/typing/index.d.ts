import { ContextMessageUpdate } from 'telegraf';
import { I18n } from 'telegraf-i18n';

interface IUserSession {
  currentPomodoro?: {
    period?: number,
    currentTime?: number
  };
}

export interface IBotContext extends ContextMessageUpdate {
  readonly i18n: I18n;
  session: IUserSession;
}
