const editButton = document.querySelector('.profile__edit-button');
const addButton = document.querySelector('.profile__add-button');
const editButtonAvatar = document.querySelector('.profile__avatar-edit');

const overlayDeleteCard = document.querySelector('#overlay-delete-card');


const formEditProfile = document.forms['form-edit-profile'];
const fieldNameEditProfile = formEditProfile.elements['name-profile'];
const fieldCaptionEditProfile = formEditProfile.elements['caption-profile'];

const avatarImg = document.querySelector('.profile__img');

const cardSelector = '#new-card';

const config = {
  formSelector: '.form',
  inputSelector: '.form__input',
  submitButtonSelector: '.form__button',
  inactiveButtonClass: 'form__botton_type_no-validate',
  inputErrorClass: 'form__input_type_error',
  errorClass: 'form__input-error_active'
}

const option = {
  baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-27',
  //baseUrl: 'https://mesto.nomoreparties.co/v1/cohort-25',//старый
  headers: {
    authorization: '1d881064-beb8-48f1-8794-0734b420344c',
    //authorization: '9252beac-87a5-4b6e-9188-e311a20289a2',//старый
    'Content-Type': 'application/json'
  }
}

export {
  editButton, addButton, editButtonAvatar, overlayDeleteCard, fieldNameEditProfile,
  fieldCaptionEditProfile, avatarImg, cardSelector, config, option
}