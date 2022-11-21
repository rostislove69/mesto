export default class UserInfo{
  constructor(data){
    this._name = document.querySelector(data.name);
    this._about = document.querySelector(data.about);
    this._inputName = document.querySelector(".popup__input_type_user-name");
    this._inputAbout = document.querySelector(".popup__input_type_user-about");
  }

  getUserInfo(){
    const userInfo = {
      name: this._name.textContent,
      about: this._about.textContent
    };
    return userInfo;
  }

  setUserInfo(){
    this._name.textContent = this._inputName.value;
    this._about.textContent = this._inputAbout.value;
  }
}