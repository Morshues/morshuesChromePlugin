var stalkModel = new StalkerModel();
fb_stalker = $('#fb_stalker');

fb_stalker.find('#switch').change(function() {
  stalkModel.enable = fb_stalker.find('#switch').is(':checked');
  stalkModel.save();
});

fb_stalker.find('#names').change(function() {
  stalkModel.setNameStr(fb_stalker.find('#names').val());
  stalkModel.save();
});

fb_stalker.find('#btn_clear').click(function() {
  stalkModel.setNameStr('');
  stalkModel.clearHistories();
  stalkModel.save(function() {
    tableBuilder(stalkModel.histories);
  });
});

stalkModel.load(function() {
  fb_stalker.find('#switch').attr('checked', stalkModel.enable);
  fb_stalker.find('#names').val(stalkModel.names.join(','));
  tableBuilder(stalkModel.histories);
});


function tableBuilder(histories) {
  table = fb_stalker.find('#result_table');
  table.html("");
  if (histories == null || histories == {}) {
    return;
  }
  keys = Object.keys(histories);
  for (var i = 0; i < keys.length; i++) {
    key = keys[i];
    person = histories[key];
    for (var j = person.length-1; j >= 0; j--) {
      record = person[j];
      tmp_date = new Date(record.time);
      date_str = ("0" + (tmp_date.getMonth()+1)).slice(-2) + '/' + ("0" + tmp_date.getDate()).slice(-2) ;
      date_str += '<br>';
      date_str += ("0" + tmp_date.getHours()).slice(-2) + ':' + ("0" + tmp_date.getMinutes()).slice(-2) ;
      table.append('<tr>' 
        + '<td>' + key + '</td>'
        + '<td>' + '<a href="' + record.link + '">' + record.text + '</a>' + '</td>'
        + '<td>' + date_str + '</td>'
        + '</tr>');
    };
  }

  // Bind the click event for links
  $('body').on('click', 'a', function(){
     chrome.tabs.create({url: $(this).attr('href')});
     return false;
  });
};
