import { Extra } from 'telegraf';
import { I18n } from 'telegraf-i18n';

import { mainKeyboard } from '@/keyboard';

export default (translation: I18n) => Extra.markdown().markup(mainKeyboard(translation));
