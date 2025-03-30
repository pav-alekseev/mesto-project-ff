import {ESCAPE_KEY} from "./constants";

const popupIsOpenedClass = 'popup_is-opened';

const popupElements = {closeButton: null, popup: null};
const handleDocumentKeydownEvent = event => {
    if (event.key === ESCAPE_KEY)
        closePopup();
}

const handlePopupClick = event => {
    if (event.target.classList.contains(popupIsOpenedClass))
        closePopup();
}

const handleCloseButtonClick = () => closePopup();

export const closePopup = () => {
    const {popup, closeButton} = popupElements;
    popup.classList.remove(popupIsOpenedClass);
    document.removeEventListener('keydown', handleDocumentKeydownEvent);
    closeButton.removeEventListener('click', handleCloseButtonClick);
    popup.removeEventListener('click', handlePopupClick);
};

export const openPopup = (element) => {
    element.classList.add(popupIsOpenedClass);

    popupElements.popup = element;
    popupElements.closeButton = element.querySelector('.popup__close');

    document.addEventListener('keydown', handleDocumentKeydownEvent);
    popupElements.closeButton.addEventListener('click', handleCloseButtonClick);
    element.addEventListener('click', handlePopupClick);
}
