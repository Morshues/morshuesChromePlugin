import '/func/ptt_game_notifier/model.js'

const LOG_TAG = 'PTT Game Notifier';
const ALARM_NAME = 'ptt_game_notifier_poll';
const PERIOD_IN_MINUTES = 1;
const PTT_BASE = 'https://www.ptt.cc';
const PTT_URL = PTT_BASE + '/bbs/Gamesale/index.html';

// Service workers have no DOM, so we can't use document.querySelectorAll here.
// Extract the `.r-ent .title` anchors (href + text) straight from the HTML.
function parseTitles(html) {
  const results = [];
  const entryRe = /<div class="r-ent">[\s\S]*?<div class="title">([\s\S]*?)<\/div>/g;
  let entry;
  while ((entry = entryRe.exec(html)) !== null) {
    const link = entry[1].match(/<a href="([^"]+)"[^>]*>([\s\S]*?)<\/a>/);
    if (link) {
      // deleted posts have no <a>, so they're naturally skipped
      results.push({ href: link[1], title: link[2].trim() });
    }
  }
  return results;
}

async function fetchTitles() {
  const response = await fetch(PTT_URL);
  const html = await response.text();
  return parseTitles(html);
}

async function sendTelegram(botToken, chatId, text) {
  const response = await fetch("https://api.telegram.org/bot" + botToken + "/sendMessage", {
    "headers": { "content-type": "application/json" },
    "body": JSON.stringify({ "chat_id": chatId, "text": text }),
    "method": "POST"
  });
  return response.json();
}

async function main() {
  const model = new PttGameNotifierModel();
  await model.load();
  if (!model.isConfigured()) {
    return;
  }

  const timestamp = Date.now();
  let titles;
  try {
    titles = await fetchTitles();
  } catch (e) {
    console.log(LOG_TAG, 'fetch error', e);
    await model.saveState(timestamp, '抓取失敗: ' + e.message);
    return;
  }

  const matched = titles.filter((item) => model.matches(item.title));
  for (const item of matched) {
    if (model.isNotified(item.href)) {
      continue;
    }
    try {
      await sendTelegram(model.botToken, model.chatId, item.title + '\n' + PTT_BASE + item.href);
      model.markNotified(item.href);
    } catch (e) {
      console.log(LOG_TAG, 'telegram error', e);
    }
  }

  const msg = '共 ' + titles.length + ' 篇，符合 ' + matched.length + ' 篇';
  await model.saveState(timestamp, msg);
  console.log(LOG_TAG, model.dateStr(), msg);
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
});

chrome.runtime.onStartup.addListener(() => {
  ensureAlarm();
});