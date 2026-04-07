const showInputError = (form, input) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.add("popup__input_type_error");
  if (error) {
    error.classList.add("name-input-error_active");
    error.textContent = input.validationMessage;
  }
};

const hideInputError = (form, input) => {
  const error = form.querySelector(`.${input.id}-error`);
  input.classList.remove("popup__input_type_error");
  if (error) {
    error.classList.remove("name-input-error_active");
    error.textContent = "";
  }
};

const isValid = (form, input) => {
  if (!input.validity.valid) {
    showInputError(form, input);
  } else {
    hideInputError(form, input);
  }
};

const resetForm = (form) => {
  const inputs = form.querySelectorAll(".popup__input");
  inputs.forEach((input) => hideInputError(form, input))
};

const setEventListenersOnInput = (form) => {
  const inputs = form.querySelectorAll(".popup__input");
  inputs.forEach((input) => {
    input.addEventListener("input", () => isValid(form, input));
  });
};

export { setEventListenersOnInput, hideInputError };
