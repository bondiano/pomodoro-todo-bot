import { Extra } from 'telegraf';
import { I18n } from 'telegraf-i18n';

import { pausePomodoroKeyboard, startPomodoroKeyboard } from '@/keyboard';

export const startPomodoroExtra = (translation: I18n) => Extra.markdown().markup(startPomodoroKeyboard(translation));
export const pausePomodoroExtra = (translation: I18n) => Extra.markdown().markup(pausePomodoroKeyboard(translation));
