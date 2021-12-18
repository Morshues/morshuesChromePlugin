
function sleep(ms) {
  return new Promise(resolve => setTimeout(resolve, ms));
}

async function waitItem(query, index = 0) {
  return new Promise(async(resolve, reject) => {
    count = 100
    while (document.querySelectorAll(query)[index] == null) {
      await sleep(100)
      count--
      if (count <= 0) {
        reject("Can't find - " + query)
        return
      }
    }
    resolve(document.querySelectorAll(query)[index])
  })
}

async function waitCondition(condition) {
    return new Promise(async(resolve, reject) => {
    count = 100
    while (!condition()) {
      await sleep(500)
      count--
      if (count <= 0) {
        reject("Condition not established")
        return
      }
    }
    resolve()
  })
}

async function waitAndAction(promise, action, params = {}) {
  try {
    let item = await promise
    if (typeof action == 'function') {
      action(item)
    } else {
      console.log("Wait For null Action")
    }
    if (params.successMsg) console.log(params.successMsg)
    else if (params.tag) console.log(params.tag + " Actioned") 
  } catch(e) {
    if (params.failureMsg) console.info(params.failureMsg)
    else if (params.tag) console.log("%c" + params.tag + " Error", "color:lightblue;", e) 
  }
}

async function waitAndNope(promise, params = {}) {
  await waitAndAction(promise, item => {}, params)
}

async function waitAndClick(promise, params = {}) {
  await waitAndAction(promise, item => item.click(), params)
}

async function waitAndCheck(promise, params = {}) {
  await waitAndAction(promise, item => { if (!item.checked) item.click() }, params)
}


function addFloatButton(parentNode, text, callback) {
  var btn = document.createElement('input')
  btn.type = 'button'
  btn.value = text
  btn.style = 'position:fixed;top:100px'
  btn.onclick = callback
  parentNode.append(btn)
}


function removeLeavePageEvents() {
  for (event_name of ["visibilitychange", "webkitvisibilitychange", "blur"]) {
    window.addEventListener(event_name, function(event) {
      event.stopImmediatePropagation();
    }, true);
  }
}