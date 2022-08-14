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
    console.log(result);
  });
}

function onMenuClicked(info, tab) {
  switch (info.menuItemId) {
    case 'ele_delete':
      deleteElement(info, tab);
      break;
    case 'ele_recover':
      recoveryElement(info, tab);
      break;
    case 'ele_ins_gen':
      genElementInstruction(info, tab);
      break;
  }
}

const rootBtn = 'root'

chrome.contextMenus.create({
  id: 'ele_delete',
  title: '刪除元素', 
  contexts:['all'], 
  parentId: rootBtn,
});

chrome.contextMenus.create({
  id: 'ele_recover',
  title: '復原元素', 
  contexts:['all'], 
  parentId: rootBtn,
});

chrome.contextMenus.create({
  id: 'ele_ins_gen',
  title: '產生元素指令', 
  contexts:['all'], 
  parentId: rootBtn,
});

chrome.contextMenus.onClicked.addListener(onMenuClicked)
