import "./index.css";
import Card from "../components/Card.js";
import FormValidator from "../components/FormValidator.js";
import Section from "../components/Section.js";
import Popup from "../components/Popup.js";
import PopupWithForm from "../components/PopupWithForm.js";
import PopupWithImage from "../components/PopupwithImage.js";
import UserInfo from "../components/UserInfo.js";
import Api from "../components/Api.js";
import {apiCfg} from "../utils/apiCfg.js";
import {validationConfig} from "../utils/validationCfg.js";
import {
  buttonEdit,
  buttonAdd,
  buttonEditAvatar,
  inputUserName,
  inputUserAbout,
  popupEditForm,
  popupAddForm,
  popupEditAvatarForm
} from "../utils/constants.js";

let userId;

const api = new Api(apiCfg);

api.getUserInformation()
  .then((res) => {
    userInformation.setUserInfo(res);
    userId = res._id;
  })
  .catch((err) => {
    console.log(err);
  })

api.getInitialCards()
  .then((res) => {
    cardList.renderItems(res);
  })
  .catch((err) => {
    console.log(err);
  })

const formEditValidator = new FormValidator(validationConfig, popupEditForm);
const formAddValidator = new FormValidator(validationConfig, popupAddForm);
const formEditAvatarValidator = new FormValidator(validationConfig, popupEditAvatarForm);

formEditValidator.enableValidation();
formAddValidator.enableValidation();
formEditAvatarValidator.enableValidation();

const fullImagePopup = new PopupWithImage(".popup_type_full-image");

fullImagePopup.setEventListeners();

const createNewCard = (data) => {
  const card = new Card ({
    name: data.name, 
    link: data.link, 
    likes: data.likes, 
    id: data._id, 
    ownerId: data.owner._id
  }, 
  userId,
  "#elements", 
  handleCardClick,
  (id) => {
    deletePopup.open();
    deletePopup.changeSubmitHandler(() => {
      api.deleteCard(id)
        .then((res) => {
          deletePopup.close();
          deleteCard(card);
        })
    })
  },
  (id) => {
    if (card.querySelector(".elements__like-button").classList.contains("elements__like-button_active") === true) {
      api.deleteLike(id)
        .then((res) => {
          deleteLike(card, res.likes);
        })
    } else {
      api.addLike(id)
        .then((res) => {
          addLike(card, res.likes);
      })
    }
    }).generateCard();
  return card;
};

function handleCardClick(name, link) {
  fullImagePopup.open(name, link);
};

function deleteCard(card){
  card.remove();
  card = null;
};

function addLike(card, likes){
  card.querySelector(".elements__like-button").classList.add("elements__like-button_active");
  card.querySelector(".elements__like-counter").textContent = likes.length;
};

function deleteLike(card, likes){
  card.querySelector(".elements__like-button").classList.remove("elements__like-button_active");
  card.querySelector(".elements__like-counter").textContent = likes.length;
};

const cardList = new Section ({renderer: (item) => {
  const cardElement = createNewCard(item);
  cardList.addItem(cardElement);
}}, ".elements__grid");

const userInformation = new UserInfo({
  name: ".profile__name", 
  about: ".profile__about",
  avatar: ".profile__avatar"
});

const profileEditPopup = new PopupWithForm(".popup_type_edit", (data) => {
  profileEditPopup.renderText(true, "Сохранение...");
  api.updateUserInfo(data)
    .then((res) => {
      userInformation.setUserInfo(res);
    })
    .then(() => {
      profileEditPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileEditPopup.renderText(false);
    })
});

const profileAddPopup = new PopupWithForm(".popup_type_add", (data) => {
  profileAddPopup.renderText(true, "Создание...");
  api.addNewCard(data)
    .then((res) => {
      const newCard = createNewCard(res);
      cardList.addItem(newCard);
    })
    .then(() => {
      profileAddPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      profileAddPopup.renderText(false);
    })
  }
);

const deletePopup = new PopupWithForm(".popup_type_delete-confirm");

const editAvatarPopup = new PopupWithForm(".popup_type_edit-avatar", (data) => {
  editAvatarPopup.renderText(true, "Сохранение...");
  api.updateAvatar(data)
    .then((res) => {
      userInformation.setUserInfo(res);
    })
    .then(() => {
      editAvatarPopup.close();
    })
    .catch((err) => {
      console.log(err);
    })
    .finally(() => {
      editAvatarPopup.renderText(false);
    })
})

profileEditPopup.setEventListeners();
profileAddPopup.setEventListeners();
deletePopup.setEventListeners();
editAvatarPopup.setEventListeners();

buttonAdd.addEventListener("click", () => {
  profileAddPopup.open();
  formAddValidator.resetValidation();
  formAddValidator.disableSubmitButton();
});

buttonEdit.addEventListener("click", () => {
  formEditValidator.resetValidation();
  formEditValidator.enableSubmitButton();
  const {name, about} = userInformation.getUserInfo();
  inputUserName.value = name;
  inputUserAbout.value = about;
  profileEditPopup.open();
});

buttonEditAvatar.addEventListener("click", () => {
  formEditAvatarValidator.resetValidation();
  formEditAvatarValidator.disableSubmitButton();
  editAvatarPopup.open();
})