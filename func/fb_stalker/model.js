function StalkerModel() {
  self = this;
  this.enable = false;
  this.names = [];
  this.histories = {};
  this.anchor = [];
  this.setNameStr = function(str) {
    self.names = str.split(',');
  };
  this.clearHistories = function() {
    self.histories = {};
  };
  this.save = function(callback) {
    chrome.storage.sync.set({
      'fb_stalker': { 'enable': self.enable, 'names': self.names, 'histories': self.histories, 'anchor': self.anchor }},
      callback
    );
  };
  this.load = function(callback) {
    chrome.storage.sync.get('fb_stalker', function (result) {
      if (result.fb_stalker != null) {
        self.enable = result.fb_stalker.enable || false;
        self.names = result.fb_stalker.names || [];
        self.histories = result.fb_stalker.histories || {};
        self.anchor = result.fb_stalker.anchor || [];
      }
      callback();
    });
  }
};

Record = function() {
  self = this;
  this.link = "";
  this.text = "";
  this.time = 0;
  this.create = function(link, text, time) {
    self.link = link;
    self.text = text;
    self.time = time;
  };
}
Record.compare = function(a, b) {
  return (a.link == b.link && a.text == b.text);
};
Record.includes = function(arr, obj) {
  for (var i = 0; i < arr.length; i++) {
    if (this.compare(arr[i], obj)) {
      return true;
    }
  }
  return false;
};
