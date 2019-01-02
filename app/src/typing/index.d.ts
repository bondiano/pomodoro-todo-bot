import { ContextMessageUpdate } from 'telegraf';
import { I18n } from 'telegraf-i18n';

export interface IBotContext extends ContextMessageUpdate {
  readonly i18n: I18n;
}
