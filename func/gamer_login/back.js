import { GamerLoginModel } from '/func/gamer_login/model.js'

const LOG_TAG = 'Gamer Login';
const ALARM_NAME = 'gamer_login_daily';
const PERIOD_IN_MINUTES = 60;

function getToken(timestamp, callback) {
  fetch("https://www.gamer.com.tw/ajax/get_csrf_token.php?_="+timestamp.toString(), {
    "headers": {
      "accept": "*/*",
    },
    "method": "GET",
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
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    "body": "action=1&token="+token,
    "method": "POST",
    "credentials": "include"
  }).then((response) => {
    return response.json();
  }).then((resJson) => {
    callback(resJson);
  });
}

function main() {
  const dataModel = new GamerLoginModel();
  dataModel.load(function() {
    if (dataModel.isLoggedIn()) {
      console.log(LOG_TAG, 'Checked and Logged in')
      return;
    }

    const timestamp = Date.now();
    getToken(timestamp, function(token) {
      console.log(LOG_TAG, 'Got token:', token)
      login(token, function(json) {
        dataModel.save(timestamp, json, function() {
          console.log(LOG_TAG, dataModel.dateStr(), json, "saved");
        });
      });
    });
  });
}

function ensureAlarm() {
  chrome.alarms.get(ALARM_NAME, (alarm) => {
    if (!alarm) {
      chrome.alarms.create(ALARM_NAME, { periodInMinutes: PERIOD_IN_MINUTES });
    }
  });
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME) {
    main();
  }
});

chrome.runtime.onInstalled.addListener(() => {
  ensureAlarm();
  main();
});

chrome.runtime.onStartup.addListener(() => {
  ensureAlarm();
  main();
});