import {commonClasses, ESCAPE_KEY} from "./constants";

const popupElements = {closeButton: null, popup: null};
const handleDocumentKeydownEvent = event => {
    if (event.key === ESCAPE_KEY)
        closePopup();
}

const handlePopupClick = event => {
    if (event.target.classList.contains(commonClasses.popupIsOpened))
        closePopup();
}

const handleCloseButtonClick = () => closePopup();

export const closePopup = () => {
    const {popup, closeButton} = popupElements;
    popup.classList.remove(commonClasses.popupIsOpened);
    document.removeEventListener('keydown', handleDocumentKeydownEvent);
    closeButton.removeEventListener('click', handleCloseButtonClick);
    popup.removeEventListener('click', handlePopupClick);
};

export const openPopup = (element) => {
    element.classList.add(commonClasses.popupIsOpened);

    const closeButton = element.querySelector('.popup__close');

    popupElements.popup = element;
    popupElements.closeButton = closeButton;

    document.addEventListener('keydown', handleDocumentKeydownEvent);
    closeButton.addEventListener('click', handleCloseButtonClick);
    element.addEventListener('click', handlePopupClick);
}
