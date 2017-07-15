import {log, err} from "../util.es6";

/**
 * デバイスリンキング解除
 */
export default function disconnect(_device) {
  return new Promise((resolve) => {
    log("disconnect. ");
    _device ? _device.gatt.disconnect() : null;
    resolve();
  });
}