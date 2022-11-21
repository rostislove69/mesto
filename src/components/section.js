export default class Section {
  constructor({renderer}, selector){
    this._renderer = renderer;
    this._container = document.querySelector(selector);
  }

  renderItems(data){
    this._initialArray = data;
    this._initialArray.forEach(item => {
      this._renderer(item);
    });
  }

  addItem(element){
    this._container.prepend(element);
  }
}