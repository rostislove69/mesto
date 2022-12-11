import Popup from "./Popup.js";
export default class PopupWithForm extends Popup{
  constructor(popupSelector, handleSubmitForm){
    super(popupSelector);
    this._popup = document.querySelector(popupSelector);
    this._handleSubmitForm = handleSubmitForm;
    this._popupForm = this._popup.querySelector(".popup__form");
    this._inputList = this._popupForm.querySelectorAll(".popup__input");
    this._buttonSubmit = this._popupForm.querySelector(".popup__button-submit");
    this._buttonSubmitText = this._buttonSubmit.textContent;
  }

  _getInputValues(){
    this._formValues = {};
    this._inputList.forEach((inputElement) => {
      this._formValues[inputElement.name] = inputElement.value;
    });
    return this._formValues;
  }

  close(){
    this._popupForm.reset();
    super.close();
  }

  changeSubmitHandler(newSubmitHandler){
    this._handleSubmitForm = newSubmitHandler;
  }

  renderText(isLoading, newValue){
    if(isLoading){
      this._buttonSubmit.textContent = newValue;
    } else {
      this._buttonSubmit.textContent = this._buttonSubmitText;
    }
  }

  setEventListeners(){
    super.setEventListeners();
    this._popupForm.addEventListener("submit", (evt) => {
      evt.preventDefault();
      this._handleSubmitForm(this._getInputValues());
    })
  }
}