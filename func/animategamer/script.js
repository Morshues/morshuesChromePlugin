var dataModel = new AnimateGamerModel();
let ifClose = false;
const MAX_SCROLL_LIMIT = 30;
let scrollCount = 0;

function findNodeByRegex(blocks, regexText, useInnerText = false) {
  // var aTags = parent.getElementsByTagName(tagName);
  var found;

  cmdRegex = RegExp(regexText, 'g');
  for (var i = 0; i < blocks.length; i++) {
    text = blocks[i].textContent;
    if (useInnerText) {
      text = blocks[i].innerText;
    }
    if (cmdRegex.test(text)) {
      found = blocks[i];
      break;
    }
  }

  return found;
}

/* Find */
function find_block() {
  if (scrollCount >= MAX_SCROLL_LIMIT) {
    return;
  }

  const dayText = "[" + dataModel.TodayText() + "]";
  console.log("dayText:", dayText)
  const dayNode = Array.from(document.querySelectorAll('div'))
    .find(el => el.textContent === dayText);

  if (dayNode == null) {
    scrollCount++;
    window.scrollTo(0, document.body.scrollHeight);
    setTimeout(find_block, 1000);
    return;
  }

  let targetNode = dayNode;
  while (targetNode != document.body) {
    if (targetNode.textContent.includes("檢視另")
      || targetNode.textContent.includes("查看更多留言")
      || targetNode.textContent.includes("more comments")
    ) {
      break;
    }
    targetNode = targetNode.parentNode;
  }

  if (targetNode == document.body) {
    console.error("targetNode not found")
    return;
  }

  click_comment(targetNode);
}

function click_comment(targetNode) {
  let moreNode = Array.from(targetNode.querySelectorAll('span'))
    .find(el => el.innerText.startsWith("檢視另"));

  if (moreNode == null) {
    console.error("moreNode not found")
    return;
  }
  moreNode.click();

  scan_max(targetNode);
}

function scan_max(targetNode) {
  const comments = Array.from(targetNode.querySelectorAll("div:not(:has(*))"))
    .filter(el => (el.textContent >= 1 && el.textContent <= 4));

  if (comments.length < 3) {
    setTimeout(function() { scan_max(targetNode); }, 1000);
    return;
  }

  count_array = [null, 0, 0, 0, 0];
  for (var i = 0; i < comments.length; i++) {
    content_block = comments[i];
    if (content_block == null) {
      continue;
    }
    value = parseInt(content_block.textContent);
    count_array[value]++;
  }
  max_index = null;
  temp_value = 1;
  for (var i = 1; i < 5; i++) {
    if (count_array[i] > temp_value) {
      max_index = i;
      temp_value = count_array[i];
    }
  }
  max_index
  return answer_get(max_index);
}

function answer_get(answer) {
  dataModel.enable = false;
  dataModel.answer = answer;
  dataModel.date_str = dataModel.TodayText();
  dataModel.save(function() {
    ifClose = true;
  });
}

/* Paste */
function paste_block() {
  if (!dataModel.isSameDay()) {
    setTimeout(function() {
      dataModel.load(function() {
        paste_block();
      });
    }, 5000);
    return;
  }

  var container = document.getElementsByClassName('mainmenu on_top')[0];
  var answerSpan = document.createElement('span');
  answerSpan.style = 'position:absolute;top:0;right:0px;font-size:30px;';
  answerSpan.innerText = 'ans - ' + dataModel.answer + ' - (' + dataModel.date_str.substring(0,5) + ')';
  container.append(answerSpan);

  // document.getElementsByClassName('anime-quiz')[0].getElementsByTagName('a')
  auto_answer();
}

function auto_answer() {
  quiz_block = document.getElementsByClassName('anime-quiz')[0]
  if (quiz_block != null) {
    quiz_btns = quiz_block.getElementsByTagName('a');
    if (quiz_btns.length == 6) {
      quiz_btns[dataModel.answer].click();
      setTimeout(auto_answer, 3000);
      return;
    } else if (quiz_btns.length == 1){
      quiz_btns[0].click();
      return;
    }    
  }
  setTimeout(auto_answer, 60000);  
}

function auto_close() {
  if (ifClose) {
    window.close();    
  } else {
    setTimeout(auto_close, 1000);
  }
}

/* Main Method */
dataModel.load(function() {
  if (document.URL.match(/https\:\/\/www\.facebook\.com\/p?g?\/?animategamer\.*/i)) {
    if (dataModel.enable && !dataModel.isSameDay()) {
      find_block();
      auto_close();
    }
  } else {
    if (!dataModel.isSameDay()) {
      dataModel.enable = true;
      dataModel.save(function() {
        chrome.runtime.sendMessage({func: 'animategamer'});
      });      
    }
    paste_block();
  }
});

