export class Card {

  constructor(data, templateSelector, openFullImage){
    this._name = data.name;
    this._link = data.link;
    this._templateSelector = templateSelector;
    this._openFullImage = openFullImage;
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
  }

  _handleOpenImage(){
    this._openFullImage(this._name, this._link);
  }

  _setEventListener(){
    this._buttonLike = this._element.querySelector(".elements__like-button");
    this._buttonDelete = this._element.querySelector(".elements__delete-button");
    this._Image = this._element.querySelector(".elements__image");
  
    this._buttonLike.addEventListener("click", () => {
      this._handleLikeButtonClick();
    });
  
    this._buttonDelete.addEventListener("click", () => {
      this._handleDeleteButtonClick();
    });
  
    this._Image.addEventListener("click", () => {
      this._handleOpenImage();
    });
    
  }

  generateCard(){
    this._element = this._getTemplate();
    this._element.querySelector(".elements__image").alt = this._name;
    this._element.querySelector(".elements__name").textContent = this._name;
    this._element.querySelector(".elements__image").src = this._link;
    this._setEventListener();
    return this._element;
  }
}