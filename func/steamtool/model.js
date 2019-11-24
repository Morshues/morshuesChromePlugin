function SteamToolModel() {
  self = this;
  this.enable = false;
  this.price = 9999;
  this.getEnable = function() {
    return self.enable;
  }
  this.setEnable = function(e) {
    self.enable = e;
  }
  this.getPrice = function() {
    return self.price;
  }
  this.setPrice = function(p) {
    self.price = p;
  }
  this.save = function(callback) {
    chrome.storage.sync.set({
      'steamtool': { 'enable': self.enable, 'price': self.price }},
      callback
    );
  };
  this.load = function(callback) {
    chrome.storage.sync.get('steamtool', function (result) {
      if (result.steamtool != null) {
        self.enable = result.steamtool.enable || false;
        self.price = result.steamtool.price || 9999;
      }
      callback();
    });
  };
};