'use strict';

const viewAll = document.querySelector('#viewAll');
const clientsHTMLData = document.querySelector('.clientsData');
const submitClientBtn = document.getElementById('submit');
const updateClientBtn = document.getElementById('update');
const cancelUpdateBtn = document.getElementById('cancelUpdate');
const deleteClientBtn = document.getElementById('delete');
const cancelDeleteBtn = document.getElementById('cancelDelete');
const clientsTableSection = document.querySelector('.clientsBackgroundImage');

let name = document.getElementById('name');
let age = document.getElementById('age');
let email = document.getElementById('email');
let updateName = document.getElementById('updateName');
let updateAge = document.getElementById('updateAge');
let updateEmail = document.getElementById('updateEmail');
let deleteBtn;
let currentClientID;

const renderClientData = function (data) {
  const id = data.clientID;
  const name = data.name;
  const age = data.age;
  const email = data.email;
  const html = `<tr>
  <td id="idValue">${id}</td>
  <td>${name}</td>
  <td>${age}</td>
  <td>${email}</td>
  <td>
    <i id="view" class="far fa-eye"></i>
    <i id="edit ${id}" class="far fa-edit" onclick="updateClientData(this);"></i>
    <i id="delete ${id}" class="far fa-trash-alt" onclick="removeClientData(this);"></i>
  </td>
</tr>`;
  clientsHTMLData.insertAdjacentHTML('beforeend', html);
};

const displayClientsData = async function () {
  const html = `<thead>
  <td id="id">ID</td>
  <td>Name</td>
  <td>Age</td>
  <td>Email</td>
  <td>Options</td>
</thead>`;
  clientsHTMLData.innerHTML = html;
  const clientsData = await getClients();
  clientsData.forEach(client => {
    renderClientData(client);
  });
};

const createClient = async function () {
  try {
    hideButton(submitClientBtn);
    await addClient();
    successfullMessage.textContent = 'Client added successfully!';
    await wait(1.5);
    togglePopup();
    displayClientsData();
    resetCreateClientForm();
  } catch (error) {
    showButton(submitClientBtn);
    alert(error.message);
  }
};

const resetCreateClientForm = function () {
  name.value = '';
  age.value = '';
  email.value = '';
  showButton(submitClientBtn);
  successfullMessage.textContent = '';
};

const resetDeleteClientForm = function () {
  showButton(deleteClientBtn);
  successfullDeletedMessage.textContent = '';
};

const deleteClientTriggered = async function () {
  try {
    hideButton(deleteClientBtn);
    await deleteClient(currentClientID);
    successfullDeletedMessage.textContent = 'Client removed successfully!';
    await wait(1.5);
    toggleDeletePopup();
    displayClientsData();
    resetDeleteClientForm();
  } catch (error) {
    showButton(deleteClientBtn);
    alert(error.message);
  }
};

const deleteModalPopup = function () {
  toggleDeletePopup();
};

const removeClientData = function (object) {
  const clientID = object.id.split(' ')[1];
  currentClientID = clientID;
  deleteModalPopup();
};

const checkFullfilledForm = function () {
  return updateName.value && updateAge.value && updateEmail.value;
};

const resetUpdateClientForm = function () {
  showButton(updateClientBtn);
  successfullUpdatedMessage.textContent = '';
};

const displayClientData = function (client) {
  updateName.value = client.name;
  updateAge.value = client.age;
  updateEmail.value = client.email;
};

const setClientData = function (clientData) {
  const client = {
    name: updateName.value ? updateName.value : clientData.name,
    age: updateAge.value ? updateAge.value : clientData.age,
    email: updateEmail.value ? updateEmail.value : clientData.email,
  };
  return client;
};

const updateModalPopup = async function (clientID) {
  toggleUpdatePopup();
  const client = await getClient(clientID);
  displayClientData(client);
};

const updateClientData = function (object) {
  const clientID = object.id.split(' ')[1];
  currentClientID = clientID;
  updateModalPopup(clientID);
};

const updateClientTriggered = async function () {
  try {
    hideButton(updateClientBtn);
    const client = await getClient(currentClientID);
    if (checkFullfilledForm()) {
      await updateClient(currentClientID, setClientData(client));
    } else {
      await partiallyUpdateClient(currentClientID, setClientData(client));
    }
    successfullUpdatedMessage.textContent = 'Client updated successfully!';
    await wait(1.5);
    toggleUpdatePopup();
    displayClientsData();
    resetUpdateClientForm();
  } catch (error) {
    showButton(updateClientBtn);
    alert(error.message);
  }
};

viewAll.addEventListener('click', displayClientsData);
submitClientBtn.addEventListener('click', createClient);
deleteClientBtn.addEventListener('click', deleteClientTriggered);
cancelDeleteBtn.addEventListener('click', toggleDeletePopup);
updateClientBtn.addEventListener('click', updateClientTriggered);
cancelUpdateBtn.addEventListener('click', toggleUpdatePopup);
