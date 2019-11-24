let clickedEl = null;
let deletedPool = [];

document.addEventListener("mousedown", function(event){
  //right click
  if(event.button == 2) { 
    clickedEl = event.target;
    // console.log(clickedEl);
  }
}, true);

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request == "deleteEl") {
    parentEl = clickedEl.parentNode;
    deletedEl = parentEl.removeChild(clickedEl);
    deletedPool.push([parentEl, deletedEl]);
    // sendResponse({deletedEl: DOMtoString(deletedEl)});
  } else if (request == "recoverEl") {
    lastItem = deletedPool.pop();
    lastItem[0].appendChild(lastItem[1]);
    console.log(lastItem[0])
    console.log(lastItem[1])
  } else if (request == "genElInstuction") {
    var domGetter = fetchItemDOMGetter(clickedEl)
    copyTextToClipboard("document"+domGetter.str)
  }
});

function fetchItemDOMGetter(item) {
  var parentGetter = ""
  // if (item.parentNode != document && item.parentNode != null) {
  //   parentGetter = fetchItemDOMGetter(item.parentNode)
  // }

  if (item.id != "") {
    return { parent: null, str: ".getElementById(\"" + item.id + "\")" }
  } else if (item.className != "") {
    var parentNode = item.parentNode
    var children = item.parentNode.getElementsByClassName(item.className)
    while ( (nextParentNode = parentNode.parentNode) && item.parentNode != document && item.parentNode != null ) {
      if (nextParentNode.getElementsByClassName(item.className).length == children.length) {
        parentNode = nextParentNode;
      } else {
        break
      }
    }
    var index = 0
    for (var i = 0; i < children.length; i++) {
      if (children[i] == item) {
        index = i
        break
      }
    }
    if (parentNode != document && item.parentNode != null ) {
      parentGetter = fetchItemDOMGetter(parentNode).str
    }
    return { parent: parentNode, str: parentGetter + ".getElementsByClassName(\"" + item.className + "\")[" + index + "]" }
  } else {
    var parentNode = item.parentNode
    var children = item.parentNode.getElementsByTagName(item.tagName)
    while ( (nextParentNode = parentNode.parentNode) && item.parentNode != document && item.parentNode != null ) {
      if (nextParentNode.getElementsByTagName(item.tagName).length == children.length) {
        parentNode = nextParentNode;
      } else {
        break
      }
    }
    var index = 0
    for (var i = 0; i < children.length; i++) {
      if (children[i] == item) {
        index = i
        break
      }
    }
    if (parentNode != document && item.parentNode != null ) {
      parentGetter = fetchItemDOMGetter(parentNode).str
    }
    return { parent: parentNode, str: parentGetter + ".getElementsByTagName(\"" + item.tagName + "\")[" + index + "]" }
  }
}

function copyTextToClipboard(text) {
  //Create a textbox field where we can insert text to. 
  var copyFrom = document.createElement("textarea");

  //Set the text content to be the text you wished to copy.
  copyFrom.textContent = text;

  //Append the textbox field into the body as a child. 
  //"execCommand()" only works when there exists selected text, and the text is inside 
  //document.body (meaning the text is part of a valid rendered HTML element).
  document.body.appendChild(copyFrom);

  //Select all the text!
  copyFrom.select();

  //Execute command
  document.execCommand('copy');

  //(Optional) De-select the text using blur(). 
  copyFrom.blur();

  //Remove the textbox field from the document.body, so no other JavaScript nor 
  //other elements can get access to this.
  document.body.removeChild(copyFrom);
}