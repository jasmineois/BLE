/** ログ出力用Function */
export function log(...text) {
  $('#log').append(text + "<br />");
  console.log(text);
}
