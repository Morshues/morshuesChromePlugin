
async function process1() {
  await waitAndClick(waitItem(".btn-base.c-accent-o"), { tag: "Redeem Button" })
  await waitAndClick(waitItem("dialog .btn-primary"), { tag: "Confirm Button" })
}

async function process2() {
  await waitAndCheck(waitItem("#agree-confirm"), { tag: "Policy CheckBox" })
  await waitAndClick(waitItem(".btn-base.c-primary"), { tag: "Confirm Redeem" })
  await waitAndClick(waitItem("dialog .btn-primary"), { tag: "Confirm Button" })
}

async function process3() {
  await waitAndClick(waitItem(".btn.btn--primary"), { tag: "Confirm Redeem" })
}

function main() {
  if (window.location.href.startsWith("https://fuli.gamer.com.tw/shop_detail.php?sn=")) {
    process1()
  } else if (window.location.href.startsWith("https://fuli.gamer.com.tw/buyD.php?ad=1&sn=")) {
    process2()
  } else if (window.location.href.startsWith("https://fuli.gamer.com.tw/message_done.php?type=3&sn=")) {
    process3()      
  } else {
    console.warn("unknown url to run gamer_ad_clicker")
  }
}

chrome.storage.sync.get('s_gameradclicker', function (result) {
  if (result.s_gameradclicker) {
    setTimeout(main, 500)
  }
})