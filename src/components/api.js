import {apiConfig} from "./constants";

export const handleResponseData = response => {
    if (response.ok) {
        return response.json();
    }
    return Promise.reject(`Error! ${response.status}`);
}

const checkUrlContainsImage = url =>
    fetch(url, {
        method: 'HEAD',
    }).then(response => {
        const { ok, headers, status } = response;
        const includesImage = headers.get('Content-Type').includes('image');
        if (ok && includesImage) {
            return Promise.resolve();
        }
        const errorText = ok && !includesImage ? 'URL does not contain any images.' : status;
        return Promise.reject(errorText);
    });

export const getUserData = () =>
    fetch(`${apiConfig.baseUrl}/users/me`, {
        headers: apiConfig.headers
    }).then(handleResponseData);

export const getCardsData = () =>
    fetch(`${apiConfig.baseUrl}/cards`, {
        headers: apiConfig.headers
    }).then(handleResponseData);

export const updateUserData = (name, about) =>
    fetch(`${apiConfig.baseUrl}/users/me`, {
        method: 'PATCH',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name,
            about
        })
    }).then(handleResponseData)

export const createNewCard = (name, link) =>
    fetch(`${apiConfig.baseUrl}/cards`, {
        method: 'POST',
        headers: apiConfig.headers,
        body: JSON.stringify({
            name,
            link,
        })
    }).then(handleResponseData)

export const deleteCard = cardId =>
    fetch(`${apiConfig.baseUrl}/cards/${cardId}`, {
        headers: apiConfig.headers,
        method: 'DELETE',
    }).then(handleResponseData);

export const likeCard = cardId =>
    fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        headers: apiConfig.headers,
        method: 'PUT',
    }).then(handleResponseData);

export const removeCardLike = cardId =>
    fetch(`${apiConfig.baseUrl}/cards/likes/${cardId}`, {
        headers: apiConfig.headers,
        method: 'DELETE',
    }).then(handleResponseData);


export const updateAvatar = url =>
    checkUrlContainsImage(url).then(() =>
        fetch(`${apiConfig.baseUrl}/users/me/avatar`, {
            headers: apiConfig.headers,
            method: 'PATCH',
            body: JSON.stringify({
                avatar: url,
            }),
        }).then(handleResponseData)
    );
