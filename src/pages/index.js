import { addCard, likeCard, renderCards } from "../components/cards.js";
import { openModal, closeModal, openImageModal } from "../components/modals.js";
import {
  getProfileDataFromForm,
  renderUserProfile,
} from "../components/profile.js";
import { setEventListenersOnInput } from "../components/validation.js";
import {
  fetchInitialData,
  updateProfileOnServer,
  updateCardsOnServer,
  toggleLike,
  removeCard,
  changeAvatar,
} from "../components/api.js";

const template = document.getElementById("card-template");
const cardsList = document.querySelector(".places__list");
const profileEditButton = document.querySelector(".profile__edit-button");
const profileAddButton = document.querySelector(".profile__add-button");
const profileAvatar = document.querySelector(".profile__image");
const editModal = document.querySelector(".popup_type_edit");
const addNewCardModal = document.querySelector(".popup_type_new-card");
const scaleCardModal = document.querySelector(".popup_type_image");
const changeAvatarModal = document.querySelector(".popup_type_avatar");
const fromEditProfile = document.querySelector('[name="edit-profile"]');
const fromAddCard = document.querySelector('[name="new-place"]');
const formEditAvatar = document.querySelector('[name="edit-avatar"]');
const apiKey = import.meta.env.VITE_API_KEY;

let currentUserData;

// Заполнение полей редактирования профиля

function fillEditProfileModal(userData) {
  editModal.querySelector(".popup__input_type_name").value = userData.name;
  editModal.querySelector(".popup__input_type_description").value =
    userData.about;

  openModal(editModal);
}

// получаение и отрисовка данных с сервера

async function initializeAppUI(template, container) {
  const [userData, cardData] = await fetchInitialData(apiKey);
  currentUserData = userData;
  renderUserProfile(userData);
  renderCards(template, cardData, container, userData._id);
}

// делигирование собитий на карточках

cardsList.addEventListener("click", (evt) => {
  const card = evt.target.closest(".card");
  if (evt.target.classList.contains("card__delete-button")) {
    removeCard(apiKey, card.dataset.cardId).then(() => {
      card.remove();
    });
  } else if (evt.target.classList.contains("card__like-button")) {
    toggleLike(card, evt.target, apiKey);
  } else if (evt.target.classList.contains("card__image")) {
    openImageModal(card, scaleCardModal);
  }
});

// Заполнение полей редактирования профиля

profileEditButton.addEventListener("click", () =>
  fillEditProfileModal(currentUserData),
);

// Открытие модалки

profileAddButton.addEventListener("click", () => {
  openModal(addNewCardModal);
});

profileAvatar.addEventListener("click", () => {
  openModal(changeAvatarModal);
});

// закрытие модалок

document.addEventListener("click", (evt) => {
  const popup = evt.target.closest(".popup");

  if (
    evt.target.classList.contains("popup__close") ||
    evt.target.classList.contains("popup")
  ) {
    closeModal(popup);
  }
});

// Отправка новых данных пользователя

fromEditProfile.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const updateData = getProfileDataFromForm(fromEditProfile);
  try {
    const serverData = await updateProfileOnServer(apiKey, updateData);
    closeModal(editModal);
    renderUserProfile(serverData);
    currentUserData = serverData;
  } catch (err) {
    console.log(err);
  }
});

formEditAvatar.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  const avatarInput = formEditAvatar.querySelector(".popup__input_type_avatar");
  const submitButton = formEditAvatar.querySelector(".popup__button");

  submitButton.textContent = "Сохранение...";

  try {
    const serverData = await changeAvatar(apiKey, {
      avatar: avatarInput.value,
    });

    renderUserProfile(serverData);
    currentUserData = serverData;
    closeModal(changeAvatarModal);
    avatarInput.value = "";
  } catch (err) {
    console.log(err);
  }
});

// Добавление новых карточек

fromAddCard.addEventListener("submit", async (evt) => {
  evt.preventDefault();
  fromAddCard.querySelector(".popup__button").textContent = "Сохранение...";
  const newCardData = {
    name: addNewCardModal.querySelector(".popup__input_type_card-name").value,
    link: addNewCardModal.querySelector(".popup__input_type_url").value,
  };
  try {
    const serverData = await updateCardsOnServer(apiKey, newCardData);
    addCard(serverData, currentUserData._id, template, cardsList);
    closeModal(addNewCardModal);
    addNewCardModal.querySelector(".popup__input_type_card-name").value = "";
    addNewCardModal.querySelector(".popup__input_type_url").value = "";
  } catch (err) {
    console.log(err);
  } finally {
    fromAddCard.querySelector(".popup__button").textContent = "Сохранить";
  }
});

setEventListenersOnInput(formEditAvatar);
setEventListenersOnInput(fromEditProfile);
setEventListenersOnInput(fromAddCard);

initializeAppUI(template, cardsList);
