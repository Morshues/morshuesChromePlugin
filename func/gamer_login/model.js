export class GamerLoginModel {
  constructor() {
    this.lastUpdatedTime = 0;
    this.isSuccess = false;
    this.msg = '';
  }

  dateStr = function() {
    const timezone = "zh-TW";
    const date = new Date(this.lastUpdatedTime);
    const dateStr = date.toLocaleDateString(timezone);
    const timeStr = date.toLocaleTimeString(timezone);
    return dateStr + ' ' + timeStr;
  }

  isLoggedIn = function() {
    const d1 = parseInt(((Date.now()+28800000) / 86400000)); 
    const d2 = parseInt(((this.lastUpdatedTime+28800000) / 86400000));
    return d1 == d2;
  }

  save = function(timestamp, json, callback) {
    this.lastUpdatedTime = timestamp;
    this.isSuccess = false;
    if (json.hasOwnProperty("data")
     || json.hasOwnProperty("error") && json["error"]["message"] == "今天您已經簽到過了喔") {
      this.isSuccess = true;
    }

    let self = this;
    chrome.storage.sync.set({
      'gamer_login': { 'lastUpdatedTime': self.lastUpdatedTime, 'isSuccess': self.isSuccess, 'msg': self.msg }},
      callback
    );
  };
  
  load = function(callback) {
    let self = this;
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