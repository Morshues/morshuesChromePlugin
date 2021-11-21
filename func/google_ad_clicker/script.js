
async function ad1() {
  try {
    let btn1 = await waitItem(".rewardResumebutton")
    btn1.click()
    console.log("clicked resume")
  } catch(e) {
    console.warn("resume reward error")
  }

  await sleep(500)

  // countDown
  count = 100
  while (document.querySelector(".rewardedAdUiAttribution").innerText != "") {
    await sleep(500)
    count--
    if (count <= 0) {
      console.log("rewardedAdUiAttribution not found")
      break
    }
  }
  console.log("clicked rewardedAdUiAttribution if found")

  try {
    let btn2 = await waitItem(".videoAdUiSkipButton")
    btn2.click()
    console.log("clicked skip")
  } catch(e) {
    console.warn("skip video error")
  }
}

async function ad2() {
  try {
    await waitCondition(() => { return document.querySelector("#count_down").style.visibility == 'hidden' })
    console.log("wait count_down success")
  } catch(e) {
    console.warn("wait count_down error")
  }

  try {
    let btn1 = await waitItem("#close_button")
    btn1.click()
    console.log("clicked skip")
  } catch(e) {
    console.warn("skip video error")
  }

}

function main() {
  console.log("running google ad clicker")
  if (document.querySelector(".rewardResumebutton") != null) {
    ad1()
  } else if (document.querySelector("#reward_close_button_widget #count_down_container #count_down") != null) {
    ad2()
  } else {
    console.log("target ad not found")
  }
}

chrome.storage.sync.get('s_gameradclicker', function (result) {
    if (result.s_gameradclicker) {
      setTimeout(main, 500)
    }
})

