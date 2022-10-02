import {Card} from "./Card.js";
import {initialCards} from "./cards.js";
import {FormValidator} from "./FormValidator.js";
import {validationConfig} from "./validationCfg.js";

const elementsGrid = document.querySelector(".elements__grid");
const popups = document.querySelectorAll(".popup");
const popupEdit = document.querySelector(".popup_type_edit");
const popupAdd = document.querySelector(".popup_type_add");
const popupFullImage = document.querySelector(".popup_type_full-image");
const popupImage = document.querySelector(".popup__image");
const popupImageName = document.querySelector(".popup__image-name");
const buttonEdit = document.querySelector(".profile__edit-button");
const buttonAdd = document.querySelector(".profile__add-button");
const profileName = document.querySelector(".profile__name");
const profileAbout = document.querySelector(".profile__about");
const inputUserName = document.querySelector(".popup__input_type_user-name");
const inputUserAbout = document.querySelector(".popup__input_type_user-about");
const inputPicturesName = document.querySelector(".popup__input_type_pictures-name");
const inputPicturesLink = document.querySelector(".popup__input_type_pictures-link");
const inputErrors = document.querySelectorAll(".popup__input-error");
const inputs = document.querySelectorAll(".popup__input");
const popupEditForm = document.querySelector(".popup__form_type_edit");
const popupAddForm = document.querySelector(".popup__form_type_add");

const formEditValidator = new FormValidator(validationConfig, popupEditForm);
const formAddValidator = new FormValidator(validationConfig, popupAddForm);

formEditValidator.enableValidation();
formAddValidator.enableValidation();

function createNewCard(item) {
  return new Card (item, "#elements", openFullImage).generateCard();
}

initialCards.forEach((item) => {
  elementsGrid.prepend(createNewCard(item));
})

function openFullImage (name, link) {
  popupImage.src = link;
  popupImage.alt = name;
  popupImageName.textContent = name;
  openPopup(popupFullImage);
}

const openPopup = (popup) =>{
  popup.classList.add("popup_opened");
  document.addEventListener("keydown", pressEsc);
};

const closePopup = (popup) =>{
  popup.classList.remove("popup_opened");
  document.removeEventListener("keydown", pressEsc);
};

const openEditPopup = () => {
  openPopup(popupEdit);
  inputUserName.value = profileName.textContent;
  inputUserAbout.value = profileAbout.textContent;
  inputErrors.forEach((inputErrorEl) => {
    inputErrorEl.classList.remove("popup__input-error_active");
    inputErrorEl.textContent = "";
  })
  inputs.forEach((inputEl) => {
    inputEl.classList.remove("popup__input_type_error")
  })
  formEditValidator.enableSubmitButton();
};

const handleProfileFormSubmit = (evt) => {
  evt.preventDefault();
  profileName.textContent = inputUserName.value;
  profileAbout.textContent = inputUserAbout.value;
  closePopup(popupEdit);
};

const openAddPopup = () => {
  openPopup(popupAdd);
  popupAddForm.reset();
  inputErrors.forEach((inputErrorEl) => {
    inputErrorEl.classList.remove("popup__input-error_active");
    inputErrorEl.textContent = "";
  });
  inputs.forEach((inputEl) => {
    inputEl.classList.remove("popup__input_type_error");
  });
  formAddValidator.disableSubmitButton();
};

const handleCardFormSubmit = (evt) => {
  evt.preventDefault();
  if (inputPicturesName.value !== "" && inputPicturesLink.value !== "") {
    const newCardObject = {name: inputPicturesName.value, link: inputPicturesLink.value};
    elementsGrid.prepend(createNewCard(newCardObject));
    closePopup(popupAdd);
    popupAddForm.reset();
    formAddValidator.enableSubmitButton();
  } else {
    formAddValidator.disableSubmitButton();
  }
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
    const popupActive = document.querySelector(".popup_opened")
    closePopup(popupActive);
  }
}

buttonEdit.addEventListener("click", openEditPopup);;
popupEditForm.addEventListener("submit", handleProfileFormSubmit);
buttonAdd.addEventListener("click", openAddPopup);
popupAddForm.addEventListener("submit", handleCardFormSubmit);