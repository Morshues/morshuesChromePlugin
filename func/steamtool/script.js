var model = new SteamToolModel();

var earnPrice = 9999;

function main() {
  buildCtrlPanel();
  appendAll();
}

function buildCtrlPanel() {
  var ctrlPanel = document.createElement('div');
  ctrlPanel.style = 'position:fixed;top:20%;left:5%;background:mauve;';

  var priceInput = document.createElement('input');
  priceInput.type = 'type';
  priceInput.value = earnPrice + '';
  priceInput.style = 'background:white;';
  ctrlPanel.append(priceInput)

  ctrlPanel.append(document.createElement('br'));

  var earnPriceLabel = document.createElement('span');
  earnPriceLabel.innerText = '得到 ' + priceInput.value;
  earnPriceLabel.style = 'color:white;background:black;';
  ctrlPanel.append(earnPriceLabel)

  ctrlPanel.append(document.createElement('br'));

  var salePriceLabel = document.createElement('span');
  salePriceLabel.innerText = '販賣 ' + priceInput.value;
  salePriceLabel.style = 'color:white;background:black;';
  ctrlPanel.append(salePriceLabel)

  ctrlPanel.append(document.createElement('br'));  

  let btnAppend = document.createElement('span');
  btnAppend.innerText = 'Append Button';
  btnAppend.addEventListener('click', appendAll);
  ctrlPanel.append(btnAppend);

  priceInput.addEventListener('input', function() { 
    earnPrice = parseFloat(priceInput.value);
    earnPriceLabel.innerText = '得到 ' + earnPrice;
    salePriceLabel.innerText = '販賣 ' + (earnPrice + Math.floor(earnPrice*10)/100 + Math.floor(earnPrice*5)/100);
  }, false);

  document.body.append(ctrlPanel);
}

function appendAll() {
  var itemHolders = document.getElementsByClassName('itemHolder');
  for (var i = 0; i < itemHolders.length; i++) {
    appendRun(itemHolders[i]);
  }
}

function appendRun(item) {
  // var item = document.getElementsByClassName("itemHolder")[index]
  var btnRun = document.createElement('span');
  btnRun.innerText = 'R';
  btnRun.onclick = function() { 
    item.getElementsByTagName('a')[0].click()
    setTimeout(run, 100);
  }
  btnRun.style = 'position:absolute;top:3px;left:3px;background:white;z-index:99;';
  item.append(btnRun);

  var btnGoo = document.createElement('span');
  btnGoo.innerText = 'G';
  btnGoo.onclick = function() { 
    setTimeout(()=>{goo(item)}, 100);
  }
  btnGoo.style = 'position:absolute;top:3px;right:3px;background:white;z-index:99;';
  item.append(btnGoo);

  var checkboxRun = document.createElement('checkbox');
  checkboxRun.style = 'position:absolute;top:3px;right:3px;z-index:99;';
  item.append(checkboxRun);
}

function run() {
  SellCurrentSelection();
  step2();
}

function step2() {
  if (document.getElementById("pricehistory_throbber").style.display == "none") {
    document.getElementById("market_sell_currency_input").value = earnPrice;
    document.getElementById("market_sell_buyercurrency_input").value = earnPrice + Math.floor(earnPrice*10)/100 + Math.floor(earnPrice*5)/100;
    document.getElementById("market_sell_dialog_accept_ssa").checked = true;
    document.getElementById("market_sell_dialog_accept").click();
    setTimeout(step3, 500);
  } else {
    setTimeout(step2, 100);
  }

}

function step3() {
  if (document.getElementById("market_sell_dialog_back").parentNode.clientHeight > 0) {
    document.getElementById("market_sell_dialog_ok").click(); 
    setTimeout(step4, 100);
  } else {
    setTimeout(step3, 100);
  }
}

function step4() {
  if (document.getElementsByClassName("newmodal").length == 2 && document.getElementsByClassName("newmodal")[1].getElementsByClassName("btn_grey_white_innerfade btn_medium")[0].childNodes[0].innerText == "確定") {
    document.getElementsByClassName("newmodal")[1].getElementsByClassName("btn_grey_white_innerfade btn_medium")[0].click();
  } else {
    setTimeout(step4, 100);
  }
}

let gooFailedCount = 100;
function goo(item) {  
  item.getElementsByTagName('a')[0].click();

  let btn;
  try {
    btn = document.getElementById("iteminfo1_item_scrap_actions").getElementsByTagName("DIV")[1].getElementsByTagName("a")[0];
  } catch {
    console.warn("gooStep1 exception");
    if (--gooFailedCount == 0) return;
  }
  console.log(btn, btn.href, typeof btn.href)
  if (btn == null || !btn.href.includes("GrindIntoGoo")) {
    setTimeout(()=>{goo(item)}, 200);
    return
  }
  btn.click();

  setTimeout(gooStep2, 200);
}

function gooStep2() {
  let btn;
  try {
    btn = document.getElementsByClassName("btn_green_steamui btn_medium")[0].getElementsByTagName("SPAN")[0];
  } catch {
    console.warn("gooStep2 exception");
    if (--gooFailedCount == 0) return;
  }
  if (btn == null) {
    setTimeout(gooStep2, 200);
    return
  }
  btn.click();

  setTimeout(gooStep3, 200);
}

function gooStep3() {
  let btn;
  try {
    btn = document.getElementsByClassName("newmodal")[1].getElementsByTagName("SPAN")[0];
  } catch {
    console.warn("gooStep3 exception");
    if (--gooFailedCount == 0) return;
  }
  if (btn == null) {
    setTimeout(gooStep3, 200);
    return
  }
  btn.click();
}

model.load(function() {
  earnPrice = model.getPrice();
  if (model.getEnable()) {
    main();
  }
});

