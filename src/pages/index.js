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
import editIcon from "./../images/edit-Icon.svg";
import plusIcon from "./../images/plus-icon.svg";
import faviconImage from "./../images/logo.svg";

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

const editIconImg = document.querySelector('img[data-image-id="edit-icon"]');
if (editIconImg) {
  editIconImg.src = editIcon;
}

const plusIconImg = document.querySelector('img[data-image-id="plus-icon"]');
if (plusIconImg) {
  plusIconImg.src = plusIcon;
}

// const initialCards = [
//   {
//     name: "Golden Gate Bridge",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/7-photo-by-griffin-wooldridge-from-pexels.jpg",
//   },
//   {
//     name: "Val Thorens",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/1-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
//   {
//     name: "Restaurant terrace",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/2-photo-by-ceiline-from-pexels.jpg",
//   },
//   {
//     name: "An outdoor cafe",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/3-photo-by-tubanur-dogan-from-pexels.jpg",
//   },
//   {
//     name: "A very long bridge, over the forest and through the trees",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/4-photo-by-maurice-laschet-from-pexels.jpg",
//   },
//   {
//     name: "Tunnel with morning light",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/5-photo-by-van-anh-nguyen-from-pexels.jpg",
//   },
//   {
//     name: "Mountain house",
//     link: "https://practicum-content.s3.us-west-1.amazonaws.com/software-engineer/spots/6-photo-by-moritz-feldmann-from-pexels.jpg",
//   },
// ];

//api
const api = new Api({
  baseUrl: "https://around-api.en.tripleten-services.com/v1",
  headers: {
    authorization: "46101f28-4b15-4fed-abde-b6b4f6c8406d",
    "Content-Type": "application/json",
  },
});

//destructure the second item in the call back of the .then()

api
  .getAppInfo()
  .then(([cards]) => {
    console.log(cards);
    cards.reverse().forEach(function (item) {
      const cardElement = getCardElement(item);
      cardList.prepend(cardElement);
    });
  })
  .catch(console.error);

//handle useer info
//set src of avatar image
//set text content of about and name

//form
const editForm = document.querySelector(".modal__form");
const editFormInput = editForm.querySelectorAll(".modal__input");

//profile
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
//post
const newPostModal = document.querySelector("#new-post-modal");
const newPostCloseBtn = newPostModal.querySelector(".modal__close-btn");
const newPostNameInput = newPostModal.querySelector("#post-caption-input");
const newPostLinkInput = newPostModal.querySelector("#post-picture-input");
const newPostCardForm = newPostModal.querySelector(".modal__form");
const postSubmitBtn = newPostModal.querySelector(".modal__save-btn");
//img popup
const imageViewModal = document.querySelector("#image-view-modal");
const imageCloseBtn = imageViewModal.querySelector(".modal__close-btn");
const imageEl = imageViewModal.querySelector(".modal__img");
const imageCaption = imageViewModal.querySelector(".modal__caption");
//card
const cardList = document.querySelector(".cards__list");
const cardTemplate = document
  .querySelector("#card__template")
  .content.querySelector(".card");

function getCardElement(data) {
  const cardElement = cardTemplate.cloneNode(true);
  const cardTitleEl = cardElement.querySelector(".card__title");
  const cardImgEl = cardElement.querySelector(".card__image");
  cardImgEl.src = data.link;
  cardImgEl.alt = data.name;
  cardTitleEl.textContent = data.name;

  const cardDeleteBtnEl = cardElement.querySelector(".card__delete-btn");
  cardDeleteBtnEl.addEventListener("click", function () {
    cardElement.remove();
  });
  const cardLikeBtnEl = cardElement.querySelector(".card__like-btn");

  cardLikeBtnEl.addEventListener("click", function () {
    cardLikeBtnEl.classList.toggle("card__like-btn_active");
  });

  cardImgEl.addEventListener("click", function () {
    openModal(imageViewModal);
    imageEl.src = data.link;
    imageEl.alt = data.name;
    imageCaption.textContent = data.name;
  });

  return cardElement;
}

function handleEscape(evt) {
  if (evt.key === "Escape") {
    const activeModal = document.querySelector(".modal_is-opened");
    if (activeModal) {
      closeModal(activeModal);
    }
  }
}

function openModal(modal) {
  modal.classList.add("modal_is-opened");
  modal.addEventListener("click", closeModalOnOverlay);
  document.addEventListener("keydown", handleEscape);
}

function closeModal(modal) {
  modal.classList.remove("modal_is-opened");
  modal.removeEventListener("click", closeModalOnOverlay);
  document.removeEventListener("keydown", handleEscape);
}

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

function closeModalOnOverlay(evt) {
  if (!evt.target.classList.contains(".modal")) {
    closeModal(evt.target);
  }
}

function handleEditProfileSubmit(evt) {
  profileNameEl.textContent = editProfileNameInput.value;
  profileDescriptionEl.textContent = editProfileDescriptionInput.value;
  evt.preventDefault();
  closeModal(editProfileModal);
}
editProfileForm.addEventListener("submit", handleEditProfileSubmit);

function handleAddCardSubmit(evt) {
  const cardElement = getCardElement({
    name: newPostNameInput.value,
    link: newPostLinkInput.value,
  });
  cardList.prepend(cardElement);
  evt.preventDefault();
  disableButton(postSubmitBtn, settings);
  closeModal(newPostModal);
  newPostCardForm.reset();
}

newPostCardForm.addEventListener("submit", handleAddCardSubmit);

enableValidation(settings);
