/**
 * Function for convert milliseconds to format like 00:00, worked with negative numbers.
 */
export default (milis: number) => {
  const minus = milis < 0 ? '-' : '';
  const absMilis = Math.abs(milis);
  const minutes = Math.floor(absMilis / 60000);
  const seconds = Number(((absMilis % 60000) / 1000).toFixed(0));
  return minus + (minutes < 10 ? '0' : '') + minutes + ':' + (seconds < 10 ? '0' : '') + seconds;
};
