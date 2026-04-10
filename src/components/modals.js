import { hideInputError } from "./validation";

function resetInputErrors(modal) {
  const form = modal.querySelector(".popup__form");
  if (form) {
    const inputs = form.querySelectorAll(".popup__input");
    inputs.forEach((input) => {
      hideInputError(form, input);
    });
  }
}

function openModal(modal) {
  modal.classList.add("popup_is-opened");
  document.addEventListener("keydown", handleCloseModal);
  resetInputErrors(modal)
}

function openImageModal(card, modal) {
  const cardImage = card.querySelector(".card__image");
  const cardName = card.querySelector(".card__title");
  const modalImage = modal.querySelector(".popup__image");
  const modalCaption = modal.querySelector(".popup__caption");

  modalImage.src = cardImage.src;
  modalImage.alt = `На картинке город ${cardName.textContent}`;

  modalCaption.textContent = cardName.textContent;
  openModal(modal);
}

function closeModal(modal) {
  modal.classList.remove("popup_is-opened");
  document.removeEventListener("keydown", handleCloseModal);
}

function handleCloseModal(evt, modal) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".popup_is-opened");
    if (!activeModal) return;
    closeModal(activeModal);
  }
}

export { openModal, closeModal, openImageModal };
