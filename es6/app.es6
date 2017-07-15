import {log, err} from "./util.es6";
import DeviceManager from "./DeviceManager.es6";

const customDevice = new DeviceManager();
const batteryDevice = new DeviceManager();
const heartRateDevice = new DeviceManager();

const BATTERY = 'battery_service';
const BATTERY_CON = 'battery_level';
const HEART_RATE = 'heart_rate';
const HEART_RATE_CON = 'heart_rate_control_point';

// セットアップ処理
(()=> {
  log("start.");
  //window.ArrayBuffer ? alert("ArrayBuffer OK!") : alert("ArrayBuffer NG!");
})();

/** ボタンクリックトリガー */
$('#custom_connect').click(() => {
  const service = $('#input_service').val();
  const characteristic = $("#input_characteristic").val();
  log("service=" + service, "characteristic=" + characteristic);
  customDevice.connect(service, characteristic)
  .then(() => connect("#custom_connect"));
});
$('#custom_disconnect').click(() => {
  customDevice.disconnect()
  .then(() => disconnect("#custom_connect"));
});
$('#custom_read').click(() => {
  customDevice.readValue();
});
$('#custom_save').click(() => {
  customDevice.saveValue();
});
$('#custom_notification').click(() => {
  customDevice.notification();
});

$('#battery_connect').click(() => {
  batteryDevice.connect(BATTERY, BATTERY_CON)
  .then(() => connect("#battery_connect"));
});
$('#battery_disconnect').click(() => {
  batteryDevice.disconnect()
  .then(() => disconnect("#battery_connect"));
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

$('#heart_rate_connect').click(() => {
  heartRateDevice.connect(HEART_RATE, HEART_RATE_CON)
  .then(() => {
    $("#heart_rate_connect").hide();
    $("#heart_rate_connect_menu").show();
  })
});
$('#heart_rate_disconnect').click(() => {
  batteryDevice.disconnect()
  .then(() => {
    $("#heart_rate_connect").show();
    $("#heart_rate_connect_menu").hide();
  })
});
$('#heart_rate_read').click(() => {
  heartRateDevice.readValue()
});
$('#heart_rate_save').click(() =>{
  heartRateDevice.saveValue()
});
$('#heart_rate_notification').click(() => {
  heartRateDevice.notification()
});

function connect(id) {
  $(id).hide();
  $(id + "_menu").show();
}

function disconnect(id) {
  $(id).show();
  $(id + "_menu").hide();
}