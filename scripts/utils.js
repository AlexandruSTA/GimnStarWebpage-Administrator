'use strict';

const blur = document.getElementById('blur');
const addBtn = document.getElementById('add');
const cancelBtn = document.getElementById('cancel');
const popup = document.getElementById('popup');
const popupDelete = document.getElementById('popupDelete');
const popupUpdate = document.getElementById('popupUpdate');
const successfullMessage = document.getElementById('successfullMessage');
const successfullUpdatedMessage = document.getElementById(
  'successfullUpdatedMessage'
);
const successfullDeletedMessage = document.getElementById(
  'successfullDeletedMessage'
);

const wait = function (seconds) {
  return new Promise(function (resolve) {
    setTimeout(resolve, seconds * 1000);
  });
};

const togglePopup = function () {
  blur.classList.toggle('active');
  popup.classList.toggle('activePopup');
};

const toggleDeletePopup = function () {
  blur.classList.toggle('active');
  popupDelete.classList.toggle('activePopup');
};

const toggleUpdatePopup = function () {
  blur.classList.toggle('active');
  popupUpdate.classList.toggle('activePopup');
};

const hideButton = function (button) {
  button.style.display = 'none';
};
const showButton = function (button) {
  button.style.display = 'flex';
};

addBtn.addEventListener('click', togglePopup);
cancelBtn.addEventListener('click', togglePopup);
