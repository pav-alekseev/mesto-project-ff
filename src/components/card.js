import {commonClasses} from "./constants";

export const createCard = (currentUserId, cardTemplate, cardData, onCardDelete, onCardLike, onOpenCardImage) => {
    const card = cardTemplate.cloneNode(true);
    const cardImage = card.querySelector('.card__image');
    const cardTitle = card.querySelector('.card__title');
    const likeButton = card.querySelector('.card__like-button');
    const counter = card.querySelector('.card__like-counter');

    const { link, name, likes, owner, _id } = cardData;

    cardImage.src = link;
    cardImage.alt = name;
    cardTitle.textContent = name;

    if (owner['_id'] === currentUserId) {
        const deleteButton = card.querySelector('.card__delete-button');
        deleteButton.classList.add('card__delete-button_is-active');
        deleteButton.addEventListener('click', () => {
            onCardDelete(_id, deleteButton, card);
        });
    }

    if (likes.length) {
        counter.classList.add(commonClasses.likeCounterActive);
        counter.textContent = likes.length;
    }

    const hasLikeFromCurrentUser = likes.find((element) => element['_id'] === currentUserId);

    if (hasLikeFromCurrentUser) {
        likeButton.classList.add(commonClasses.likeButtonActive);
    }

    likeButton.addEventListener('click', () => onCardLike(_id, likeButton, counter));
    cardImage.addEventListener('click', () => onOpenCardImage(link, name))

    return card;
};
