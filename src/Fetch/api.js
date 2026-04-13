class Api {
  constructor({ baseUrl, headers }) {
    this._baseUrl = baseUrl;
    this._headers = {
      ...headers,
      "Content-Type": "application/json",
    };
  }

  _checkResponse(res) {
    if (!res.ok) {
      throw new Error(`Error: ${res.status}`);
    }
    return res.json();
  }

  async _request(url, options = {}) {
    const res = await fetch(`${this._baseUrl}${url}`, {
      ...options,
      headers: {
        ...this._headers,
        ...options.headers,
      },
    });
    return this._checkResponse(res);
  }

  getUserInfo() {
    return this._request("/users/me");
  }

  getInitialCards() {
    return this._request("/cards");
  }

  updateUserProfile(data) {
    return this._request("/users/me", {
      method: "PATCH",
      body: JSON.stringify(data),
    });
  }

  updateAvatar({ avatar }) {
    return this._request("/users/me/avatar", {
      method: "PATCH",
      body: JSON.stringify({ avatar }),
    });
  }

  addCard(data) {
    return this._request("/cards", {
      method: "POST",
      body: JSON.stringify(data),
    });
  }

  removeCard(cardId) {
    return this._request(`/cards/${cardId}`, {
      method: "DELETE",
    });
  }

  addLike(cardId) {
    return this._request(`/cards/likes/${cardId}`, {
      method: "PUT",
    });
  }

  removeLike(cardId) {
    return this._request(`/cards/likes/${cardId}`, {
      method: "DELETE",
    });
  }
}


export default Api
