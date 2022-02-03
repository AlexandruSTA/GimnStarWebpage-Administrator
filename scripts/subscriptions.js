'use strict';

const viewAll = document.querySelector('#viewAll');
const subscriptionsHTMLData = document.querySelector('.subscriptionsData');
const submitSubscriptionBtn = document.getElementById('submit');
const updateSubscriptionBtn = document.getElementById('update');
const cancelUpdateBtn = document.getElementById('cancelUpdate');
const deleteSubscriptionBtn = document.getElementById('delete');
const cancelDeleteBtn = document.getElementById('cancelDelete');
const subscriptionsTableSection = document.querySelector(
  '.subscriptionsBackgroundImage'
);

let startDate = document.getElementById('startDate');
let endDate = document.getElementById('endDate');
let price = document.getElementById('price');
let updateStartDate = document.getElementById('updateStartDate');
let updateEndDate = document.getElementById('updateEndDate');
let updateDaysOfSubscription = document.getElementById(
  'updateDaysOfSubscription'
);
let updatePrice = document.getElementById('updatePrice');
let deleteBtn;
let currentSubscriptionID;

const renderSubscriptionData = function (data) {
  const id = data.subscriptionID;
  const startDate = data.startDate;
  const endDate = data.endDate;
  const daysOfSubscription = data.daysOfSubscription;
  const price = data.price;
  const html = `<tr>
  <td id="idValue">${id}</td>
  <td>${startDate}</td>
  <td>${endDate}</td>
  <td>${daysOfSubscription}</td>
  <td>${price}</td>
  <td>
    <i id="view" class="far fa-eye"></i>
    <i id="edit ${id}" class="far fa-edit" onclick="updateSubscriptionData(this);"></i>
    <i id="delete ${id}" class="far fa-trash-alt" onclick="removeSubscriptionData(this);"></i>
  </td>
</tr>`;
  subscriptionsHTMLData.insertAdjacentHTML('beforeend', html);
};

const displaySubscriptionsData = async function () {
  const html = `<thead>
  <td id="id">ID</td>
  <td>Start Date</td>
  <td>End Date</td>
  <td>Days of Subscription</td>
  <td>Price</td>
  <td>Options</td>
</thead>`;
  subscriptionsHTMLData.innerHTML = html;
  const subscriptionsData = await getSubscriptions();
  subscriptionsData.forEach(subscription => {
    renderSubscriptionData(subscription);
  });
};

const createSubscription = async function () {
  try {
    hideButton(submitSubscriptionBtn);
    await addSubscription();
    successfullMessage.textContent = 'Subscription added successfully!';
    await wait(1.5);
    togglePopup();
    displaySubscriptionsData();
    resetCreateSubscriptionForm();
  } catch (error) {
    showButton(submitSubscriptionBtn);
    alert(error.message);
  }
};

const resetCreateSubscriptionForm = function () {
  startDate.value = '';
  endDate.value = '';
  price.value = '';
  showButton(submitSubscriptionBtn);
  successfullMessage.textContent = '';
};

const resetDeleteSubscriptionForm = function () {
  showButton(deleteSubscriptionBtn);
  successfullDeletedMessage.textContent = '';
};

const deleteSubscriptionTriggered = async function () {
  try {
    hideButton(deleteSubscriptionBtn);
    await deleteSubscription(currentSubscriptionID);
    successfullDeletedMessage.textContent =
      'Subscription removed successfully!';
    await wait(1.5);
    toggleDeletePopup();
    displaySubscriptionsData();
    resetDeleteSubscriptionForm();
  } catch (error) {
    showButton(deleteSubscriptionBtn);
    alert(error.message);
  }
};

const deleteModalPopup = function () {
  toggleDeletePopup();
};

const removeSubscriptionData = function (object) {
  const subscriptionID = object.id.split(' ')[1];
  currentSubscriptionID = subscriptionID;
  deleteModalPopup();
};

const checkFullfilledForm = function () {
  return updateStartDate.value && updateEndDate.value && updatePrice.value;
};

const resetUpdateSubscriptionForm = function () {
  showButton(updateSubscriptionBtn);
  successfullUpdatedMessage.textContent = '';
};

const displaySubscriptionData = function (subscription) {
  updateStartDate.value = subscription.startDate;
  updateEndDate.value = subscription.endDate;
  updatePrice.value = subscription.price;
};

const setSubscriptionData = function (subscriptionData) {
  const subscription = {
    startDate: updateStartDate.value
      ? updateStartDate.value
      : subscriptionData.startDate,
    endDate: updateEndDate.value
      ? updateEndDate.value
      : subscriptionData.endDate,
    price: updatePrice.value ? updatePrice.value : subscriptionData.price,
  };
  return subscription;
};

const updateModalPopup = async function (subscriptionID) {
  toggleUpdatePopup();
  const subscription = await getSubscription(subscriptionID);
  displaySubscriptionData(subscription);
};

const updateSubscriptionData = function (object) {
  const subscriptionID = object.id.split(' ')[1];
  currentSubscriptionID = subscriptionID;
  updateModalPopup(subscriptionID);
};

const updateSubscriptionTriggered = async function () {
  try {
    hideButton(updateSubscriptionBtn);
    const subscription = await getSubscription(currentSubscriptionID);
    if (checkFullfilledForm()) {
      await updateSubscription(
        currentSubscriptionID,
        setSubscriptionData(subscription)
      );
    } else {
      await partiallyUpdateSubscription(
        currentSubscriptionID,
        setSubscriptionData(subscription)
      );
    }
    successfullUpdatedMessage.textContent =
      'Subscription updated successfully!';
    await wait(1.5);
    toggleUpdatePopup();
    displaySubscriptionsData();
    resetUpdateSubscriptionForm();
  } catch (error) {
    showButton(updateSubscriptionBtn);
    alert(error.message);
  }
};

viewAll.addEventListener('click', displaySubscriptionsData);
submitSubscriptionBtn.addEventListener('click', createSubscription);
deleteSubscriptionBtn.addEventListener('click', deleteSubscriptionTriggered);
cancelDeleteBtn.addEventListener('click', toggleDeletePopup);
updateSubscriptionBtn.addEventListener('click', updateSubscriptionTriggered);
cancelUpdateBtn.addEventListener('click', toggleUpdatePopup);
