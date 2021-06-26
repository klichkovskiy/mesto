export class Section {
  constructor({ items, renderer }, containerSelector) {
    this._items = items;
    this._renderer = renderer;
    this._containerSelector = containerSelector;

    this._element = document.querySelector(containerSelector);
  }
  
  rendererAll() {
    this._items.forEach(item => {
      this.addItem(item)
    });
  }

  addItem(element) { 
    this._element.prepend(this._renderer(element));
  }
}