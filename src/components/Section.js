export class Section {
  constructor({ renderer }, containerSelector) {
    this._renderer = renderer;
    this._element = document.querySelector(containerSelector);
  }
  
  rendererAll(elements) {
    elements.forEach(item => {
      this.addItemAppend(item)
    });
  }

  addItemAppend(element) { 
    this._element.append(this._renderer(element));
  }

  addItemPrepend(element) { 
    this._element.prepend(this._renderer(element));
  }
}