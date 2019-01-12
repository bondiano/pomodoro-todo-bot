import { IBotContext } from '@/typing';

/**
 * Util for extract type from action data by used action naming agreement in project(as 'NAMESPACE/type').
 */
export default ({ update: contextUpdate }: {update: IBotContext['update']}) => contextUpdate.callback_query.data.split('/')[1];
