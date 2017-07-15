import {log, err} from "./util.es6";
import _connect from "./controller/connect.es6";
import _disconnect from "./controller/disconnect.es6";
import _readValue from "./controller/readValue.es6";
import _saveValue from "./controller/saveValue.es6";
import _notification from "./controller/notification.es6";

export default class DeviceManager {

    constructor() {
        // デバイス状態（接続中：true）
        this.connecting = false;
        // デバイス情報
        this.name = null;
        // デバイス情報
        this.device = null;
        // サービス
        this.service = null;
        // Characteristics
        this.characteristics = null;
    }

    connect(service, characteristic) {
        this.connecting = false;
        return _connect(service, characteristic)
        .then((res) => {
            this.connecting = true;
            this.name = res.name
            this.device = res.device;
            this.service = res.service;
            this.characteristics = res.characteristics;
        })
        .catch(this.error);
    }

    disconnect() {
        return _disconnect(this.device)
        .catch(this.error);
    }

    readValue() {
        return _readValue(this.characteristics)
        .catch(this.error);
    }

    saveValue(value) {
        return _saveValue(this.characteristics, value)
        .catch(this.error);
    }

    notification(){
        return _notification(this.characteristics)
        .catch(this.error);
    }

    error(error) {
        err(error);
    }
}