let popup = document.querySelector(".popup");
let editButton = document.querySelector(".profile__edit-button");
let closeEditButton = document.querySelector(".popup__button-close");
let profileName = document.querySelector(".profile__name");
let profileAbout = document.querySelector(".profile__about");
let inputName = document.querySelector(".popup__input_type_name");
let inputAbout = document.querySelector(".popup__input_type_about");
let popupForm = document.querySelector(".popup__form");

function open () {
  let inputName = document.querySelector(".popup__input_type_name");
  let inputAbout = document.querySelector(".popup__input_type_about");
  popup.classList.add("popup_opened");
  inputName.value = profileName.textContent;
  inputAbout.value = profileAbout.textContent;
}

function close () {
  popup.classList.remove("popup_opened");
}

function formSubmitHandler (evt) {
    evt.preventDefault();
    profileName.textContent = inputName.value;
    profileAbout.textContent = inputAbout.value;
    close ();
}

editButton.addEventListener("click", open);
closeEditButton.addEventListener("click", close);
popupForm.addEventListener('submit', formSubmitHandler);