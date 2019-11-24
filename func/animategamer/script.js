var dataModel = new AnimateGamerModel();

/* Find */
function find_block() {
  blocks = document.getElementsByClassName("userContentWrapper");
  if (blocks <= 0) {
    setTimeout(find_block, 1000);
    return;    
  }

  tar_block = null;
  for (var i = 0; i < blocks.length; i++) {
    if (blocks[i].getElementsByClassName("text_exposed_root").length == 0) {
      continue;
    }
    compare_txt = blocks[i].getElementsByClassName("text_exposed_root")[0].getElementsByTagName("p")[0].childNodes[0].textContent;
    if (dataModel.TodayText() === compare_txt) {
      tar_block = blocks[i];
      break;
    }
  }

  if (tar_block == null) {
    window.scrollTo(0, document.body.scrollHeight);
    setTimeout(find_block, 1000);
  } else {
    click_comment(tar_block);
  }
}

function click_comment(tar_block) {
  links = tar_block.getElementsByTagName("a");
  // links = tar_block.getElementsByClassName("UFILastCommentComponent")[0].getElementsByClassName("UFIPagerLink");
  if (links[links.length-1].innerText.startsWith("檢視另") || links[links.length-1].innerText.startsWith("查看更多留言")) {
    links[links.length-1].click();

    scan_max(tar_block);
  }
}

function scan_max(tar_block) {
  comments = tar_block.getElementsByTagName("ul")[1].children;
  // comments = tar_block.getElementsByClassName("UFIComment");
  if (comments.length < 3) {
    setTimeout(function() { scan_max(tar_block); }, 1000);
    return;
  }

  count_array = [null, 0, 0, 0, 0];
  for (var i = 0; i < comments.length; i++) {
    content_block = comments[i].getElementsByClassName("_3l3x")[0];
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
