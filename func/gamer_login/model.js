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

  save = function(timestamp, json) {
    this.lastUpdatedTime = timestamp;
    this.isSuccess = false;
    if (json.hasOwnProperty("data")
     || json.hasOwnProperty("error") && json["error"]["message"] == "今天您已經簽到過了喔") {
      this.isSuccess = true;
    }

    return chrome.storage.sync.set({
      'gamer_login': { 'lastUpdatedTime': this.lastUpdatedTime, 'isSuccess': this.isSuccess, 'msg': this.msg }
    });
  };

  load = async function() {
    const result = await chrome.storage.sync.get('gamer_login');
    if (result.gamer_login != null) {
      this.lastUpdatedTime = result.gamer_login.lastUpdatedTime || 0;
      this.isSuccess = result.gamer_login.isSuccess || false;
      this.msg = result.gamer_login.msg || '';
    }
  }
}