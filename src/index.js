import './pages/index.css';
import {createCard, onCardLike} from './components/card';
import {closePopup, openPopup} from "./components/modal";
import {validationConfig} from "./components/constants";
import {clearValidation, disableSubmitButton, enableSubmitButton, enableValidation} from "./components/validation";
import {
    createNewCard,
    deleteCard,
    getCardsData,
    getUserData,
    updateAvatar,
    updateUserData
} from "./components/api";

const cardTemplate = document.querySelector('#card-template').content;
const cardItem = cardTemplate.querySelector('.places__item');
const cardList = document.querySelector('.places__list');

const popupProfileEdit = document.querySelector('.popup_type_edit');
const profileEditButton = document.querySelector('.profile__edit-button');
const profileAddButton = document.querySelector('.profile__add-button');
const popupProfileAdd = document.querySelector('.popup_type_new-card');

const popupImage = document.querySelector('.popup_type_image');
const popupCardImage = popupImage.querySelector('.popup__image');
const popupCardImageCaption = popupImage.querySelector('.popup__caption');


const profileTitle = document.querySelector('.profile__title');
const profileImage = document.querySelector('.profile__image');
const profileDescription = document.querySelector('.profile__description');
const editProfileForm = document.forms['edit-profile'];
const editProfileSubmitButton = editProfileForm.querySelector('.popup__button');
const nameInput = editProfileForm.elements.namedItem('name');
const jobInput = editProfileForm.elements.namedItem('description');

const newPlaceForm = document.forms['new-place'];
const newPlaceSubmitButton = newPlaceForm.querySelector('.popup__button');
const placeNameInput = newPlaceForm.elements.namedItem('place-name');
const linkInput = newPlaceForm.elements.namedItem('link');


const popupProfileImage = document.querySelector('.popup_type_update-avatar');
const updateAvatarForm = document.forms['update-avatar'];
const updateAvatarInput = updateAvatarForm.elements.namedItem('avatar');
const updateAvatarSubmitButton =
    updateAvatarForm.querySelector('.popup__button');

const popupDeleteCard = document.querySelector('.popup_type_delete_card');
const popupDeleteCardButton = popupDeleteCard.querySelector('.popup__button');

const toggleSubmitButtonLoadingState = (isLoading, buttonElement) => {
    if (isLoading) {
        buttonElement.textContent = 'Сохранение...';
    } else {
        buttonElement.textContent = 'Сохранить';
    }
};

const setProfileData = ({about, name, avatar}) => {
    profileDescription.textContent = about;
    profileTitle.textContent = name;
    profileImage.style.backgroundImage = `url(${avatar})`;
};

const onCardDelete = (cardId, deleteButtonElement, card) => {
    openPopup(popupDeleteCard);

    popupDeleteCardButton.onclick = () => {
        deleteButtonElement.disabled = true;

        deleteCard(cardId)
            .then(() => {
                card.remove();
            })
            .catch((error) => console.error(error))
            .finally(() => {
                deleteButtonElement.disabled = false;
                closePopup(popupDeleteCard);
            });
    };
};

export const onOpenCardImage = (link, name) => {
    popupCardImage.src = link;
    popupCardImage.alt = name;
    popupCardImageCaption.textContent = name;

    openPopup(popupImage);
}

const onEditProfileFormSubmit = event => {
    event.preventDefault();

    toggleSubmitButtonLoadingState(true, editProfileSubmitButton);

    updateUserData(nameInput.value, jobInput.value)
        .then(response => {
            setProfileData(response);
            closePopup();
        })
        .catch((error) => console.error(error))
        .finally(() => toggleSubmitButtonLoadingState(false, editProfileSubmitButton));

}

const onNewPlaceFormSubmit = event => {
    event.preventDefault();

    toggleSubmitButtonLoadingState(true, newPlaceSubmitButton)

    createNewCard(placeNameInput.value, linkInput.value)
        .then(newCard => {
            const currentUserId = newCard.owner['_id'];
            const card = createCard(currentUserId, cardItem, newCard, onCardDelete, onCardLike, onOpenCardImage);
            cardList.prepend(card);
            closePopup();
        })
        .catch((error) => console.error(error))
        .finally(() => toggleSubmitButtonLoadingState(false, newPlaceSubmitButton));
}

const onUpdateAvatarFormSubmit = event => {
    event.preventDefault();

    toggleSubmitButtonLoadingState(true, updateAvatarSubmitButton);

    updateAvatar(updateAvatarInput.value)
        .then(profileData => {
            setProfileData(profileData);
            closePopup();
        })
        .catch((error) => console.error(error))
        .finally(() => toggleSubmitButtonLoadingState(false, updateAvatarSubmitButton));
}

const onProfileImageClick = () => {
    updateAvatarInput.value = null;
    clearValidation(updateAvatarForm, validationConfig, disableSubmitButton);
    openPopup(popupProfileImage);
}

const onProfileAddButtonClick = () => {
    placeNameInput.value = null;
    linkInput.value = null

    clearValidation(popupProfileAdd, validationConfig, disableSubmitButton);
    openPopup(popupProfileAdd);
}

const onProfileEditButtonClick = () => {
    nameInput.value = profileTitle.textContent;
    jobInput.value = profileDescription.textContent;

    clearValidation(popupProfileEdit, validationConfig, enableSubmitButton);
    openPopup(popupProfileEdit);
}

editProfileForm.addEventListener('submit', onEditProfileFormSubmit);
newPlaceForm.addEventListener('submit', onNewPlaceFormSubmit);
updateAvatarForm.addEventListener('submit', onUpdateAvatarFormSubmit);

profileEditButton.addEventListener('click', onProfileEditButtonClick);
profileAddButton.addEventListener('click', onProfileAddButtonClick);
profileImage.addEventListener('click', onProfileImageClick)

enableValidation(validationConfig);

Promise.all([
    getUserData(),
    getCardsData(),
]).then(([userData, cards]) => {
    setProfileData(userData);
    const {_id} = userData;

    cards.forEach(card => {
        const newCard = createCard(_id, cardItem, card, onCardDelete, onCardLike, onOpenCardImage);
        cardList.appendChild(newCard);
    });
})
    .catch((error) => console.error(error));
