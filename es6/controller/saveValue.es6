import {log, err} from "../util.es6";

/**
 * value取得
 */
export default function saveValue(_characteristics, value = [1]) {
  return new Promise((resolve) => {
    log("save.");
    let v = new Uint8Array(value);
    _characteristics.writeValue(v)
    .then(res => {
      log("save data. ");
      resolve();
    })
  });
}
