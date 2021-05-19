function showInputError(errorElement, inputErrorClass, errorClass) {
  inputElement.classList.add(inputErrorClass);
  errorElement.classList.add(errorClass);
  errorElement.textContent = inputElement.validity;//Возможно неверное значаение видео 02:12
}

function hideInputError(errorElement, inputErrorClass, errorClass) {
  inputElement.classList.remove(inputErrorClass);
  errorElement.classList.remove(errorClass);
  errorElement.textContent = '';
}

function checkInputValidity(inputElement, { inputErrorClass, errorClass }) {
  const errorElement = formElement.querySelector(`.${inputElement.id}-error`);

  if (inputElement.validity.valid) {
    hideInputError(errorElement, inputErrorClass, errorClass)
  } else {
    showInputError(errorElement, inputErrorClass, errorClass)
  }
}

function inputElementValidity (inputElements) {
  inputElements.every(inputElement => inputElement.validity.valid)
}

function toggleButtonState(buttonElement, disabledClass, inputElements) {//вызвать эту функции при открытии попапов, чтобы кнопка свое состояние принимала сразу 00:02:03 видео Вовы
  if (inputElementValidity (inputElements)) {
    buttonElement.classList.remove(disabledClass);
    buttonElement.disabled = false;
  } else {
    buttonElement.classList.add(disabledClass);
    buttonElement.disabled = true;
  }
}

function setEventListeners(formElement, { submitButtonSelector, inputSelector, inactiveButtonClass, ...restConfig }) {
  const submitButtonElement = formElement.querySelector(submitButtonSelector);
  const inputElements = Array.from(formElement.querySelectorAll(inputSelector));

  inputElements.forEach(inputElement => {
    inputElement.addEventListener('input', (evt) => {
      checkInputValidity(inputElement, restConfig)
      toggleButtonState(submitButtonElement, inactiveButtonClass, inputElements)
    })
  })
}

function enableValidationForm({ formSelector, ...restConfig }) {
  Array.from(document.querySelectorAll('formSelector')).forEach(form => {
    form.addEventListener('submit', function (evt) {
      evt.preventDefault();
      setEventListeners(form, restConfig)
    });
  });
};

enableValidation({
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__botton_type_no-validate',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
});