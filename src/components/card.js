export default class Card {
  constructor({name, link, likes, id, ownerId},
    userId,
    templateSelector,
    handleCardClick,
    handleDeleteClick,
    handleLikeClick
    ){
    this._name = name;
    this._link = link;
    this._likes = likes;
    this._id = id;
    this._userId = userId;
    this._ownerId = ownerId;

    this._templateSelector = templateSelector;

    this._handleCardClick = handleCardClick;
    this._handleDeleteClick = handleDeleteClick;
    this._handleLikeClick = handleLikeClick;
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

  _setLikes(){
    this._likeCountEl.textContent = this._likes.length;
    if(this.isLiked()){
      this._buttonLike.classList.add("elements__like-button_active");
    } else {
      this._buttonLike.classList.remove("elements__like-button_active");
    }
  }

  isLiked(){
    const userHasLikedCard = this._likes.find(user => user._id === this._userId);
    return userHasLikedCard
  }

  checkLikeButton(card){
    card = this._element;
    const buttonLikeActive = this._buttonLike.classList.contains("elements__like-button_active");
    return buttonLikeActive;
  }

  addLike(card, likes){
    card = this._element;
    this._buttonLike.classList.add("elements__like-button_active");
    this._likeCountEl.textContent = likes.length;
  };
  
  deleteLike(card, likes){
    card = this._element;
    this._buttonLike.classList.remove("elements__like-button_active");
    this._likeCountEl.textContent = likes.length;
  };

  deleteCard(card){
    card = this._element;
    card.remove();
    card = null;
  }

  _setEventListener(){
    this._buttonLike.addEventListener("click", () => {
      this._handleLikeClick(this._id);
    });
  
    this._buttonDelete.addEventListener("click", () => {
      this._handleDeleteClick(this._id);
    });
  
    this._image.addEventListener("click", () => {
      this._handleCardClick(this._name, this._link);
    });
  }

  generateCard(){
    this._element = this._getTemplate();
    this._image = this._element.querySelector(".elements__image");
    this._buttonLike = this._element.querySelector(".elements__like-button");
    this._buttonDelete = this._element.querySelector(".elements__delete-button");
    this._likeCountEl = this._element.querySelector(".elements__like-counter");
    this._image.alt = this._name;
    this._element.querySelector(".elements__name").textContent = this._name;
    this._image.src = this._link;
    this._setEventListener();
    this._setLikes();
    if(this._ownerId !== this._userId){
      this._buttonDelete.style.display = "none";
    }
    return this._element;
  }
}