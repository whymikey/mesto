import { initialCards } from "../components/initialCards.js";
import {
  renderCards,
  removeCard,
  addCard,
  likeCard,
} from "../components/cards.js";
import { openModal, closeModal, openImageModal } from "../components/modals.js";
import { getProfileData, updateProfileData } from "../components/profile.js";
import { setEventListenersOnInput } from "../components/validation.js";

const template = document.getElementById("card-template");
const cardsList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const editModal = document.querySelector(".popup_type_edit");
const addNewCardModal = document.querySelector(".popup_type_new-card");
const scaleCardModal = document.querySelector(".popup_type_image");
const fromEditProfile = document.querySelector('[name="edit-profile"]');
const fromAddCard = document.querySelector('[name="new-place"]');

cardsList.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__delete-button")) {
    const currentCard = evt.target.closest(".card");
    removeCard(currentCard);
  }
});

cardsList.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__like-button")) {
    const currentCard = evt.target.closest(".card");
    likeCard(currentCard);
  }
});

cardsList.addEventListener("click", (evt) => {
  if (evt.target.classList.contains("card__image")) {
    const currentCard = evt.target.closest(".card");
    openImageModal(currentCard, scaleCardModal);
  }
});

profileEditButton.addEventListener("click", () => {
  const profile = getProfileData();
  editModal.querySelector(".popup__input_type_name").value = profile.name;
  editModal.querySelector(".popup__input_type_description").value =
    profile.description;

  openModal(editModal);
});

profileAddButton.addEventListener("click", () => {
  openModal(addNewCardModal);
});

document.addEventListener("click", (evt) => {
  const popup = evt.target.closest(".popup");

  if (evt.target.classList.contains("popup__close")) {
    closeModal(popup);
  }

  if (evt.target.classList.contains("popup")) {
    closeModal(popup);
  }
});

fromEditProfile.addEventListener("submit", (evt) => {
  evt.preventDefault();
  updateProfileData(editModal);
  closeModal(editModal);
});

fromAddCard.addEventListener("submit", (evt) => {
  evt.preventDefault();
  addCard(template, addNewCardModal, cardsList);
  closeModal(addNewCardModal);
});

setEventListenersOnInput(fromEditProfile)
setEventListenersOnInput(fromAddCard)
renderCards(template, initialCards, cardsList);
