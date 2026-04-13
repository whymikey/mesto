const getProfileDataFromForm = (form) => ({
  name: form.querySelector(".popup__input_type_name").value,
  about: form.querySelector(".popup__input_type_description").value,
});

const renderUserProfile = ({ name, about, avatar }) => {
  document.querySelector(".profile__title").textContent = name;
  document.querySelector(".profile__description").textContent = about;
  if (avatar) {
    document.querySelector(".profile__image").style.backgroundImage =
      `url(${avatar})`;
  }
};

export { getProfileDataFromForm, renderUserProfile };
