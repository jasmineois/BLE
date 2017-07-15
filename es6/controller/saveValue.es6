import {log, err} from "../util.es6";

/**
 * value取得
 */
export default function saveValue(_characteristics, value = 0x01) {
  return new Promise((resolve) => {
    log("save.");
    //let value = new Uint8Array([1]);
    let encoder = new TextEncoder('utf-8');
    _characteristics.writeValue(encoder.encode(value))
    .then(res => {
      log("save data. ", res);
      resolve();
    })
  });
}
