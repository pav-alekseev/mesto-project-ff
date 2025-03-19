const getPopupErrorElement = (formElement, inputElement) => formElement.querySelector(`.${inputElement.id}-error`);
const hideValidationErrors = (popupErrorElement, inputElement, {
    inputErrorClass,
    errorClass,
}) => {
    popupErrorElement.classList.remove(errorClass);
    popupErrorElement.textContent = '';

    inputElement.classList.remove(inputErrorClass);
};

export const enableSubmitButton = (submitButtonElement, inactiveButtonClass) => {
    submitButtonElement.disabled = false;
    submitButtonElement.classList.remove(inactiveButtonClass);
}

export const disableSubmitButton = (submitButtonElement, inactiveButtonClass) => {
    submitButtonElement.disabled = true;
    submitButtonElement.classList.add(inactiveButtonClass);
}

const changeButtonState = (
         inputElements,
         submitButtonElement,
         inactiveButtonClass) => {
        const shouldBeEnabled = [...inputElements].every(input => input.validity.valid);
        if (shouldBeEnabled) {
            enableSubmitButton(submitButtonElement, inactiveButtonClass);
        } else {
            disableSubmitButton(submitButtonElement, inactiveButtonClass);
        }
    };

export const enableValidation =
    ({
         formSelector,
         inputSelector,
         submitButtonSelector,
         inactiveButtonClass,
         inputErrorClass,
         errorClass,
     }) => {
        const formElements = document.querySelectorAll(formSelector);

        formElements.forEach(formElement => {
            const inputElements = formElement.querySelectorAll(inputSelector);
            const submitButtonElement = formElement.querySelector(submitButtonSelector);

            inputElements.forEach(inputElement => {
                const popupErrorElement = getPopupErrorElement(formElement, inputElement);


                inputElement.addEventListener('input', () => {
                    if (inputElement.validity.patternMismatch) {
                        inputElement.setCustomValidity(inputElement.dataset.errorMessage);
                    } else {
                        inputElement.setCustomValidity('');
                    }

                    if (inputElement.validity.valid) {
                        hideValidationErrors(popupErrorElement, inputElement, {inputErrorClass, errorClass});
                    } else {
                        popupErrorElement.classList.add(errorClass);
                        popupErrorElement.textContent = inputElement.validationMessage;
                        inputElement.classList.add(inputErrorClass);
                    }

                    changeButtonState(inputElements, submitButtonElement, inactiveButtonClass);
                });
            })
        });
    };

export const clearValidation = (
    formElement,
    {
        formSelector,
        inputSelector,
        submitButtonSelector,
        inactiveButtonClass,
        inputErrorClass,
        errorClass,
    },
    toggleButtonStateFn
) => {
    const inputElements = formElement.querySelectorAll(inputSelector);
    const submitButtonElement = formElement.querySelector(submitButtonSelector);

    inputElements.forEach(inputElement => {
        const popupErrorElement = getPopupErrorElement(formElement, inputElement);
        hideValidationErrors(popupErrorElement, inputElement, {inputErrorClass, errorClass});
    });
    toggleButtonStateFn(submitButtonElement, inactiveButtonClass);
};
