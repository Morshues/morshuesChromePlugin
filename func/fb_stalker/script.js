var stalkModel = new StalkerModel();

function do_stalk() {
  var instant_blocks = document.getElementsByClassName("tickerActivityStories");
  // If message block do not ready, try again later.
  if (instant_blocks.length == 0) {
    setTimeout(function(){ stalkModel.load(do_stalk); }, 1000);
    return;
  }

  var messages = instant_blocks[0].getElementsByClassName("tickerStoryLink");
  var msg_cursor = 0;
  var match_count = 0;
  var scrollerArea = document.getElementsByClassName('fbFeedTicker')[0].getElementsByClassName('uiScrollableAreaWrap')[0];
  go_scroll(messages, msg_cursor, match_count, scrollerArea, 100);
}

function go_scroll(messages, msg_cursor, match_count, scrollerArea, retryCount) {
  // console.log('scrolling');
  for (; msg_cursor < messages.length; msg_cursor++) {
    if (stalkModel.anchor.includes(messages[msg_cursor].href)) {
      match_count++;
      // console.log('anchor matched');
    }
  }

  if (match_count >= stalkModel.anchor.length || messages.length > (stalkModel.anchor.length-match_count)*100) {
    scan(messages);
    return;
  } else {
    scrollerArea.scrollTo(0, scrollerArea.scrollHeight);
  }

  if (retryCount <= 0) {
    scan(messages);
    return;    
  }
  setTimeout(function(){ go_scroll(messages, msg_cursor, match_count, scrollerArea, retryCount-1); }, 5000);
}

function scan(messages) {
  // console.log('scanning');
  var history_changed = false;

  for (var i = 0; i < messages.length; i++) {
    var msg = messages[i].getElementsByClassName("_42ef")[0];
    var p_name = msg.getElementsByClassName("fwb")[0].innerText;
    if (stalkModel.names.includes(p_name)) {
      if (stalkModel.histories[p_name] == null) {
        stalkModel.histories[p_name] = [];
      }
      record = {
        'link': messages[i].href,
        'text': msg.innerText,
        'time': new Date().getTime()
      };
      if (!Record.includes(stalkModel.histories[p_name], record)) {
        stalkModel.histories[p_name].push(record);
        history_changed = true;
      }
    }
  }

  // Update anchor data
  for (var i = 0; i < 8 && i < messages.length; i++) {
    stalkModel.anchor[i] = messages[i].href;
  }


  if (history_changed) {
    stalkModel.save(function() {
      console.log('%c%d/%d %d:%d %cStalker record changed','color: #FF5511',(new Date()).getMonth()+1,(new Date()).getDate(),(new Date()).getHours(),(new Date()).getMinutes(),'color:#008800');
      console.log(stalkModel.histories);
    });
  } else {
    console.log('%c%d/%d %d:%d %cStalker scanned','color: #FF5511',(new Date()).getMonth()+1,(new Date()).getDate(),(new Date()).getHours(),(new Date()).getMinutes(),'color:#008800');
    stalkModel.save();
  }
}

stalkModel.load(function() {
  if (stalkModel.enable) {
    var reloadTimeout = setTimeout(function() { location.reload(); }, 600000);
    do_stalk();
  } else {
    // Reset anchor data if disabled
    stalkModel.anchor = [];
    stalkModel.save();
  }
});


