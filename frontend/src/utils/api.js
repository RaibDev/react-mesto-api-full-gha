class Api {
  constructor({url, headers}) {
    this._url= url;
    this._headers = headers;
  }

  _checkPromise(response) {
      if(response.ok) {
        return response.json();
      }

      return Promise.reject(`Ошибка: ${response.status}`);
  }

  // _rejectPromise(err) {
  //   console.log(err);
  // }

  getInitialCards() {
    return fetch(`${this._url}/cards`, {
      headers: this._headers
    })
      .then(response => this._checkPromise(response));
    
  }

  changeUserInfo(formData) {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        name: formData.name,
        about: formData.about
      })
    })
      .then(response => this._checkPromise(response));
  }

  changeUserAvatar(formData) {
    return fetch(`${this._url}/users/me/avatar`, {
      headers: this._headers,
      method: 'PATCH',
      body: JSON.stringify({
        avatar: formData.avatar
      })
    })
      .then(response => this._checkPromise(response));
  }

  getUserInfo() {
    return fetch(`${this._url}/users/me`, {
      headers: this._headers
    })
      .then(response => this._checkPromise(response));
  }

  addNewCard(data) {
    return fetch(`${this._url}/cards`, {
      headers: this._headers,
      method: 'POST',
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
      .then(response => this._checkPromise(response));
  }

  deleteCard(id) {
    return fetch(`${this._url}/cards/${id}`, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(response => this._checkPromise(response));
  }

  changeCardLikeStatus(id, isLiked) {
    if(isLiked) {
      return fetch(`${this._url}/cards/${id}/likes`, {
        headers: this._headers,
        method: 'PUT'
      })
      .then(response => this._checkPromise(response));
    } else {
      return fetch(`${this._url}/cards/${id}/likes`, {
        headers: this._headers,
        method: 'DELETE'
      })
      .then(response => this._checkPromise(response));
    }
  }

  likeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: 'PUT'
    })
      .then(response => this._checkPromise(response));
  }

  dislikeCard(id) {
    return fetch(`${this._url}/cards/${id}/likes`, {
      headers: this._headers,
      method: 'DELETE'
    })
      .then(response => this._checkPromise(response));
  }

};

export default Api;
