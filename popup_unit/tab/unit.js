function main() {
  tabs = document.getElementById('tabs');
  if (tabs == null) {
    setTimeout(main, 100);
    return;
  }
  panels = document.getElementsByClassName('lib-div');
  tab_content = document.getElementsByClassName('tab-content')[0];
  for (i = 0; i < panels.length; i++) {
    panel = panels[i];
    panel_name = panel.id;

    $(panel).appendTo(tab_content);
    panel.className += ' tab-pane tab-'+panel_name;

    tab = document.createElement('li');
    tab.innerText = panel_name;
    tab.className = 'tab-hd tab-name-'+panel_name;
    tabs.appendChild(tab);
  }

  panels[0].className += ' active';
  tabs.childNodes[1].className += ' active';

  $('#tabs li').click(function(e){
    var tab_name = e.target.className.match(/ ?tab-name-([A-Za-z_]+) ?/)[1];
    $('.tab-hd.active').removeClass('active');
    $('.tab-hd.tab-name-'+tab_name).addClass('active');
    $('.tab-pane.active').removeClass('active');
    $('.tab-pane.tab-'+tab_name).addClass('active');

    pane = tab_content.getElementsByClassName('tab-'+tab_name)[0];
    $('.tab-content').animate({height: pane.clientHeight}, 100);
  });

}

main();
