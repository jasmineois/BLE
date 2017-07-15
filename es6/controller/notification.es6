import {log, err} from "../util.es6";

/**
 * value取得
 */
export default function notification(_characteristics) {
    return new Promise((resolve) => {
        _characteristics.startNotifications().then(_ => {
            _characteristics.addEventListener(
                'characteristicvaluechanged',
                handleNotifications
            );
        });
  });
}

function handleNotifications(event) {
    let value = event.target.value;
    let a = [];
    for (let i = 0; i < value.byteLength; i++) {
        a.push('0x' + ('00' + value.getUint8(i).toString(16)).slice(-2));
    }
    log('> ' + a.join(' '));
}