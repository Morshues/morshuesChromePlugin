const STORAGE_ID = 'rent591';

const StatusEnum = {
  NONE: 'none',
  UP: 'up',
  DOWN: 'down',
}

class RentItemModel {
  constructor(data = {}) {
    this.status = data.status || 'none';
  }

  propStatus() {
    switch(this.status) {
      case StatusEnum.NONE:
        this.status = StatusEnum.UP;
        break;
      case StatusEnum.UP:
        this.status = StatusEnum.DOWN;
        break;
      case StatusEnum.DOWN:
        this.status = StatusEnum.NONE;
        break;
      default:
        this.status = StatusEnum.NONE;
    }
  }

  dump() {
    return {
      status: this.status,
    };
  }
}

class RentModel {
  constructor() {
    this.enable = false;
    this.items = {};
  }

  getEnable() {
    return this.enable;
  }

  setEnable(e) {
    this.enable = e;
  }

  getItem(id) {
    if (this.items[id] == null) {
      this.items[id] = new RentItemModel();
    }
    return this.items[id];
  }

  save(callback) {
    const self = this;
    const data = {};
    const items = {};
    Object.entries(self.items).forEach(entry => {
      const [key, value] = entry;
      items[key] = value.dump();
    });
    data[STORAGE_ID] = {
      'enable': self.enable,
      'items': self.items,
    };
    console.log("save", data[STORAGE_ID])
    chrome.storage.sync.set(data, callback);
  }

  load(callback) {
    const self = this;
    chrome.storage.sync.get(STORAGE_ID, function (result) {
      if (result[STORAGE_ID] != null) {
        let rootItem = result[STORAGE_ID];
        self.enable = rootItem.enable;
        self.items = {};
        Object.entries(rootItem.items).forEach(entry => {
          const [key, value] = entry;
          self.items[key] = new RentItemModel(value);
        });
      }
      console.log("load", result[STORAGE_ID])
      callback();
    });
  }
}
