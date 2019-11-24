class DailyCheckUrlModel {
  constructor(enable, url, date) {
    this.enable = enable;
    this.url = url;
    this.date = date;
  }
};

function DailyCheckModel() {
  self = this;
  this.enable = false;
  this.urlMap = {}

  this.getEnable = function() {
    return self.enable;
  }
  this.setEnable = function(e) {
    self.enable = e;
  }
  this.getItem = function(key) {
    return self.urlMap[key];
  }
  this.setItem = function(key, value) {
    self.urlMap[key] = value;
  }
  // this.save = function(callback) {
  //   chrome.storage.sync.set({
  //     'steamtool': { 'enable': self.enable, 'price': self.price }},
  //     callback
  //   );
  // };
  // this.load = function(callback) {
  //   chrome.storage.sync.get('steamtool', function (result) {
  //     if (result.steamtool != null) {
  //       self.enable = result.steamtool.enable || false;
  //       self.price = result.steamtool.price || 9999;
  //     }
  //     callback();
  //   });
  // };
};