export default class Card {
  constructor({name, link}, templateSelector, handleCardClick){
    this._name = name;
    this._link = link;
    this._templateSelector = templateSelector;
    this._handleCardClick = handleCardClick;
  }

  _getTemplate(){
    const cardElement = document
    .querySelector(this._templateSelector)
    .content
    .querySelector(".elements__element")
    .cloneNode(true);
    return cardElement;
  }

  _handleLikeButtonClick(){
    this._buttonLike.classList.toggle("elements__like-button_active");
  }

  _handleDeleteButtonClick(){
    this._element.remove();
    this._element = null;
  }

  _setEventListener(){
    this._buttonLike = this._element.querySelector(".elements__like-button");
    this._buttonDelete = this._element.querySelector(".elements__delete-button");
  
    this._buttonLike.addEventListener("click", () => {
      this._handleLikeButtonClick();
    });
  
    this._buttonDelete.addEventListener("click", () => {
      this._handleDeleteButtonClick();
    });
  
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
    
  }

  generateCard(){
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".elements__image");
    this._image.alt = this._name;
    this._element.querySelector(".elements__name").textContent = this._name;
    this._image.src = this._link;
    this._setEventListener();
    return this._element;
  }
}