import { resolve } from 'path';

const TelegrafI18n = require('telegraf-i18n'); // tslint:disable-line

const i18n = new TelegrafI18n({
  useSession: true,
  defaultLanguage: 'en',
  allowMissing: true,
  sessionName: 'session',
  directory: resolve(__dirname, '../../locales')
});

export default i18n.middleware();
