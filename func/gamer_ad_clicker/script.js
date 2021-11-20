
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitItem(query) {
  return new Promise(async(resolve, reject) => {
    count = 100
    while (document.querySelector(query) == null) {
      await sleep(100)
      count--
      if (count <= 0) {
        reject("Can't find - " + query)
        return
      }
    }
    resolve(document.querySelector(query))
  })
}

function addButton(parentNode, text, callback) {
  var btn = document.createElement('input')
  btn.type = 'button'
  btn.value = text
  btn.style = 'position:fixed;top:100px'
  btn.onclick = callback
  parentNode.append(btn)
}

async function process1() {
  try {
    let btn1 = await waitItem(".btn-base.c-accent-o")
    btn1.click()    
  } catch {
    console.warn("redeem button error")
  }

  try {
    let btn2 = await waitItem("dialog .btn-primary")
    btn2.click()    
  } catch {
    console.warn("confirm button error")
  }
}

async function process2() {
  try {
    let check1 = await waitItem("#agree-confirm")
    if (!check1.checked) {
      check1.click()
    }
  } catch {
    console.warn("check item error")
  }

  try {
    let btn1 = await waitItem(".btn-base.c-primary")
    btn1.click()
  } catch {
    console.warn("confirm redeem error")
  }

  try {
    let btn2 = await waitItem("dialog .btn-primary")
    btn2.click()    
  } catch {
    console.warn("confirm button error")
  }
}

async function process3() {
  try {
    let btn1 = await waitItem(".btn.btn--primary")
    btn1.click()
  } catch {
    console.warn("confirm redeem error")
  }
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

main()