class Auth {
  constructor({ url, headers }) {
    this._url = url;
    this._headers = headers;
  }

  _checkPromise(response) {
    if(response.ok) {
      return response.json()
    }
    return Promise.reject(`Ошибка: ${response.status}`)
  }

  checkToken(jwt) {
    return fetch(`${this._url}/users/me`, {
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${jwt}`
      },
      method: 'GET'
    })
    .then(responce => this._checkPromise(responce))
  }

  autorizeUser(password, email) {
    return fetch(`${this._url}/signin`, {
      headers: {
        "Content-Type": "application/json",
      },
      method: 'POST',
      body: JSON.stringify({
        'password': password,
        'email': email
      })
    })
    .then(responce => this._checkPromise(responce))
  }

  registrateUser(password, email) {
    return fetch(`${this._url}/signup`, {
      headers: {
        "Content-Type": "application/json"
      },
      method: 'POST',
      body: JSON.stringify({
        'password': password,
        'email': email
      })
    })
    .then(responce => this._checkPromise(responce))
  }
}

const auth = new Auth({
  url: 'https://auth.nomoreparties.co',
  headers: {"Content-Type": "application/json"}
});

export default auth;