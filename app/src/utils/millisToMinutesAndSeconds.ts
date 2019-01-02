export default (milis) => {
  const minus = milis < 0 ? "-" : ""
  milis = Math.abs(milis)
  const minutes = Math.floor(milis / 60000);
  const seconds = +((milis % 60000) / 1000).toFixed(0);
  return minus + (minutes < 10 ? '0' : '') + minutes + ":" + (seconds < 10 ? '0' : '') + seconds;
}