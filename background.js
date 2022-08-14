import "/back_js/dictionary.js"
import "/func/right_click_helper/back.js"
import "/func/gamer_login/back.js"

chrome.runtime.onMessage.addListener(
  function (request, sender, sendResponse) {
    if (request.func == 'animategamer') {
      chrome.tabs.create({url: 'https://www.facebook.com/pg/animategamer/posts/', active: false});
    }
  }
);
