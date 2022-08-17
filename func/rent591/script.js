const model = new RentModel();

class ItemPageProcess {
  constructor() {
    const id = document.URL.split('/')[4];
    this.item = model.getItem(id);

    const divTitle = document.querySelector('.house-title');
    this.nodeStatus = document.createElement('span');
    this.nodeStatus.className = `item-status item-status-${this.item.status}`;
    this.nodeStatus.addEventListener("click", () => { this.updateStatus(this.item); })
    divTitle.append(this.nodeStatus);
  }

  updateStatus() {
    this.item.propStatus();
    this.nodeStatus.className = `item-status item-status-${this.item.status}`;
    model.save();
  }

}

class MapPageProcess {
  constructor() {
    setInterval(this.update, 5000);
  }

  update() {
    model.load(() => {
      const divItems = document.querySelectorAll('.property_list li');
      divItems.forEach(divItem => {
        const link = divItem.querySelector('.title a').href;
        const id = link.match(/-([0-9]*)\./)[1];
        const item = model.getItem(id);
        divItem.className = `list-item-${item.status}`;
      });
    });
  }
}

function main() {
  if (document.URL.startsWith('https://rent.591.com.tw/home/')) {
    new ItemPageProcess();
  } else if (document.URL.startsWith('https://rent.591.com.tw/map-index.html')) {
    new MapPageProcess();
  }
}

model.load(() => {
  if (model.getEnable()) {
    setTimeout(main, 1000);
  }
});