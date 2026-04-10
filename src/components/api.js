const BASE_URL = "https://mesto.nomoreparties.co/v1/pwff-cohort-1";

async function request(url, options) {
  const res = await fetch(url, options);
  if (!res.ok) {
    throw new Error(`Error: ${res.status}`);
  }

  return res.json();
}

function getHeaders(token) {
  return {
    authorization: token,
    "Content-Type": "application/json",
  };
}

async function getCardsData(token) {
  try {
    return request(`${BASE_URL}/cards`, {
      headers: getHeaders(token),
    });
  } catch (err) {
    console.log(err);
  }
}

async function getUsersData(token) {
  try {
    return request(`${BASE_URL}/users/me`, {
      headers: getHeaders(token),
    });
  } catch (err) {
    console.log(err);
  }
}

async function fetchInitialData(token) {
  try {
    const [userData, cardData] = await Promise.all([
      getUsersData(token),
      getCardsData(token),
    ]);
    console.log(userData);
    return [userData, cardData];
  } catch (err) {
    console.log("Ошибка инициализации:", err);
  }
}

async function updateProfileOnServer(token, { name, about }) {
  try {
    const url = "https://nomoreparties.co/v1/pwff-cohort-1/users/me";
    const options = {
      method: "PATCH",
      headers: getHeaders(token),
      body: JSON.stringify({ name, about }),
    };
    return request(url, options);
  } catch (err) {}
}

async function updateCardsOnServer(token, { name, link }) {
  try {
    const url = `${BASE_URL}/cards`;
    const options = {
      method: "POST",
      headers: getHeaders(token),
      body: JSON.stringify({ name, link }),
    };
    return request(url, options);
  } catch (err) {
    console.log(err);
  }
}

async function removeCard(token, cardId) {
  try {
    const url = `${BASE_URL}/cards/${cardId}`;
    const options = {
      method: "DELETE",
      headers: getHeaders(token),
    };
    return request(url, options);
  } catch (err) {
    console.log(err);
  }
}

async function addLike(token, cardId) {
  try {
    const url = `${BASE_URL}/cards/likes/${cardId}`;
    const options = {
      method: "PUT",
      headers: getHeaders(token),
    };
    return request(url, options);
  } catch (err) {
    console.log(err);
  }
}

async function removeLike(token, cardId) {
  try {
    const url = `${BASE_URL}/cards/likes/${cardId}`;
    const options = {
      method: "DELETE",
      headers: getHeaders(token),
    };
    return request(url, options);
  } catch (err) {}
}

function toggleLike(cardElement, likeButton, token) {
  const cardId = cardElement.dataset.cardId;
  const likeCount = cardElement.querySelector(".card__like-count");

  const apiCall = likeButton.classList.contains("card__like-button_is-active")
    ? removeLike(token, cardId)
    : addLike(token, cardId);
  apiCall.then((res) => {
    res.likes;
    likeCount.textContent = res.likes.length;
    likeButton.classList.toggle("card__like-button_is-active");
  });
}

async function changeAvatar(token, { avatar }) {
  try {
    const url = `${BASE_URL}/users/me/avatar`;
    const options = {
      method: "PATCH",
      headers: getHeaders(token),
      body: JSON.stringify({ avatar }),
    };
    return request(url, options);
  } catch (err) {
    console.log(err);
  }
}

export {
  fetchInitialData,
  updateProfileOnServer,
  updateCardsOnServer,
  toggleLike,
  removeCard,
  changeAvatar,
};
