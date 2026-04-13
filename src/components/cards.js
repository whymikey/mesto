class Card {
  constructor(data, userId, handleCardClick, api) {
    this._data = data;
    this._userId = userId;
    this._handleCardClick = handleCardClick;
    this._api = api;
  }

  _getTemplate() {
    const cardElement = document
      .querySelector("#card-template")
      .content.querySelector(".card")
      .cloneNode(true);
    return cardElement;
  }

  generateCard() {
    this._element = this._getTemplate();
    this._element.querySelector(".card__title").textContent = this._data.name;
    this._element.querySelector(".card__image").src = this._data.link;
    this._element.querySelector(".card__like-count").textContent =
      this._data.likes.length;
    if (this._isLiked()) {
      this._element
        .querySelector(".card__like-button")
        .classList.add("card__like-button_is-active");
    }

    this._element.querySelector(".card__delete-button").style.display =
      this._isOwner() ? "flex" : "none";

    this._setEventListeners();
    return this._element;
  }

  _isOwner() {
    return this._data.owner._id === this._userId;
  }

  _isLiked() {
    return this._data.likes.some((user) => user._id === this._userId);
  }

  _updateLike(likes) {
    this._element.querySelector(".card__like-count").textContent = likes.length;
  }

  _handleLikeClick() {
    const likeButton = this._element.querySelector(".card__like-button");
    const isLiked = likeButton.classList.contains(
      "card__like-button_is-active",
    );

    if (isLiked) {
      this._api.removeLike(this._data._id).then((res) => {
        this._data.likes = res.likes;
        this._updateLike(res.likes);
        likeButton.classList.remove("card__like-button_is-active");
      });
    } else {
      this._api.addLike(this._data._id).then((res) => {
        this._data.likes = res.likes;
        this._updateLike(res.likes);
        likeButton.classList.add("card__like-button_is-active");
      });
    }
  }

  _removeCard() {
    this._api
      .removeCard(this._data._id)
      .then(() => {
        this._element.remove();
        this._element = null;
      })
      .catch(console.error);
  }

  _setEventListeners() {
    this._element
      .querySelector(".card__image")
      .addEventListener("click", () => {
        this._handleCardClick(this._data);
      });

    this._element
      .querySelector(".card__like-button")
      .addEventListener("click", () => {
        this._handleLikeClick();
      });

    this._element
      .querySelector(".card__delete-button")
      .addEventListener("click", () => {
        this._removeCard();
      });
  }
}

export default Card;
