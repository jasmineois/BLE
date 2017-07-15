import {log, err} from "../util.es6";

/**
 * value取得
 */
export default function readValue(_characteristics) {
  return new Promise((resolve) => {
    log("read.");
    _characteristics.readValue()
    .then(value => {
      log("read data. ", value.getUint8(0));
      resolve();
    })
  });
}