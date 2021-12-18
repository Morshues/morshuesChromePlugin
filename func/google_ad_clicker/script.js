
async function ad1() {
  await waitAndClick(waitItem(".rewardResumebutton"), { tag: "Resume Reward" })
  await sleep(3000)
  await waitAndNope(
    waitCondition(() => { return document.querySelector(".rewardedAdUiAttribution").innerText == "" }),
    { tag: "Count Down" } 
  )
  await waitAndClick(waitItem("img", 2), { tag: "Close Video" })
}

async function ad2() {
  await waitAndNope(
    waitCondition(() => { return document.querySelector("#count_down").style.visibility == 'hidden' }),
    { tag: "Count Down" } 
  )
  await waitAndClick(waitItem("#close_button"), { tag: "Close Button" })
}

function main() {
  console.log("running google ad clicker")
  removeLeavePageEvents()
  if (document.querySelector(".rewardResumebutton") != null) {
    ad1()
  } else if (document.querySelector("#reward_close_button_widget #count_down_container #count_down") != null) {
    ad2()
  } else {
    console.log("target ad not found")
  }
}

chrome.storage.sync.get('s_googleadclicker', function (result) {
  if (result.s_googleadclicker) {
    setTimeout(main, 500)
  }
})

