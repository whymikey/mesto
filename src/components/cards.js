const createCard = (template, { name, link }) => {
  const cloneCard = template.content.cloneNode(true);
  cloneCard.querySelector(".card__image").src = link;
  cloneCard.querySelector(".card__title").textContent = name;

  return cloneCard;
};

const removeCard = (card) => {
  card.remove();
};

const renderCards = (template, cards, cardsList) => {
  cards.forEach((card) => {
    const cardElement = createCard(template, card);
    cardsList.prepend(cardElement);
  });
};

const addCard = (template, modal, cardsList) => {
  const newCard = {
    name: modal.querySelector(".popup__input_type_card-name").value,
    link: modal.querySelector(".popup__input_type_url").value,
  };
  const cardElement = createCard(template, newCard);
  cardsList.prepend(cardElement);
};

const likeCard = (card) => {
  const btn = card.querySelector('.card__like-button')
  btn.classList.toggle('card__like-button_is-active')
};

export { renderCards, removeCard, addCard, likeCard };
