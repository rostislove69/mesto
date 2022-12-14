export default class FormValidator {

  constructor(cfg, formEl){
    this._cfg = cfg;
    this._formEl = formEl;
    this._buttonEl = this._formEl.querySelector(this._cfg.submitButtonSelector);
    this._inputList = Array.from(this._formEl.querySelectorAll(this._cfg.inputSelector));
  }

  disableSubmitButton(){
    this._buttonEl.classList.add(this._cfg.inactiveButtonClass);
    this._buttonEl.setAttribute("disabled", true);
  }

  enableSubmitButton(){
    this._buttonEl.classList.remove(this._cfg.inactiveButtonClass);
    this._buttonEl.removeAttribute("disabled");
  }

  _hasInvalidInput () {
    return this._inputList.some((inputElement) => {
      return !inputElement.validity.valid;
    });
  }

  _toggleButtonState(){
    if (this._hasInvalidInput()){
      this.disableSubmitButton ();
    } else {
      this.enableSubmitButton ();
    }
  }

  _showInputError(inputElement){
    const errorElement = this._formEl.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.add(this._cfg.inputErrorClass);
    errorElement.textContent = inputElement.validationMessage;
    errorElement.classList.add(this._cfg.errorClassActive);
  }

  _hideInputError(inputElement){
    const errorElement = this._formEl.querySelector(`.${inputElement.id}-error`);
    inputElement.classList.remove(this._cfg.inputErrorClass);
    errorElement.classList.remove(this._cfg.errorClassActive);
    errorElement.textContent = "";
  }

  resetValidation(){ 
    this._inputErrorList = Array.from(this._formEl.querySelectorAll(this._cfg.errorClass));
    this._inputErrorList.forEach(inputErrorEl => { 
       inputErrorEl.classList.remove(this._cfg.errorClassActive); 
       inputErrorEl.textContent = ""; 
     });
    this._inputList.forEach(inputEl => { 
       inputEl.classList.remove(this._cfg.inputErrorClass) ;
     });
   }

  _checkInputValidity(inputElement){
    if (!inputElement.validity.valid) {
      this._showInputError(inputElement);
    } else {
      this._hideInputError(inputElement);
    }
  }

  _setEventListeners() {
    this._toggleButtonState();
    this._inputList.forEach((inputElement) => {
      inputElement.addEventListener("input", () => {
        this._checkInputValidity(inputElement);
        this._toggleButtonState();
      });
    });
  }

  enableValidation(){
    this._setEventListeners();
  }
}