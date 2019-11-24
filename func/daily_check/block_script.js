var model = new SteamToolModel();
panel = $('#steamtool');

panel.find('#switch').change(function() {
  model.setEnable(panel.find('#switch').is(':checked'));
  model.save();
});

panel.find('#price').change(function() {
  model.setPrice(panel.find('#price').val());
  model.save();
});

panel.find('#btn_clear').click(function() {
  model.price = 0;
  model.save();
});

model.load(function() {
  panel.find('#switch').prop('checked', model.getEnable());
  panel.find('#price').val(model.getPrice());
});
