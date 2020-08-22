var dataModel = new AnimateGamerModel();

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
  blocks = document.getElementsByClassName("du4w35lb k4urcfbm l9j0dhe7 sjgh65i0");
  if (blocks <= 0) {
    setTimeout(find_block, 1000);
    return;    
  }

  tar_block = findNodeByRegex(blocks, "\\[" + dataModel.TodayText() + "\\]", true);

  if (tar_block == null) {
    window.scrollTo(0, document.body.scrollHeight);
    setTimeout(find_block, 1000);
  } else {
    click_comment(tar_block);
  }
}

function click_comment(tar_block) {
  links = tar_block.getElementsByClassName("oi732d6d ik7dh3pa qv66sw1b c1et5uql a8c37x1j muag1w35 enqfppq2 jq4qci2q a3bd9o3v lrazzd5p m9osqain");
  if (links[links.length-1].innerText.startsWith("檢視另") || links[links.length-1].innerText.startsWith("查看更多留言")) {
    links[links.length-1].click();

    scan_max(tar_block);
  }
}

function scan_max(tar_block) {
  comments = tar_block.getElementsByClassName("ecm0bbzt e5nlhep0 a8c37x1j");
  if (comments.length < 3) {
    setTimeout(function() { scan_max(tar_block); }, 1000);
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
    window.close();
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
  answerSpan.innerText = 'ans - ' + dataModel.answer + ' - (' + dataModel.date_str.substring(1,6) + ')';
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

/* Main Method */
dataModel.load(function() {
  if (document.URL.match(/https\:\/\/www\.facebook\.com\/p?g?\/?animategamer\.*/i)) {
    if (dataModel.enable && !dataModel.isSameDay()) {
      find_block();
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

