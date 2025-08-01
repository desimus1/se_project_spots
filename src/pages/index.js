//imports
import "./index.css";
import {
  enableValidation,
  settings,
  resetValidation,
  disableButton,
} from "../scripts/validation.js";
import Api from "../utils/Api.js";

import headerLogo from "./../images/logo.svg";
import profileAvatar from "./../images/avatar.jpg";
import editIconLight from "./../images/edit-icon-light.svg";
import editIcon from "./../images/edit-Icon.svg";
import plusIcon from "./../images/plus-icon.svg";
//images conections
const headerLogoImg = document.querySelector(
  '.header__logo[data-image-id="header-logo"]'
);
if (headerLogoImg) {
  headerLogoImg.src = headerLogo;
}

const profileAvatarImg = document.querySelector(
  '.profile__image[data-image-id="profile-avatar"]'
);
if (profileAvatarImg) {
  profileAvatarImg.src = profileAvatar;
}

const editIconImgLight = document.querySelector(
  'img[data-image-id="edit-icon-light"]'
);
if (editIconImgLight) {
  editIconImgLight.src = editIconLight;
}

const editIconImg = document.querySelector('img[data-image-id="edit-icon"]');
if (editIconImg) {
  editIconImg.src = editIcon;
}

const plusIconImg = document.querySelector('img[data-image-id="plus-icon"]');
if (plusIconImg) {
  plusIconImg.src = plusIcon;
}
//api conection to server
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1/",
  headers: {
    Authorization: "f6366f4e-abaa-415d-a2e9-65e3510930f0",
    "Content-Type": "application/json",
  },
});
//form
const editForm = document.querySelector(".modal__form");
const editFormInput = editForm.querySelectorAll(".modal__input");
//profile edit
const porfileEditBtn = document.querySelector(".profile__edit-btn");
const profileNewPostBtn = document.querySelector(".profile__new-post-btn");
const editProfileModal = document.querySelector("#edit-profile-modal");
const profileNameEl = document.querySelector(".profile__name");
const profileDescriptionEl = document.querySelector(".profile__description");
const editProfileCloseBtn = editProfileModal.querySelector(".modal__close-btn");
const editProfileNameInput = editProfileModal.querySelector(
  "#profile-name-input"
);
const editProfileDescriptionInput = editProfileModal.querySelector(
  "#profile-description-input"
);
const editProfileForm = editProfileModal.querySelector(".modal__form");
//new post
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostNameInput = newPostModal.querySelector("#post-caption-input");
const newPostLinkInput = newPostModal.querySelector("#post-picture-input");
const newPostCardForm = newPostModal.querySelector(".modal__form");
const postSubmitBtn = newPostModal.querySelector(".modal__save-btn");
//image view modal
const imageViewModal = document.querySelector("#image-view-modal");
const imageCloseBtn = imageViewModal.querySelector(".modal__close-btn");
const imageEl = imageViewModal.querySelector(".modal__img");
const imageCaption = imageViewModal.querySelector(".modal__caption");

const cardList = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card__template")
  .content.querySelector(".card");
//avatar
const newAvatarModal = document.querySelector("#new-avatar-modal");
const profileAvatarBtn = document.querySelector(".profile__avatar-btn");
const newAvatarCloseBtn = newAvatarModal.querySelector(".modal__close-btn");
const newAvatarForm = newAvatarModal.querySelector(".modal__form");
const newAvatarLinkInput = newAvatarModal.querySelector("#avatar-input");
const newAvatarSubmitBtn = newAvatarModal.querySelector(".modal__save-btn");
// delete card modal
const deleteCardModal = document.querySelector("#delete-card-modal");
const deleteCardForm = deleteCardModal.querySelector(".modal__form");
const deleteCardCloseBtn = deleteCardModal.querySelector(".modal__close-btn");
const deleteCardCancelBtn = deleteCardModal.querySelector(".modal__cancel-btn");
const deleteCardSubmitBtn = deleteCardModal.querySelector(
  ".modal__save-btn_type_delete"
);
let selectedCard;
let selectedCardId;

//new post function
function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImgEl = cardElement.querySelector(".card__image");
  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");

  let isLiked = data.isLiked;

  if (isLiked) {
    cardLikeBtnEl.classList.add("card__like-btn_active");
  }

  cardElement.dataset.cardId = data._id;

  cardImgEl.src = data.link;
  cardImgEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnEl.addEventListener("click", function () {
    openModal(deleteCardModal);
    deleteCardModal.dataset.cardId = data._id;
    deleteCardModal.dataset.cardElement = cardElement;
  });

  cardLikeBtnEl.addEventListener("click", () =>
    handleCardLikeButtonClick(cardLikeBtnEl, data._id, isLiked)
  );

  cardImgEl.addEventListener("click", function () {
    openModal(imageViewModal);
    imageEl.src = data.link;
    imageEl.alt = data.name;
    imageCaption.textContent = data.name;
  });

  return cardElement;
}
//esc function
function handleEscape(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_is-opened");
    if (activeModal) {
      closeModal(activeModal);
    }
  }
}
//modal open function
function openModal(modal) {
  modal.classList.add("modal_is-opened");
  modal.addEventListener("click", closeModalOnOverlay);
  document.addEventListener("keydown", handleEscape);
}
//modal close function
function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  modal.removeEventListener("click", closeModalOnOverlay);
  document.removeEventListener("keydown", handleEscape);
}
//close on overlay
function closeModalOnOverlay(evt) {
  if (evt.target.classList.contains("modal_is-opened")) {
    closeModal(evt.target);
  }
}
//event listeners
porfileEditBtn.addEventListener("click", function () {
  editProfileNameInput.value = profileNameEl.textContent;
  editProfileDescriptionInput.value = profileDescriptionEl.textContent;
  resetValidation(
    editProfileModal,
    [editProfileNameInput, editProfileDescriptionInput],
    settings
  );
  openModal(editProfileModal);
});

editProfileCloseBtn.addEventListener("click", function () {
  closeModal(editProfileModal);
});

profileNewPostBtn.addEventListener("click", function () {
  resetValidation(newPostModal, [newPostNameInput, newPostLinkInput], settings);
  openModal(newPostModal);
});

newPostCloseBtn.addEventListener("click", function () {
  closeModal(newPostModal);
});

imageCloseBtn.addEventListener("click", function () {
  closeModal(imageViewModal);
});

profileAvatarBtn.addEventListener("click", function () {
  newAvatarLinkInput.value = "";
  resetValidation(newAvatarModal, [newAvatarLinkInput], settings);
  openModal(newAvatarModal);
});

newAvatarCloseBtn.addEventListener("click", function () {
  closeModal(newAvatarModal);
});
deleteCardCloseBtn.addEventListener("click", function () {
  closeModal(deleteCardModal);
});

deleteCardCancelBtn.addEventListener("click", function () {
  closeModal(deleteCardModal);
});

//submit handlers
function handleEditProfileSubmit(evt) {
  evt.preventDefault();
  const postSubmitBtn = evt.submitter;
  postSubmitBtn.textContent = "Saving...";
  api
    .editUserInfo({
      name: editProfileNameInput.value,
      about: editProfileDescriptionInput.value,
    })
    .then((data) => {
      profileNameEl.textContent = data.name;
      profileDescriptionEl.textContent = data.about;
      closeModal(editProfileModal);
    })
    .catch(console.error)
    .finally(() => {
      postSubmitBtn.textContent = "Save";
    });
}
editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleAddCardSubmit(evt) {
  evt.preventDefault();
  const postSubmitBtn = evt.submitter;
  postSubmitBtn.textContent = "Saving...";
  api
    .addCard({
      name: newPostNameInput.value,
      link: newPostLinkInput.value,
    })
    .then((data) => {
      const cardElement = getCardElement(data);
      cardList.prepend(cardElement);
      closeModal(newPostModal);
      newPostCardForm.reset();
      disableButton(postSubmitBtn, settings);
    })
    .catch(console.error)
    .finally(() => {
      postSubmitBtn.textContent = "Save";
    });
}

newPostCardForm.addEventListener("submit", handleAddCardSubmit);

function handleNewAvatarSubmit(evt) {
  evt.preventDefault();
  const newAvatarSubmitBtn = evt.submitter;
  newAvatarSubmitBtn.textContent = "Saving...";
  api
    .editUserAvatar({
      avatar: newAvatarLinkInput.value,
    })
    .then((data) => {
      if (profileAvatarImg) {
        profileAvatarImg.src = data.avatar;
      }
      closeModal(newAvatarModal);
      newAvatarForm.reset();
      disableButton(newAvatarSubmitBtn, settings);
    })
    .catch(console.error)
    .finally(() => {
      newAvatarSubmitBtn.textContent = "Save";
    });
}

newAvatarForm.addEventListener("submit", handleNewAvatarSubmit);

function handleDeleteCardSubmit(evt) {
  evt.preventDefault();
  const deleteCardSubmitBtn = evt.submitter;
  deleteCardSubmitBtn.textContent = "Deleting...";
  const cardId = deleteCardModal.dataset.cardId;
  const cardElementToRemove = document.querySelector(
    `[data-card-id="${cardId}"]`
  );
  api
    .deleteCard(cardId)
    .then(() => {
      cardElementToRemove.remove();
      closeModal(deleteCardModal);
    })
    .catch(console.error)
    .finally(() => {
      deleteCardSubmitBtn.textContent = "Delete";
    });
}

deleteCardForm.addEventListener("submit", handleDeleteCardSubmit);

function handleCardLikeButtonClick(cardLikeButton, cardId) {
  const isCurrentlyLiked = cardLikeButton.classList.contains(
    "card__like-btn_active"
  );
  const isCurrentlyUnliked = isCurrentlyLiked;

  api
    .handleLike(cardId, isCurrentlyUnliked)
    .then((updatedCard) => {
      cardLikeButton.classList.toggle("card__like-btn_active");
    })
    .catch(console.error);
}

//api connection
api
  .getAppInfo()
  .then(([cards, userInfo]) => {
    if (profileNameEl) {
      profileNameEl.textContent = userInfo.name;
    }
    if (profileDescriptionEl) {
      profileDescriptionEl.textContent = userInfo.about;
    }
    if (profileAvatarImg && userInfo.avatar) {
      profileAvatarImg.src = userInfo.avatar;
    }
    cards.reverse().forEach(function (item) {
      const cardElement = getCardElement(item);
      cardList.prepend(cardElement);
    });
  })
  .catch(console.error);

enableValidation(settings);
