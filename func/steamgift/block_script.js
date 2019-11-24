chrome.storage.sync.get(null, function (result) {
  document.getElementById('cb_steamgift').checked = result.s_steamgift || false;
});

document.querySelector('#cb_steamgift').addEventListener('change', steamgift_switch_onchange);

function steamgift_switch_onchange() {
  chrome.storage.sync.set({'s_steamgift': document.querySelector('#cb_steamgift').checked});
}

