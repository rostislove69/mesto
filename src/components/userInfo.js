export default class UserInfo{
  constructor(data){
    this._name = document.querySelector(data.name);
    this._about = document.querySelector(data.about);
    this._avatar = document.querySelector(data.avatar);
  }

  getUserInfo(){
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent,
      avatar: this._avatar.src
    };
    return userInfo;
  }

  setUserInfo(data){
    this._name.textContent = data.name;
    this._about.textContent = data.about;
    this._avatar.src = data.avatar;
  }
}