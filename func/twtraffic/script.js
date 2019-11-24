function onclick_from_junan() {
  document.getElementById("lbf_0").click();
  CityChange("3", jsonStation, "FromStation");
  $("#FromCity").val("3");
  $("#FromStation").val("1028");
}

function onclick_from_junan_to_taipei() {
  onclick_from_junan();
  document.getElementById("lbt_1008").click();
}

function onclick_to_junan() {
  document.getElementById("lbt_0").click();
  CityChange("3", jsonStation, "ToStation");
  $("#ToCity").val("3");
  $("#ToStation").val("1028");
}

function onclick_from_taipei_to_junan() {
  document.getElementById("lbf_1008").click();
  onclick_to_junan();
}

function add_button() {
	tableForm = document.getElementsByClassName("table_form")[0];
	panels = tableForm.getElementsByTagName("fieldset");
	fromPanel = panels[0];
	toPanel = panels[1];

	btn_from_junan = document.createElement("input");
  btn_from_junan.id = "btn_from_junan"
	btn_from_junan.type = "button";
	btn_from_junan.value = "竹南";
	btn_from_junan.className = "ex_btn";
	fromPanel.appendChild(btn_from_junan);
  btn_from_junan.addEventListener("click", function(){ window.location = "javascript:(function(){onclick_from_junan();})()";});

	btn_from_junan_to_taipei = document.createElement("input");
  btn_from_junan_to_taipei.id = "btn_from_junan_to_taipei"
	btn_from_junan_to_taipei.type = "button";
	btn_from_junan_to_taipei.value = "竹南->台北";
	btn_from_junan_to_taipei.className = "ex_btn second";
	fromPanel.appendChild(btn_from_junan_to_taipei);
  btn_from_junan_to_taipei.addEventListener("click", function(){ window.location = "javascript:(function(){onclick_from_junan_to_taipei();})()";});

	btn_to_junan = document.createElement("input");
  btn_to_junan.id = "btn_to_junan"
	btn_to_junan.type = "button";
	btn_to_junan.value = "竹南";
	btn_to_junan.className = "ex_btn";
	toPanel.appendChild(btn_to_junan);
  btn_to_junan.addEventListener("click", function(){ window.location = "javascript:(function(){onclick_to_junan();})()";});

	btn_from_taipei_to_junan = document.createElement("input");
  btn_from_taipei_to_junan.id = "btn_from_taipei_to_junan"
	btn_from_taipei_to_junan.type = "button";
	btn_from_taipei_to_junan.value = "台北->竹南";
	btn_from_taipei_to_junan.className = "ex_btn second";
	toPanel.appendChild(btn_from_taipei_to_junan);
  btn_from_taipei_to_junan.addEventListener("click", function(){ window.location = "javascript:(function(){onclick_from_taipei_to_junan();})()";});
}

window.onload = function() {
  add_button();

  // Inject function to original page for calling original methods
  var actualCode = onclick_from_junan + '\n' + onclick_from_junan_to_taipei + '\n' + onclick_to_junan + '\n' + onclick_from_taipei_to_junan;
  var script = document.createElement('script');
  script.textContent = actualCode;
  document.head.appendChild(script);
}
