import Api from "../Fetch/api.js";
import Card from "../components/Cards.js";
import { renderUserProfile } from "../components/UserInfo.js";
import Modal from "../components/modals.js";
import FormValidation from "../components/FormValidation.js";

const apiKey = import.meta.env.VITE_API_KEY;
const BASE_URL = "https://mesto.nomoreparties.co/v1/pwff-cohort-1";

const validationConfig = {
  inputSelector: ".popup__input",
  submitButtonSelector: ".popup__button",
  inactiveButtonClass: "popup__button_disabled",
  inputErrorClass: "popup__input_type_error",
  errorClass: "popup__error_active",
};

const api = new Api({
  baseUrl: BASE_URL,
  headers: { authorization: apiKey },
});

const cardsList = document.querySelector(".places__list");
const editProfileButton = document.querySelector(".profile__edit-button");
const addCardButton = document.querySelector(".profile__add-button");
const avatarChange = document.querySelector(".profile__image");

const editModal = new Modal(".popup_type_edit");
const addModal = new Modal(".popup_type_new-card");
const imageModal = new Modal(".popup_type_image");
const avatarModal = new Modal(".popup_type_avatar");

const editForm = document.querySelector('[name="edit-profile"]');
const addForm = document.querySelector('[name="new-place"]');
const avatarForm = document.querySelector('[name="edit-avatar"]');

const editValidator = new FormValidation(validationConfig, editForm);
const addValidator = new FormValidation(validationConfig, addForm);
const avatarValidator = new FormValidation(validationConfig, avatarForm);

const [user, cards] = await Promise.all([
  api.getUserInfo(),
  api.getInitialCards(),
]);

let currentUserData = user;

function handleCardClick({ name, link }) {
  imageModal.setImage({ name, link });
  imageModal.open();
}

function createCard(data) {
  const card = new Card(data, currentUserData._id, handleCardClick, api);
  return card.generateCard();
}

function fillEditForm(data) {
  const nameInput = editForm.querySelector('[name="name"]');
  const aboutInput = editForm.querySelector('[name="description"]');

  nameInput.value = data.name;
  aboutInput.value = data.about;
}

function openEditModal() {
  fillEditForm(currentUserData);
  editValidator.resetValidation();
  editModal.open();
}

function openAddModal() {
  addForm.reset();
  addValidator.resetValidation();
  addModal.open();
}

function openAvatarModal() {
  avatarForm.reset();
  avatarValidator.resetValidation();
  avatarModal.open();
}

function handleEditSubmit(evt) {
  evt.preventDefault();

  const name = editForm.querySelector('[name="name"]').value;
  const about = editForm.querySelector('[name="description"]').value;

  api
    .updateUserProfile({ name, about })
    .then((data) => {
      currentUserData = data;
      renderUserProfile(data);
      editModal.close();
    })
    .catch(console.error);
}

function handleAddSubmit(evt) {
  evt.preventDefault();

  const name = addForm.querySelector('[name="place-name"]').value;
  const link = addForm.querySelector('[name="link"]').value;

  api
    .addCard({ name, link })
    .then((cardData) => {
      cardsList.prepend(createCard(cardData));
      addModal.close();
      addForm.reset();
      addValidator.resetValidation();
    })
    .catch(console.error);
}

function handleAvatarSubmit(evt) {
  evt.preventDefault();

  const avatar = avatarForm.querySelector(".popup__input_type_avatar").value;

  api.updateAvatar({ avatar }).then((data) => {
    currentUserData = data;
    renderUserProfile(data);
    avatarModal.close();
  });
}

editValidator.enableValidation();
addValidator.enableValidation();
avatarValidator.enableValidation();

editProfileButton.addEventListener("click", openEditModal);
addCardButton.addEventListener("click", openAddModal);
avatarChange.addEventListener("click", openAvatarModal);

editForm.addEventListener("submit", handleEditSubmit);
addForm.addEventListener("submit", handleAddSubmit);
avatarForm.addEventListener("submit", handleAvatarSubmit);

editModal.setEventListeners();
addModal.setEventListeners();
imageModal.setEventListeners();
avatarModal.setEventListeners();

renderUserProfile(currentUserData);
cardsList.append(...cards.map(createCard));
