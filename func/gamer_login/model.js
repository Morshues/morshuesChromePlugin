function GamerLoginModel() {
  self = this;
  this.lastUpdatedTime = 0;
  this.isSuccess = false;
  this.msg = '';

  this.save = function(timestamp, json, callback) {
    self.timestamp = timestamp;
    self.isSuccess = false;
    if (json.hasOwnProperty("data")
     || json.hasOwnProperty("error") && json["error"]["message"] == "今天您已經簽到過了喔") {
      self.isSuccess = true;
    }

    chrome.storage.sync.set({
      'gamer_login': { 'lastUpdatedTime': self.lastUpdatedTime, 'isSuccess': self.isSuccess, 'msg': self.msg }},
      callback
    );
  };
  
  this.load = function(callback) {
    chrome.storage.sync.get('gamer_login', function (result) {
      if (result.gamer_login != null) {
        self.lastUpdatedTime = result.gamer_login.lastUpdatedTime || 0;
        self.isSuccess = result.gamer_login.isSuccess || false;
        self.msg = result.gamer_login.msg || '';
      }
      callback();
    });
  }
}