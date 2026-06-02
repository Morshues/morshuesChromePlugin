var pttModel = new PttGameNotifierModel();
pttModel.load().then(function () {
  document.getElementById('pgn_keyword').value = pttModel.keywordsStr();
  document.getElementById('pgn_token').value = pttModel.botToken;
  document.getElementById('pgn_chat').value = pttModel.chatId;
  document.getElementById('pgn_enabled').checked = pttModel.enabled;
  renderPttStatus();

  document.getElementById('pgn_save').addEventListener('click', function () {
    pttModel.keywords = pttModel.parseKeywords(document.getElementById('pgn_keyword').value);
    pttModel.botToken = document.getElementById('pgn_token').value.trim();
    pttModel.chatId = document.getElementById('pgn_chat').value.trim();
    pttModel.enabled = document.getElementById('pgn_enabled').checked;
    pttModel.saveConfig().then(function () {
      renderPttStatus('已儲存');
    });
  });
});

function renderPttStatus(prefix) {
  const el = document.getElementById('pgn_status');
  el.style.whiteSpace = 'pre-line';
  let text;
  if (pttModel.lastUpdatedTime) {
    text = '最後檢查：' + pttModel.dateStr();
    if (pttModel.msg) {
      text += '\n' + pttModel.msg;
    }
  } else {
    text = '尚未檢查';
  }
  el.textContent = prefix ? (prefix + ' ／ ' + text) : text;
}