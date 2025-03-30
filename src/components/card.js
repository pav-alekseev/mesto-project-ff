import { likeCard, removeCardLike } from "./api";

const likeButtonActiveClass = 'card__like-button_is-active';
const likeCounterActiveClass =  'card__like-counter_is-active';

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
        counter.classList.add('card__like-counter_is-active');
        counter.textContent = likes.length;
    }

    const hasLikeFromCurrentUser = likes.find((element) => element['_id'] === currentUserId);

    if (hasLikeFromCurrentUser) {
        likeButton.classList.add('card__like-button_is-active');
    }

    likeButton.addEventListener('click', () => onCardLike(_id, likeButton, counter));
    cardImage.addEventListener('click', () => onOpenCardImage(link, name))

    return card;
};

export const onCardLike = (cardId, buttonElement, counterElement) => {
    buttonElement.disabled = true;

    if (buttonElement.classList.contains(likeButtonActiveClass)) {
        removeCardLike(cardId)
            .then(({likes}) => {
                buttonElement.classList.remove(likeButtonActiveClass);

                if (likes.length) {
                    counterElement.classList.add(likeCounterActiveClass);
                    counterElement.textContent = likes.length;
                } else {
                    counterElement.classList.remove(likeCounterActiveClass);
                    counterElement.textContent = '';
                }
            })
            .catch((error) => console.error(error))
            .finally(() => {
                buttonElement.disabled = false;
            });
    } else {
        likeCard(cardId)
            .then(({likes}) => {
                buttonElement.classList.add(likeButtonActiveClass);

                counterElement.classList.add(likeCounterActiveClass);
                counterElement.textContent = likes.length;
            })
            .catch((error) => console.error(error))
            .finally(() => {
                buttonElement.disabled = false;
            });
    }
};