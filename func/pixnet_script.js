// Unlock right click
var s = document.createElement('script');
s.innerText = "body = document.getElementsByTagName('body')[0]; body.removeAttribute('oncontextmenu'); body.removeAttribute('onDragStart'); body.removeAttribute('onselectstart');";
s.onload = function() {
    this.remove();
};
(document.head || document.documentElement).appendChild(s);

// Remove ad
popScript = document.getElementById("idleTemplate");
if (popScript != null) {
    popScript.parentNode.removeChild(popScript);	
}

// Remove ad
ad = document.getElementById('ad-full-page');
if (ad != null) {
	ad.parentNode.removeChild(ad);
}
