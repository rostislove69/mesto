const template = document.querySelector("#elements").content;
const elementsGrid = document.querySelector(".elements__grid");
const elementsName = document.querySelector(".elements__name");
const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupFullImage = document.querySelector(".popup_type_full-image");
const popupImage = document.querySelector(".popup__image");
const popupImageName = document.querySelector(".popup__image-name");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const inputUserName = document.querySelector(".popup__input_type_user-name");
const inputUserAbout = document.querySelector(".popup__input_type_user-about");
const inputPicturesName = document.querySelector(".popup__input_type_pictures-name");
const inputPicturesLink = document.querySelector(".popup__input_type_pictures-link");
const popupEditForm = document.querySelector(".popup__form_type_edit");
const popupAddForm = document.querySelector(".popup__form_type_add");
const submitButton = document.querySelector(".popup__button-submit");

const openPopup = (popup) =>{
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", pressEsc);
};

const closePopup = (popup) =>{
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", pressEsc);
};

const createNewCard = (name, link) =>{
  const newCard = template.querySelector(".elements__element").cloneNode(true);
  const likeButton = newCard.querySelector(".elements__like-button");
  const deleteButton = newCard.querySelector(".elements__delete-button");
  const cardImage = newCard.querySelector(".elements__image");
  const cardName = newCard.querySelector(".elements__name");
  cardName.textContent = name;
  cardImage.alt = name;
  cardImage.src = link;
  likeButton.addEventListener("click", function (evt){
    const eventTarget = evt.target;
    eventTarget.classList.toggle("elements__like-button_active");
  });
  deleteButton.addEventListener("click", function (){
    newCard.remove()
  });
  cardImage.addEventListener("click",function (evt){
    const eventTarget = evt.target;
    openPopup(popupFullImage);
    popupImage.src = eventTarget.src;
    popupImage.alt = eventTarget.alt;
    popupImageName.textContent = eventTarget.alt;
  });
  return newCard;
};

const addInitialCards = initialCards.forEach((item) => {
  elementsGrid.prepend(createNewCard(item.name,item.link));
});

const openEditPopup = () => {
  openPopup(popupEdit);
  inputUserName.value = profileName.textContent;
  inputUserAbout.value = profileAbout.textContent;
};

const editFormSubmitHandler = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputUserName.value;
  profileAbout.textContent = inputUserAbout.value;
  closePopup(popupEdit);
};

const openAddPopup = () =>{
  openPopup(popupAdd);
};

const addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  const newCardObject = {name: inputPicturesName.value, link: inputPicturesLink.value};
  elementsGrid.prepend(createNewCard(newCardObject.name,newCardObject.link));
  closePopup(popupAdd);
  popupAddForm.reset();
};

Array.from(popups).forEach(popup => {
  popup.addEventListener("click", evt => {
    if(evt.target.classList.contains("popup") || evt.target.classList.contains("popup__button-close")){
      closePopup(popup);
    }
  })
})

function pressEsc (evt){
  if(evt.key === "Escape"){
    const openedPopup = document.querySelector(".popup_opened")
    closePopup(openedPopup);
  }
}

editButton.addEventListener("click", openEditPopup);;
popupEditForm.addEventListener("submit", editFormSubmitHandler);
addButton.addEventListener("click", openAddPopup);
popupAddForm.addEventListener("submit", addFormSubmitHandler);