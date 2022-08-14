// TODO: haven't load the dataModel from storage yet
import { GamerLoginModel } from '/func/gamer_login/model.js'

var dataModel = new GamerLoginModel();

function getToken(timestamp, callback) {
  fetch("https://www.gamer.com.tw/ajax/get_csrf_token.php?_="+timestamp.toString(), {
    "headers": {
      "accept": "*/*",
      "accept-language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja-JP;q=0.6,ja;q=0.5,vi-VN;q=0.4,vi;q=0.3",
      "cache-control": "no-cache",
      "pragma": "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://www.gamer.com.tw/",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": null,
    "method": "GET",
    "mode": "cors",
    "credentials": "include"
  }).then((response) => {
    return response.text();
  }).then((resText) => {
    callback(resText);
  });
}

function login(token, callback) {
  fetch("https://www.gamer.com.tw/ajax/signin.php", {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "accept-language": "zh-TW,zh;q=0.9,en-US;q=0.8,en;q=0.7,ja-JP;q=0.6,ja;q=0.5,vi-VN;q=0.4,vi;q=0.3",
      "cache-control": "no-cache",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
      "pragma": "no-cache",
      "sec-fetch-dest": "empty",
      "sec-fetch-mode": "cors",
      "sec-fetch-site": "same-origin",
      "x-requested-with": "XMLHttpRequest"
    },
    "referrer": "https://www.gamer.com.tw/",
    "referrerPolicy": "no-referrer-when-downgrade",
    "body": "action=1&token="+token,
    "method": "POST",
    "mode": "cors",
    "credentials": "include"
  }).then((response) => {
    return response.json();
  }).then((resJson) => {
    callback(resJson);
  });
}

function main() {
  const timestamp = Date.now();

  if (dataModel.isLoggedIn()) {
    return;
  }

  getToken(timestamp, function(text) {
    login(text, function(json) {
      dataModel.save(timestamp, json, function() {
        console.log(dataModel.dateStr(), json, "saved");
      });
    });
  })  
}

main();
setInterval(main, 600000);