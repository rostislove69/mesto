import "./index.css";
import Card from "../components/card.js"
import FormValidator from "../components/formValidator.js";
import Section from "../components/section.js";
import PopupWithForm from "../components/popupWithForm.js";
import PopupWithImage from "../components/popupwithimage.js";
import UserInfo from "../components/userInfo.js";
import {initialCards} from "../utils/initialCards.js";
import {validationConfig} from "../utils/validationCfg.js";
import {
  buttonEdit,
  buttonAdd,
  inputUserName,
  inputUserAbout,
  popupEditForm,
  popupAddForm
} from "../utils/constants.js"

const formEditValidator = new FormValidator(validationConfig, popupEditForm);
const formAddValidator = new FormValidator(validationConfig, popupAddForm);

formEditValidator.enableValidation();
formAddValidator.enableValidation();

const fullImagePopup = new PopupWithImage(".popup_type_full-image");

fullImagePopup.setEventListeners();

function createNewCard(item) {
  return new Card ({name: item.name, link: item.link}, "#elements", handleCardClick).generateCard();
}

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
  inputUserName.value = userInformation.getUserInfo().name;
  inputUserAbout.value = userInformation.getUserInfo().about;
})