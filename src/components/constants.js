export const ESCAPE_KEY = 'Escape';

export const commonClasses = {
    popupIsOpened: 'popup_is-opened',
    likeButtonActive: 'card__like-button_is-active',
    likeCounterActive: 'card__like-counter_is-active'
}

export const validationConfig = {
    formSelector: '.popup__form',
    inputSelector: '.popup__input',
    submitButtonSelector: '.popup__button',
    inactiveButtonClass: 'popup__button_disabled',
    inputErrorClass: 'popup__input_type_error',
    errorClass: 'popup__error_visible',
};

export const apiConfig = {
    baseUrl: 'https://nomoreparties.co/v1/cohort-mag-4',
    headers: {
        authorization: 'f52d4b76-1ac1-4fd3-b1dd-a461f811ea0d',
        'Content-Type': 'application/json',
    },
};