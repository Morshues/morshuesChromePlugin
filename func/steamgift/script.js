const MAX_LEVEL = 4;
const STORAGE_KEY = 'steamgiftsMarauder';

function main() {
  if (document.URL === "https://www.steamgifts.com/giveaways/search?type=wishlist"
        || document.URL === "https://www.steamgifts.com/giveaways/search?page=2&type=wishlist") {
    wish_list_scan();
  } else {
    per_game_scan();
  }
}

function wish_list_scan() {
  const remain_points = parseInt(document.getElementsByClassName("nav__points")[0].innerText);

  const items = [];
  const data = Array.from(document.querySelectorAll("div:not(.pinned-giveaways) > .giveaway__row-outer-wrap > .giveaway__row-inner-wrap"))
  for (let i = 1; i < data.length; i++) {
    const curItem = data[i]

    // skip joined
    if (curItem.classList.contains('is-faded')) {
      continue;
    }

    // skip over level
    const overlevelSubEl = data[i].getElementsByClassName("giveaway__column--contributor-level giveaway__column--contributor-level--negative");
    if (overlevelSubEl.length > 0) {
      continue;
    }

    // skip over level - 2
    const levelDivs = data[i].getElementsByClassName("giveaway__column--contributor-level");
    if (levelDivs.length !== 0) {
      const level = parseInt(levelDivs[0].innerHTML.match(/Level ([0-9]*)+/)[1]);
      if (level > MAX_LEVEL) {
        continue;
      }
    }


    // point of item
    let ptsTmpStr = data[i].getElementsByClassName("giveaway__heading__thin")[0];
    if (ptsTmpStr.innerText.includes("Copies")) {
      ptsTmpStr = data[i].getElementsByClassName("giveaway__heading__thin")[1];
    }

    // timestamp of item
    const timeTmpStr = data[i].getElementsByClassName("giveaway__columns")[0].childNodes[1].childNodes[2].getAttribute("data-timestamp");

    items.push({
      url: data[i].getElementsByClassName("giveaway__heading__name")[0].href,
      pts: ptsTmpStr.innerText.match(/[0-9][0-9]?[0-9]?/),
      t_s: parseInt(timeTmpStr)
    });
  }

  chrome.storage.sync.set({[STORAGE_KEY]: items});
  if (items.length !== 0) {
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
  chrome.storage.sync.get(STORAGE_KEY, function (result) {
    if (result[STORAGE_KEY] == null || result[STORAGE_KEY].length === 0) {
      window.location = "https://www.steamgifts.com/giveaways/search?type=wishlist";
      return;
    }

    const items = result[STORAGE_KEY];
    if (document.URL === items[0].url) {
      // normal page
      if (document.getElementsByClassName("sidebar__entry-delete").length > 0) {
        // joined
        if (getComputedStyle(document.getElementsByClassName("sidebar__entry-delete")[0]).display === "block") {
          items.shift();
          chrome.storage.sync.set({[STORAGE_KEY]: items});
          if (items.length !== 0) {
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
