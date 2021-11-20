chrome.storage.sync.get(null, function (result) {
  document.getElementById('cb_gamerAdClicker').checked = result.s_gameradclicker || false;
});

document.querySelector('#cb_gamerAdClicker').addEventListener('change', switch_onchange);

function switch_onchange() {
  chrome.storage.sync.set({'s_gameradclicker': document.querySelector('#cb_gamerAdClicker').checked});
}

