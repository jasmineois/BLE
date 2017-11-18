import {log, err} from "../util.es6";

const DEF_SERVICE = 'battery_service';
const DEF_CHARACTERISTIC = 'battery_level';

const anyDevice = () => {
  return Array.from('0123456789abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ')
      .map(c => ({namePrefix: c}))
      .concat({name: ''});
}

/** 
 * デバイスリンキング開始
 */
export default function connect(service = DEF_SERVICE, characteristic = DEF_CHARACTERISTIC) {
  return new Promise((resolve, reject) => {
    log("clickFunc called.");

    let _name;
    let _device;
    let _characteristics;
    let _service;

    // デバイスのスキャン
    log("scanning device.");
    navigator.bluetooth.requestDevice({filters: [{services: [service]}]})
    // navigator.bluetooth.requestDevice({filters: anyDevice()})

    // デバイス見つかったので、接続する
    .then(device => {
      _device = device;
      _name = device.name;
      log("start connecting device. ", JSON.stringify(device));
      return device.gatt.connect();
    })

    // デバイスに接続できたので、そのデバイスのServiceを調べる
    .then(server => {
      log("checking sevice. ", JSON.stringify(server));
      return server.getPrimaryService(service);
    })

    // Serviceを全部調べたので、次はサービスに紐づくCharacteristicsを調べる
    .then(service => {
      log("checking characteristics. ", service);
      _service = service;
      return service.getCharacteristic(characteristic);
    })

    // characteristicsを発見したので、characteristicsの中身を見に行く
    .then(characteristics => {
      log("discovered characteristics. ", characteristics);
      _characteristics = characteristics
    })

    // 全て成功したのでPromiseを完了状態にする
    .then(() => {
      resolve({
        name: _name,
        device: _device,
        service: _service,
        characteristics: _characteristics
      });
    })

    // エラー
    .catch(error => {
      reject(error);
    });

  });
}