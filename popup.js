function loadScript(url) {    
  var head = document.getElementsByTagName('head')[0];
  var script = document.createElement('script');
  script.type = 'text/javascript';
  script.src = url;
  head.appendChild(script);
}

function loadCSS(url) {    
  var head = document.getElementsByTagName('head')[0];
  var link = document.createElement('link');
  link.rel  = 'stylesheet';
  link.type = 'text/css';
  link.href = url;
  link.media = 'all';
  head.appendChild(link);
}

function appendDiv(dname) {
  var div = document.createElement('div');
  div.id = dname;
  div.className += 'lib-div';
  document.body.appendChild(div);
}

function insertDiv(dname) {
  var div = document.createElement('div');
  div.id = dname;
  document.body.insertBefore(div, document.body.firstChild);
}

function loadUnit(name) {
  insertDiv(name);
  loadCSS('popup_unit/' + name + '/unit.css');  
  loadScript('popup_unit/' + name + '/unit.js');  
  $('#' + name).load('popup_unit/' + name + '/unit.html');
}

function loadLib(name) {
  appendDiv(name);
  loadScript('func/' + name + '/model.js');
  $('#' + name).load(chrome.runtime.getURL('func/' + name + '/block.html'), function() {
    loadScript('func/' + name + '/block_script.js');
  });
}

loadLib("calendar");
loadLib("steamgift");
loadLib("steamtool");
loadLib("rent591");
loadLib("daily_check");
loadLib("fb_stalker");
loadLib("gamer_ad_clicker");

// This Unit load at final for lib re-consruct
loadUnit('tab');
