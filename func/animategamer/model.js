function AnimateGamerModel() {
  self = this;
  this.enable = false;
  this.date_str = '';
  this.answer = null;

  this.TodayText = function() {
    var today = new Date(); 
    return "[" + ("0"+(today.getMonth()+1)).slice(-2) + "/" + ("0"+today.getDate()).slice(-2) + " 動漫通]";
  }

  this.isSameDay = function() {
    return self.TodayText() == self.date_str;
  }

  this.save = function(callback) {
    chrome.storage.sync.set({
      'animategamer': { 'enable': self.enable, 'date_str': self.date_str, 'answer': self.answer }},
      callback
    );
  };
  this.load = function(callback) {
    chrome.storage.sync.get('animategamer', function (result) {
      if (result.animategamer != null) {
        self.enable = result.animategamer.enable;
        self.date_str = result.animategamer.date_str || '';
        self.answer = result.animategamer.answer || null;
      }
      callback();
    });
  }
}