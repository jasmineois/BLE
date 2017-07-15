import {log, err} from "./util.es6";
import _connect from "./controller/connect.es6";
import _disconnect from "./controller/disconnect.es6";
import _readValue from "./controller/readValue.es6";
import _saveValue from "./controller/saveValue.es6";
import _notification from "./controller/notification.es6";

export default class DeviceManager {

    constructor() {
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
        return _connect(service, characteristic)
        .then((res) => {
            this.name = res.name
            this.device = res.device;
            this.service = res.service;
            this.characteristics = res.characteristics;
        })
        .catch(error => err(error));
    }

    disconnect() {
        return _disconnect(this.device)
        .catch(error => err(error));
    }

    readValue() {
        return _readValue(this.characteristics)
        .catch(error => err(error));
    }

    saveValue(value) {
        return _saveValue(this.characteristics, value)
        .catch(error => err(error));
    }

    notification(){
        return _notification(this.characteristics);
    }
}