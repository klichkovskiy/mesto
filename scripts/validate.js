const formElement = document.querySelector('.form');
const formInput = formElement.querySelector('.form__input');
const formError = formElement.querySelector(`${formInput}-error`);

const formList = Array.from(document.querySelectorAll('.form'));
const inputList = Array.from(formElement.querySelectorAll('.form__input'));
const buttonList = Array.from(formElement.querySelectorAll('.form__button'));


//добовление класса отображающего ошибку
function showInputError (formElement, inputElement, errorMessage) {
  const errorElement = formElement.querySelector(`${inputElement}-error`);
  formElement.classList.add('form__input_type_error');
  inputElement.classList.add('form__input-error_active');
  errorElement.textContent = errorMessage;
};

//удаление класса отображающего отображение ошибки
function hideInputError (element) {
  element.classList.remove('form__input_type_error');
  formError.classList.remove('form__input-error_active');
  formError.textContent = '';
};

function isValid (formElement, inputElement) {
  if(!inputElement.validity.valid){
    showInputError(formElement, inputElement, inputElement.validationMessage);
  } else {
    hideInputError(formElement, inputElement);
  }
};

formElement.addEventListener('submit', (evt) {
  evt.preventDefault();
});

formInput.addEventListener('input', isValid);