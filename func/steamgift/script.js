var MAX_LEVEL = 4;

function main() {
  if (document.URL == "https://www.steamgifts.com/giveaways/search?type=wishlist"
        || document.URL == "https://www.steamgifts.com/giveaways/search?page=2&type=wishlist") {
    wish_list_scan();
  } else {
    per_game_scan();
  }
}

function wish_list_scan() {
  var remain_points = parseInt(document.getElementsByClassName("nav__points")[0].innerText);

  var items = [];
  var data = document.getElementsByClassName("widget-container")[0].childNodes[3].childNodes[5].childNodes;
  for (var i = 1; i < data.length; i+=2) {
    // Skip AD
    if (data[i].className == "") {
      continue;
    }

    // joined
    var fadedivs = data[i].getElementsByClassName("is-faded");
    if (fadedivs.length > 0) {
      continue;
    }
    // over level
    var overlevel = data[i].getElementsByClassName("giveaway__column--contributor-level giveaway__column--contributor-level--negative");
    if (overlevel.length > 0) {
      continue;
    }

    // over level - 2
    var level = 0;
    var leveldivs = data[i].getElementsByClassName("giveaway__column--contributor-level");
    if (leveldivs.length != 0) {
      level = parseInt(leveldivs[0].innerHTML.match(/Level ([0-9]*)+/)[1]);
    }
    if (level > MAX_LEVEL) {
      continue;
    }

    // point of item
    pts_tmp_str = data[i].getElementsByClassName("giveaway__heading__thin")[0];
    // timestamp of item
    time_tmp_str = data[i].getElementsByClassName("giveaway__columns")[0].childNodes[1].childNodes[2].getAttribute("data-timestamp");
    if (pts_tmp_str.innerText.includes("Copies")) {
      pts_tmp_str = data[i].getElementsByClassName("giveaway__heading__thin")[1];     
    }
    new_item = {
      url: data[i].getElementsByClassName("giveaway__heading__name")[0].href,
      pts: pts_tmp_str.innerText.match(/[0-9][0-9]?[0-9]?/),
      t_s: parseInt(time_tmp_str)
    }

    items.push(new_item);
  }
  chrome.storage.sync.set({'steamgiftsMarauder': items});
  if (items.length != 0) {
    if (items[0].pts < remain_points) {
      if (remain_points > 200) {
        window.location = items[0].url;
      } else if (remain_points > 100 && ((items[0].t_s - Date.now()/1000) < 28800)) {
        window.location = items[0].url;
      } else if ((items[0].t_s - Date.now()/1000) < 7200) {
        window.location = items[0].url;
      } else {
        setInterval(function(){location.reload();}, 600000);
      }
      // window.location = items[0].url;
    } else {
      setInterval(function(){location.reload();}, 300000);
    }
  } else {
    setInterval(function(){location.reload();}, 1800000);
  }
}

function per_game_scan() {
  chrome.storage.sync.get("steamgiftsMarauder", function (result) {
    if (result.steamgiftsMarauder == null || result.steamgiftsMarauder.length == 0) {
      window.location = "https://www.steamgifts.com/giveaways/search?type=wishlist";
      return;
    }

    items = result.steamgiftsMarauder;
    if (document.URL == items[0].url) {
      // normal page
      if (document.getElementsByClassName("sidebar__entry-delete").length > 0) {
        // joined
        if (getComputedStyle(document.getElementsByClassName("sidebar__entry-delete")[0]).display === "block") {
          items.shift();
          chrome.storage.sync.set({'steamgiftsMarauder': items});
          if (items.length != 0) {
            // setInterval(function(){window.location = items[0].url;}, 3000);
            setInterval(function(){window.location = "https://www.steamgifts.com/giveaways/search?type=wishlist";}, 3000);
          } else {
            setInterval(function(){location.reload();}, 3000);
          }

        // available
        } else if (getComputedStyle(document.getElementsByClassName("sidebar__entry-insert")[0]).display === "block") {
          var target = document.querySelectorAll('form [data-do="entry_insert"]')[0];
          var e = new MouseEvent('click', {
            'view': window,
            'bubbles': true,
            'cancelable': true
          });
          target.dispatchEvent(e);
          setInterval(per_game_scan, 3000);

        // loading page
        } else if (getComputedStyle(document.getElementsByClassName("sidebar__entry-loading")[0]).display === "block") {
          setInterval(per_game_scan, 3000);

        // unknown page
        } else {
          console.log("error: " + document.URL);
          window.location = "https://www.steamgifts.com/giveaways/search?type=wishlist";
        }

      // error page
      } else if (document.getElementsByClassName("sidebar__error").length > 0) {
        window.location = "https://www.steamgifts.com/giveaways/search?type=wishlist";

      // unknown page
      } else {
        console.log("error: " + document.URL);
        window.location = "https://www.steamgifts.com/giveaways/search?type=wishlist";
      }


      // // joined
      // if (getComputedStyle(document.getElementsByClassName("sidebar__entry-delete")[0]).display === "block") {
      //  items.shift();
      //  chrome.storage.sync.set({'steamgiftsMarauder': items});
      //  if (items.length != 0) {
      //    setInterval(function(){window.location = items[0].url;}, 5000);
      //  } else {
      //    setInterval(function(){location.reload();}, 5000);
      //  }
      // } else if (document.getElementsByClassName("sidebar__error is-disabled").length != 0) {
      // } else {
      //  var target = document.querySelectorAll('form [data-do="entry_insert"]')[0];
      //  var e = new MouseEvent('click', {
      //    'view': window,
      //    'bubbles': true,
      //    'cancelable': true
      //  });
      //  target.dispatchEvent(e);
      //  setInterval(function(){location.reload();}, 5000);
      // }
      // var enterForm = document.getElementsByClassName("sidebar sidebar--wide")[0].childNodes[1];

    } else {
      window.location = items[0].url;
    }
  });
}


chrome.storage.sync.get('s_steamgift', function (result) {
    if (result.s_steamgift) {
      main();
    }
});
