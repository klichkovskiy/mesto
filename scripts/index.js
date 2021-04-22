let editButton = document.querySelector('.profile__edit-button');
let overlayForm = document.querySelector('.overlay');
let overlayClose = document.querySelector('.overlay__close');
let nameInput = document.querySelector('.overlay__name');
let captionInput = document.querySelector('.overlay__caption');
let profileName = document.querySelector('.profile__name');
let profileCaption = document.querySelector('.profile__caption');

function overlayClick(){
  overlayForm.classList.toggle('overlay__opened');
};
editButton.addEventListener('click', overlayClick);
overlayClose.addEventListener('click', overlayClick);

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCaption.textContent = captionInput.value;
  overlayClick()
}
overlayForm.addEventListener('submit', formSubmitHandler); 