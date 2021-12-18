chrome.storage.sync.get(null, function (result) {
  document.getElementById('cb_gamerAdClicker').checked = result.s_gameradclicker || false;
  document.getElementById('cb_googleAdClicker').checked = result.s_googleadclicker || false;
});

document.querySelector('#cb_gamerAdClicker').addEventListener('change', gamerAdOnchange);
document.querySelector('#cb_googleAdClicker').addEventListener('change', googleAdOnchange);

function gamerAdOnchange() {
  chrome.storage.sync.set({'s_gameradclicker': document.querySelector('#cb_gamerAdClicker').checked});
}

function googleAdOnchange() {
  chrome.storage.sync.set({'s_googleadclicker': document.querySelector('#cb_googleAdClicker').checked});
}
