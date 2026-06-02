import '/func/gamer_login/model.js'

const LOG_TAG = 'Gamer Login';
const ALARM_NAME = 'gamer_login_daily';
const PERIOD_IN_MINUTES = 60;

async function getToken(timestamp) {
  const response = await fetch("https://www.gamer.com.tw/ajax/get_csrf_token.php?_="+timestamp.toString(), {
    "headers": {
      "accept": "*/*",
    },
    "method": "GET",
    "credentials": "include"
  });
  return response.text();
}

async function login(token) {
  const response = await fetch("https://www.gamer.com.tw/ajax/signin.php", {
    "headers": {
      "accept": "application/json, text/javascript, */*; q=0.01",
      "content-type": "application/x-www-form-urlencoded; charset=UTF-8",
    },
    "body": "action=1&token="+token,
    "method": "POST",
    "credentials": "include"
  });
  return response.json();
}

async function main() {
  const dataModel = new GamerLoginModel();
  await dataModel.load();
  if (dataModel.isLoggedIn()) {
    await dataModel.touch(Date.now());
    console.log(LOG_TAG, 'Checked and Logged in')
    return;
  }

  const timestamp = Date.now();
  const token = await getToken(timestamp);
  console.log(LOG_TAG, 'Got token:', token)
  const json = await login(token);
  await dataModel.save(timestamp, json);
  console.log(LOG_TAG, dataModel.dateStr(), json, "saved");
}

function ensureAlarm() {
  chrome.alarms.get(ALARM_NAME, (alarm) => {
    // Re-create when missing or when the stored period no longer matches the
    // current constant; create() with an existing name overwrites it.
    if (!alarm || alarm.periodInMinutes !== PERIOD_IN_MINUTES) {
      chrome.alarms.create(ALARM_NAME, { periodInMinutes: PERIOD_IN_MINUTES });
    }
  });
}

chrome.alarms.onAlarm.addListener((alarm) => {
  if (alarm.name === ALARM_NAME) {
    return main();
  }
});

chrome.runtime.onInstalled.addListener(() => {
  ensureAlarm();
  return main();
});

chrome.runtime.onStartup.addListener(() => {
  ensureAlarm();
  return main();
});