function deleteElement(info, tab) {
  chrome.tabs.sendMessage(tab.id, "deleteEl", function(result) {
    // console.log(result);
  });
}

function recoveryElement(info, tab) {
  chrome.tabs.sendMessage(tab.id, "recoverEl", function(result) {
    // console.log(result);
  });
}

function genElementInstruction(info, tab) {
  chrome.tabs.sendMessage(tab.id, "genElInstuction", function(result) {
    // console.log(result);
  });
}

chrome.contextMenus.create({
  title: '刪除元素', 
  contexts:['all'], 
  parentId: rootBtn,
  onclick: deleteElement,
});

chrome.contextMenus.create({
  title: '復原元素', 
  contexts:['all'], 
  parentId: rootBtn,
  onclick: recoveryElement,
});

chrome.contextMenus.create({
  title: '產生元素指令', 
  contexts:['all'], 
  parentId: rootBtn,
  onclick: genElementInstruction,
});
