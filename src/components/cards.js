const createCard = ({ name, link, likes, _id, owner }, userId, template) => {
  const clone = template.content.cloneNode(true);
  const cardElement = clone.querySelector(".card");
  cardElement.querySelector(".card__image").src = link;
  cardElement.querySelector(".card__title").textContent = name;
  cardElement.querySelector(".card__like-count").textContent = likes.length;
  cardElement.dataset.cardId = _id;
  const deleteBtn = cardElement.querySelector(".card__delete-button");
  if (owner._id !== userId) deleteBtn.remove();
  return cardElement;
};

const renderCards = (template, cards, container, userId) => {
  cards.forEach((cardData) => {
    const card = createCard(cardData, userId, template);
    container.prepend(card);
  });
};

const addCard = (cardData, userId, template, container) => {
  const card = createCard(cardData, userId, template);
  container.prepend(card);
};

const likeCard = (card) => {
  const btn = card.querySelector(".card__like-button");
  btn.classList.toggle("card__like-button_is-active");
};

const removeCard = (card) => {
  card.remove();
};

export { renderCards, removeCard, addCard, likeCard };
