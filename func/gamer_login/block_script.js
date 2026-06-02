var gamerLoginModel = new GamerLoginModel();
gamerLoginModel.load().then(function () {
  const statusEl = document.getElementById('gl_status');
  const timeEl = document.getElementById('gl_time');

  if (!gamerLoginModel.lastUpdatedTime) {
    statusEl.textContent = '尚未簽到';
    statusEl.className = 'gl-status';
    timeEl.textContent = '';
    return;
  }

  if (gamerLoginModel.isSuccess) {
    statusEl.textContent = '✓ 已簽到';
    statusEl.className = 'gl-status gl-success';
  } else {
    statusEl.textContent = '✗ 失敗';
    statusEl.className = 'gl-status gl-fail';
  }

  timeEl.textContent = '最後檢查：' + gamerLoginModel.dateStr();
  if (gamerLoginModel.msg) {
    timeEl.textContent += ' (' + gamerLoginModel.msg + ')';
  }
});