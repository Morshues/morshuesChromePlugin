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

function createMenu() {
  rootBtn = chrome.contextMenus.create({
    title: '查字典', 
    contexts:['all'],
  });

  chrome.contextMenus.create({
    title: '滬江日文字典', 
    contexts:['all'], 
    parentId: rootBtn,
    onclick: japaneseWord,
  });

  chrome.contextMenus.create({
    title: '雅虎英文字典', 
    contexts:['all'], 
    parentId: rootBtn,
    onclick: englishWord,
  });

  chrome.contextMenus.create({
    title: '越文發音字典', 
    contexts:['all'], 
    parentId: rootBtn,
    onclick: vietnamesePronunciation,
  });

  chrome.contextMenus.create({
    title: '越文字典1', 
    contexts:['all'], 
    parentId: rootBtn,
    onclick: vietnameseWord1,
  });

  chrome.contextMenus.create({
    title: '越文字典2', 
    contexts:['all'], 
    parentId: rootBtn,
    onclick: vietnameseWord2,
  });
}

createMenu();
