function main() {
  let model = new RentModel();
  let cbEnable = $('#cb_rent591');

  cbEnable.change(function() {
    model.setEnable(cbEnable.is(':checked'));
    model.save();
  });

  model.load(function() {
    cbEnable.prop('checked', model.getEnable());
  });
}

main();