export default class Api {
  constructor(options){
    this._url = options.url;
    this._token = options.token;
  }

  getUserInformation(){
    return fetch(`${this._url}/users/me`,{
      headers: {
        authorization: this._token,
        "Content-Type" : "application/json"
      }
    })
    .then((res) => {
      if(res.ok){
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
  }

  getInitialCards(){
    return fetch(`${this._url}/cards`,{
      headers: {
        authorization: this._token,
        "Content-Type" : "application/json"
      }
    })
    .then((res) => {
      if (res.ok){
        return res.json();
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
  }
  
  updateUserInfo(data){
    return fetch(`${this._url}/users/me`, {
      method: 'PATCH',
      headers: {
        authorization: this._token,
        'Content-Type' : 'application/json'
      },
      body: JSON.stringify({
        name: data.name,
        about: data.about
      })
    }) 
    .then((res) => {
      if(res.ok){
        return res.json()
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
  }

  addNewCard(data){
    return fetch(`${this._url}/cards`,{
      method: "POST",
      headers: {
        authorization: this._token,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        name: data.name,
        link: data.link
      })
    })
    .then((res) => {
      if(res.ok){
        return res.json()
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
  }

  deleteCard(id){
    return fetch(`${this._url}/cards/${id}`,{
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type" : "application/json"
      }
    })
    .then((res) => {
      if(res.ok){
        return res.json()
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
  }

  addLike(id){
    return fetch(`${this._url}/cards/${id}/likes`,{
      method: "PUT",
      headers: {
        authorization: this._token,
        "Content-Type" : "application/json"
      }
    })
    .then((res) => {
      if(res.ok){
        return res.json()
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
  }

  deleteLike(id){
    return fetch(`${this._url}/cards/${id}/likes`,{
      method: "DELETE",
      headers: {
        authorization: this._token,
        "Content-Type" : "application/json"
      }
    })
    .then((res) => {
      if(res.ok){
        return res.json()
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
  }

  updateAvatar(data){
    return fetch(`${this._url}/users/me/avatar`,{
      method: "PATCH",
      headers: {
        authorization: this._token,
        "Content-Type" : "application/json"
      },
      body: JSON.stringify({
        avatar: data.link
      })
    })
    .then((res) => {
      if(res.ok){
        return res.json()
      } else {
        return Promise.reject(`Что-то пошло не так: ${res.status}`);
      }
    })
  }
}