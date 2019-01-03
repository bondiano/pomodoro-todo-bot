import { get } from 'lodash';

import { startPomodoroExtra } from '@/extras';
import { IBotContext } from '@/typing';
import { millisToMinutesAndSeconds } from '@/utils';

export const pomodoroMessageHandler = async ({ replyWithMarkdown, i18n, session }: IBotContext) => {
  if (get(session, ['currentPomodoro', 'currentTime'])) {
    await replyWithMarkdown(i18n.t('pomodoroAlreadyStarted', {
      currentTime: millisToMinutesAndSeconds(session.currentPomodoro.currentTime)
    }));
  } else {
    await replyWithMarkdown(i18n.t('pomodoroWelcome', {
      configText: '25-5-15'
    }), startPomodoroExtra(i18n));
  }
}