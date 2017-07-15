import {log} from "./util.es6";

// デバイス情報
let _device = null;

// セットアップ処理
(()=> {log("start.");})();

/** ボタンクリックトリガー */
$('#id_btn').click(() => {
  connect()
  .then(disconnect)
  .catch(error => log(error));
});

/** 
 * デバイスリンキング開始
 */
function connect() {
  return new Promise((resolve) => {
    log("clickFunc called.");

    // デバイスのスキャン
    log("scanning device.");
    // navigator.bluetooth.requestDevice({ acceptAllDevices: true })
    navigator.bluetooth.requestDevice({filters: [{services: ['battery_service']}]})

    // デバイス見つかったので、接続する
    .then(device => {
      _device = device;
      log("start connecting device. ", device);
      return device.gatt.connect();
    })

    // デバイスに接続できたので、そのデバイスのServiceを調べる
    .then(server => {
      log("checking sevice. ", server);
      return server.getPrimaryService('battery_service');
    })

    // Serviceを全部調べたので、次はサービスに紐づくCharacteristicsを調べる
    .then(service => {
      log("checking characteristics. ", service);
      return service.getCharacteristic('battery_level');
    })

    // characteristicsを発見したので、characteristicsの中身を見に行く
    .then(characteristics => {
      log("discovered characteristics. ", characteristics);
      return characteristics.readValue()
        // 全部の Chracteristics をゲット
        // あとはその Characteristics を Read/Writeしていく
    })

    // characteristicsの中身を見に行くを出力
    .then(value => {
      log("read data. ", value);
      log("battery = " + value.getUint8(0));
    })

    // 全て成功したのでPromiseを完了状態にする
    .then(() => {
      resolve();
    })
  });
}

/**
 * デバイスリンキング解除
 */
function disconnect() {
  return new Promise((resolve) => {
    log("disconnect. ");
    return _device ? _device.gatt.disconnect() : null;
  });
}