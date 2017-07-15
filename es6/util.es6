/** ログ出力用Function */
export function log(...text) {
  $('#log').prepend("<span class='debug'>" + text + "</span><br />");
  console.log(JSON.stringify(text));
}

/** ログ出力用Function */
export function err(...text) {
  $('#log').prepend("<span class='error'>" + text + "</span><br />");
  console.log(JSON.stringify(text));
}
