function createNewTab(path) {
  chrome.tabs.create({
    url: path,
  });
}

function japaneseWord(info, tab) {
  createNewTab('https://dict.hjenglish.com/jp/jc/' + info.selectionText);
}

function englishWord(info, tab) {
  createNewTab('https://tw.dictionary.search.yahoo.com/search?p=' + info.selectionText);
}

function vietnamesePronunciation(info, tab) {
  createNewTab('https://zh.forvo.com/word/' + info.selectionText + '/');
}

function vietnameseWord1(info, tab) {
  createNewTab('https://zh.glosbe.com/vi/zh/' + info.selectionText);
}

function vietnameseWord2(info, tab) {
  createNewTab('https://www.dict.com/%E8%B6%8A%E5%8D%97%E8%AF%AD-%E6%B1%89%E8%AF%AD/' + info.selectionText);
}

function onMenuClicked(info, tab) {
  switch (info.menuItemId) {
    case 'dic_hjenglish':
      japaneseWord(info, tab);
      break;
    case 'dic_yahoo':
      englishWord(info, tab);
      break;
    case 'dic_vietnamese':
      vietnamesePronunciation(info, tab);
      break;
    case 'dic_vietnamese_1':
      vietnameseWord1(info, tab);
      break;
    case 'dic_vietnamese_2':
      vietnameseWord2(info, tab);
      break;
  }
}

function createMenu() {
  const rootBtn = chrome.contextMenus.create({
    id: 'root',
    title: '查字典', 
    contexts:['all'],
  });

  chrome.contextMenus.create({
    id: 'dic_hjenglish',
    title: '滬江日文字典', 
    contexts:['all'], 
    parentId: rootBtn,
  });

  chrome.contextMenus.create({
    id: 'dic_yahoo',
    title: '雅虎英文字典', 
    contexts:['all'], 
    parentId: rootBtn,
  });

  chrome.contextMenus.create({
    id: 'dic_vietnamese_pron',
    title: '越文發音字典', 
    contexts:['all'], 
    parentId: rootBtn,
  });

  chrome.contextMenus.create({
    id: 'dic_vietnamese_1',
    title: '越文字典1', 
    contexts:['all'], 
    parentId: rootBtn,
  });

  chrome.contextMenus.create({
    id: 'dic_vietnamese_2',
    title: '越文字典2', 
    contexts:['all'], 
    parentId: rootBtn,
  });

  chrome.contextMenus.onClicked.addListener(onMenuClicked)
}

createMenu();
