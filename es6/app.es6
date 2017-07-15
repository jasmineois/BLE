import {log, err} from "./util.es6";
import DeviceManager from "./DeviceManager.es6";

const batteryDevice = new DeviceManager();
const heartRateDevice = new DeviceManager();

const BATTERY = 'battery_service';
const BATTERY_CON = 'battery_level';
const HEART_RATE = 'heart_rate';
const HEART_RATE_CON = 'heart_rate_control_point';

// セットアップ処理
(()=> {log("start.");})();

/** ボタンクリックトリガー */
$('#battery_connect').click(() => {
  batteryDevice.connect(BATTERY, BATTERY_CON)
  .then(() => {
    $("#battery_connect").hide();
    $("#battery_disconnect").show();
    $("#battery_connect_menu").show();
  })
});
$('#battery_disconnect').click(() => {
  batteryDevice.disconnect()
  .then(() => {
    $("#battery_connect").show();
    $("#battery_disconnect").hide();
    $("#battery_connect_menu").hide();
  })
});
$('#battery_read').click(() => {
  batteryDevice.readValue();
});
$('#battery_save').click(() => {
  batteryDevice.saveValue();
});
$('#battery_notification').click(() => {
  batteryDevice.notification();
});

$('#heart_rate_connect').click(() => heartRateDevice.connect(HEART_RATE, HEART_RATE_CON));
$('#heart_rate_read').click(() => heartRateDevice.readValue());
$('#heart_rate_save').click(() => heartRateDevice.saveValue());
$('#heart_rate_notification').click(() => heartRateDevice.notification());