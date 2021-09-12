export class UserInfo {
  constructor({ nameSelector, captionSelector, avatarSelector }) {
    this._name = document.querySelector(nameSelector);
    this._caption = document.querySelector(captionSelector);
    this._avatar = document.querySelector(avatarSelector);
  }

  getUserInfo() {
    return { name: this._name.textContent,
      caption: this._caption.textContent,
      avatar: this._avatar.textContent,
      _id: this._id
    }
  }

  setUserAvatar(avatar) {
    if (avatar) {
      this._avatar.src = avatar;
    }
  }

  setUserInfo(data) {
    if (data.name && data.about && data.avatar && data._id) {
      this._name.textContent = data.name;
      this._caption.textContent = data.about;
      this._avatar.src = data.avatar;
      this._id = data._id;
    }
  }
}