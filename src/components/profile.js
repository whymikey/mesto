const getProfileData = () => ({
  name: document.querySelector(".profile__title").textContent,
  description: document.querySelector(".profile__description").textContent,
});

const updateProfileData = (modal) => {
  const nameInputValue = modal.querySelector(".popup__input_type_name").value;
  const descriptionInputValue = modal.querySelector(
    ".popup__input_type_description",
  ).value;

  document.querySelector(".profile__title").textContent = nameInputValue;
  document.querySelector(".profile__description").textContent =
    descriptionInputValue;
};

export { getProfileData, updateProfileData };
