import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupwithImage.js";
import UserInfo from "../components/UserInfo.js";
import {initialCards} from "../utils/initialCards.js";
import {validationConfig} from "../utils/validationCfg.js";
import {
  buttonEdit,
  buttonAdd,
  inputUserName,
  inputUserAbout,
  popupEditForm,
  popupAddForm
} from "../utils/constants.js";

const formEditValidator = new FormValidator(validationConfig, popupEditForm);
const formAddValidator = new FormValidator(validationConfig, popupAddForm);

formEditValidator.enableValidation();
formAddValidator.enableValidation();

const fullImagePopup = new PopupWithImage(".popup_type_full-image");

fullImagePopup.setEventListeners();

function createNewCard(item) {
  return new Card ({name: item.name, link: item.link}, "#elements", handleCardClick).generateCard();
};

const cardList = new Section ({renderer: (item) => {
  const cardElement = createNewCard(item);
  cardList.addItem(cardElement);
}}, ".elements__grid");

cardList.renderItems(initialCards);

const profileAddPopup = new PopupWithForm(".popup_type_add", (item) => {
    const newCard = createNewCard(item);
    cardList.addItem(newCard);
    profileAddPopup.close();
  }
);

profileAddPopup.setEventListeners();

function handleCardClick(name, link) {
  fullImagePopup.open(name, link);
};

const userInformation = new UserInfo({
  name: ".profile__name", 
  about: ".profile__about"
});

const profileEditPopup = new PopupWithForm(".popup_type_edit", (item) => {
  userInformation.setUserInfo(item);
});

profileEditPopup.setEventListeners();

buttonAdd.addEventListener("click", () => {
  profileAddPopup.open();
  formAddValidator.resetValidation();
  formAddValidator.disableSubmitButton();
});

buttonEdit.addEventListener("click", () => {
  profileEditPopup.open();
  formEditValidator.resetValidation();
  formEditValidator.enableSubmitButton();
  const {name, about} = userInformation.getUserInfo();
  inputUserName.value = name;
  inputUserAbout.value = about;
});