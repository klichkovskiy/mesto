export class UserInfo {
  constructor({ nameSelector, captionSelector }) {
    this._name = document.querySelector(nameSelector);
    this._caption = document.querySelector(captionSelector);
  }

  getUserInfo() {
    return { name: this._name.textContent, caption: this._caption.textContent }
  }

  setUserInfo(data) {
    this._name.textContent = data.name;
    this._caption.textContent = data.caption;
  }
}