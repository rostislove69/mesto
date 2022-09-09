const validationConfig = {
  formSelector: ".popup__form",
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button-submit",
  inactiveButtonClass: "popup__button-submit_inactive",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__input-error",
  errorClassActive: "popup__input-error_active",
};

const hasInvalidInput = (inputList) => {
  return inputList.some((inputElement) => {
    return !inputElement.validity.valid;
  });
};

const toggleButtonState = (inputList, buttonElement, cfg) => {
  if (hasInvalidInput(inputList)){
    buttonElement.classList.add(cfg.inactiveButtonClass);
  } else {
    buttonElement.classList.remove(cfg.inactiveButtonClass);
  }
};

const showInputError = (formElement, inputElement, errorMessage, cfg) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.add(cfg.inputErrorClass);
  errorElement.textContent = errorMessage;
  errorElement.classList.add(cfg.errorClassActive);
};

const hideInputError = (formElement, inputElement, cfg) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);
  inputElement.classList.remove(cfg.inputErrorClass);
  errorElement.classList.remove(cfg.errorClassActive);
  errorElement.textContent = "";
};

const checkInputValidity = (formElement, inputElement, cfg) => {
  if (!inputElement.validity.valid) {
    showInputError(formElement, inputElement, inputElement.validationMessage, cfg);
  } else {
    hideInputError(formElement, inputElement, cfg);
  }
};

const setEventListeners = (formElement, cfg) => {
  const inputList = Array.from(formElement.querySelectorAll(cfg.inputSelector));
  const buttonElement = formElement.querySelector(cfg.submitButtonSelector);
  toggleButtonState(inputList, buttonElement, cfg);
  inputList.forEach((inputElement) => {
    inputElement.addEventListener("input", function () {
      checkInputValidity(formElement, inputElement, cfg);
      toggleButtonState(inputList, buttonElement, cfg);
    });
  });
};

const enableValidation = (cfg) => {
  const formList = Array.from(document.querySelectorAll(cfg.formSelector));
  formList.forEach((formElement) => {
    formElement.addEventListener("submit", (evt) => {
      evt.preventDefault();
    });
    setEventListeners(formElement, cfg);
  });
}

enableValidation(validationConfig);