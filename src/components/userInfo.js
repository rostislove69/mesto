export default class UserInfo{
  constructor(data){
    this._name = document.querySelector(data.name);
    this._about = document.querySelector(data.about);
  }

  getUserInfo(){
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent
    };
    return userInfo;
  }

  setUserInfo(data){
    this._name.textContent = data.name;
    this._about.textContent = data.about;
  }
}