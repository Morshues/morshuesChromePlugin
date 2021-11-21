
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
