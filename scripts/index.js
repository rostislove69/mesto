const body = document.querySelector(".page");
const template = document.querySelector("#elements").content;
const elementsGrid = document.querySelector(".elements__grid");
const elementsName = document.querySelector(".elements__name");
const popup = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupFullImage = document.querySelector(".popup_type_full-image");
const popupImage = document.querySelector(".popup__image");
const popupImageName = document.querySelector(".popup__image-name");
const editButton = document.querySelector(".profile__edit-button");
const addButton = document.querySelector(".profile__add-button");
const closeEditButton = document.querySelector(".popup__button-close_type_edit");
const closeAddButton = document.querySelector(".popup__button-close_type_add");
const closeFullImagePopup = document.querySelector(".popup__button-close_type_full-image");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const inputUserName = document.querySelector(".popup__input_type_user-name");
const inputUserAbout = document.querySelector(".popup__input_type_user-about");
const inputPicturesName = document.querySelector(".popup__input_type_pictures-name");
const inputPicturesLink = document.querySelector(".popup__input_type_pictures-link");
const popupEditForm = document.querySelector(".popup__form_type_edit");
const popupAddForm = document.querySelector(".popup__form_type_add");
const submitButton = document.querySelector(".popup__button-submit");

const initialCards = [
  {
    name: 'Архыз',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/arkhyz.jpg'
  },
  {
    name: 'Челябинская область',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/chelyabinsk-oblast.jpg'
  },
  {
    name: 'Иваново',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/ivanovo.jpg'
  },
  {
    name: 'Камчатка',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kamchatka.jpg'
  },
  {
    name: 'Холмогорский район',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/kholmogorsky-rayon.jpg'
  },
  {
    name: 'Байкал',
    link: 'https://pictures.s3.yandex.net/frontend-developer/cards-compressed/baikal.jpg'
  },
];

const newCard = (name, link) =>{
  const templateLi = template.querySelector(".elements__element").cloneNode(true);
  const likeButton = templateLi.querySelector(".elements__like-button");
  const deleteButton = templateLi.querySelector(".elements__delete-button");
  const image = templateLi.querySelector(".elements__image");
  templateLi.querySelector(".elements__name").textContent = name;
  templateLi.querySelector(".elements__image").alt = name;
  templateLi.querySelector(".elements__image").src = link;
  likeButton.addEventListener("click", function (evt){
    const eventTarget = evt.target;
    eventTarget.classList.toggle("elements__like-button_active");
  });
  deleteButton.addEventListener("click", function (evt){
    const eventTarget = evt.target;
    const itemElement = eventTarget.closest(".elements__element");
    itemElement.remove()
  });
  image.addEventListener("click",function (evt){
    const eventTarget = evt.target;
    popupFullImage.classList.add("popup_opened");
    popupImage.src = eventTarget.src;
    popupImage.alt = eventTarget.alt;
    popupImageName.textContent = eventTarget.alt;
    if(popupFullImage.classList.contains("popup_opened")){
      body.setAttribute("style","overflow: hidden; height: 100vh");
      }
  });
  return templateLi;
}

const addCards = initialCards.forEach((item) => {
  elementsGrid.prepend(newCard(item.name,item.link));
});

const openEdit = () => {
  popupEdit.classList.add("popup_opened");
  inputUserName.value = profileName.textContent;
  inputUserAbout.value = profileAbout.textContent;
}

const closeEdit = () => {
  popupEdit.classList.remove("popup_opened");
}

const editFormSubmitHandler = (evt) => {
    evt.preventDefault();
    profileName.textContent = inputUserName.value;
    profileAbout.textContent = inputUserAbout.value;
    closeEdit ();
}

const openAdd = () =>{
  popupAdd.classList.add("popup_opened");
}

const closeAdd = () =>{
  popupAdd.classList.remove("popup_opened");
}

const addFormSubmitHandler = (evt) => {
  evt.preventDefault();
  const newCardElement = {
    name: inputPicturesName.value,
    link: inputPicturesLink.value
  };
  if (inputPicturesName.value !== "" && inputPicturesLink.value !== "") {
    elementsGrid.prepend(newCard(newCardElement.name,newCardElement.link));
  } else {
    submitButton.setAttribute("disable", "true");
  };
  closeAdd ();
  inputPicturesLink.value = "";
  inputPicturesName.value = "";
}

const closeFullImage = () => {
  popupFullImage.classList.remove("popup_opened");
  body.removeAttribute("style","true");
};

editButton.addEventListener("click", openEdit);
closeEditButton.addEventListener("click", closeEdit);
popupEditForm.addEventListener("submit", editFormSubmitHandler);
addButton.addEventListener("click", openAdd);
closeAddButton.addEventListener("click", closeAdd);
popupAddForm.addEventListener("submit", addFormSubmitHandler);
closeFullImagePopup.addEventListener("click", closeFullImage);