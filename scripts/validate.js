
const hideInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

const showInputError = (formElement, inputElement, { inputErrorClass, errorClass }) => {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`)
  inputElement.classList.add(inputErrorClass);
  errorElement.textContent = inputElement.validationMessage;
  errorElement.classList.add(errorClass);
}

const checkInputValidity = (formElement, inputElement, { ...restConfig}) => {
  if (inputElement.validity.valid) {
    hideInputError(formElement, inputElement, restConfig);
  } else {
    showInputError(formElement, inputElement, restConfig);
  };
}

const hazInvalidInput = (inputList) => {
  return inputList.some(inputElement => !inputElement.validity.valid)
}

const toggleButtonState = (buttonElement, inputList, {inactiveButtonClass}) => { //вызвать эту функции при открытии попапов, чтобы кнопка свое состояние принимала сразу 00:02:03 видео Вовы
  if (hazInvalidInput(inputList)) {
    buttonElement.classList.add(inactiveButtonClass);
    buttonElement.disabled = true;
  } else {
    buttonElement.classList.remove(inactiveButtonClass);
    buttonElement.disabled = false;
  }

}

const setEventListeners = (formElement, { inputSelector, submitButtonSelector, ...restConfig}) => {
  formElement.addEventListener('submit', (evt) => {
    evt.preventDefault();
  });

  const inputList = Array.from(formElement.querySelectorAll(inputSelector));

  const buttonElement = formElement.querySelector(submitButtonSelector)

  inputList.forEach((inputElement) => {
    inputElement.addEventListener('input', () => {
      checkInputValidity(formElement, inputElement, restConfig);
      toggleButtonState(buttonElement, inputList, restConfig);
    })
  })
  toggleButtonState(buttonElement, inputList, restConfig);
}

const enableValidation = ( {formSelector, ...restConfig}) => {
  const formList = Array.from(document.querySelectorAll(formSelector));
  formList.forEach(formElement => {
    setEventListeners(formElement, restConfig);
  })
}


//  formSelector: '.form',
//  inputSelector: '.form__input',
//  submitButtonSelector: '.form__button',
//  inactiveButtonClass: 'form__botton_type_no-validate',
//  inputErrorClass: 'form__input_type_error',
//  errorClass: 'form__input-error_active'
