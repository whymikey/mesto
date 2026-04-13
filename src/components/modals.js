class Modal {
  constructor(modalSelector) {
    this._modal = document.querySelector(modalSelector);
  }

  open() {
    this._modal.classList.add("popup_is-opened");
  }

  close() {
    this._modal.classList.remove("popup_is-opened");
  }

  _handleEscClose(evt) {
    if (evt.key === "Escape") this.close();
  }

  setImage({ name, link }) {
    const image = this._modal.querySelector(".popup__image");
    const caption = this._modal.querySelector(".popup__caption");

    image.src = link;
    image.alt = name;
    caption.textContent = name;
  }

  setEventListeners() {
    this._modal
      .querySelector(".popup__close")
      .addEventListener("click", () => this.close());

    this._modal.addEventListener("mousedown", (evt) => {
      if (evt.target === this._modal) this.close();
    });
  }
}

export default Modal;
