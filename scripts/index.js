let editButton = document.querySelector('.profile__edit-button');
let overlayForm = document.querySelector('.overlay__form');
let overlayOpen = document.querySelector('.overlay');
let overlayClose = document.querySelector('.overlay__close');
let nameInput = document.querySelector('.overlay__item_name');
let captionInput = document.querySelector('.overlay__item_caption');
let profileName = document.querySelector('.profile__name');
let profileCaption = document.querySelector('.profile__caption');

function overlayClickOpen(){
  nameInput.value = profileName.textContent;
  captionInput.value = profileCaption.textContent;
  overlayOpen.classList.toggle('overlay_opened');
};
editButton.addEventListener('click', overlayClickOpen);

function overlayClickClose(){
  overlayOpen.classList.toggle('overlay_opened');
};
overlayClose.addEventListener('click', overlayClickClose);

function formSubmitHandler (evt) {
  evt.preventDefault();
  profileName.textContent = nameInput.value;
  profileCaption.textContent = captionInput.value;
  overlayClickClose()
}
overlayForm.addEventListener('submit', formSubmitHandler); 