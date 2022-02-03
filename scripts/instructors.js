'use strict';

const viewAll = document.querySelector('#viewAll');
const instructorsHTMLData = document.querySelector('.instructorsData');
const submitInstructorBtn = document.getElementById('submit');
const updateInstructorBtn = document.getElementById('update');
const cancelUpdateBtn = document.getElementById('cancelUpdate');
const deleteInstructorBtn = document.getElementById('delete');
const cancelDeleteBtn = document.getElementById('cancelDelete');
const instructorsTableSection = document.querySelector(
  '.instructorsBackgroundImage'
);

let name = document.getElementById('name');
let age = document.getElementById('age');
let email = document.getElementById('email');
let experience = document.getElementById('experience');
let updateName = document.getElementById('updateName');
let updateAge = document.getElementById('updateAge');
let updateEmail = document.getElementById('updateEmail');
let updateExperience = document.getElementById('updateExperience');
let deleteBtn;
let currentInstructorID;

const renderInstructorData = function (data) {
  const id = data.instructorID;
  const name = data.name;
  const age = data.age;
  const email = data.email;
  const experience = data.experience;
  const html = `<tr>
  <td id="idValue">${id}</td>
  <td>${name}</td>
  <td>${age}</td>
  <td>${email}</td>
  <td>${experience}</td>
  <td>
    <i id="view" class="far fa-eye"></i>
    <i id="edit ${id}" class="far fa-edit" onclick="updateInstructorData(this);"></i>
    <i id="delete ${id}" class="far fa-trash-alt" onclick="removeInstructorData(this);"></i>
  </td>
</tr>`;
  instructorsHTMLData.insertAdjacentHTML('beforeend', html);
};

const displayInstructorsData = async function () {
  const html = `<thead>
  <td id="id">ID</td>
  <td>Name</td>
  <td>Age</td>
  <td>Email</td>
  <td>Experience</td>
  <td>Options</td>
</thead>`;
  instructorsHTMLData.innerHTML = html;
  const instructorsData = await getInstructors();
  instructorsData.forEach(instructor => {
    renderInstructorData(instructor);
  });
};

const createInstructor = async function () {
  try {
    hideButton(submitInstructorBtn);
    await addInstructor();
    successfullMessage.textContent = 'Instructor added successfully!';
    await wait(1.5);
    togglePopup();
    displayInstructorsData();
    resetCreateInstructorForm();
  } catch (error) {
    showButton(submitInstructorBtn);
    alert(error.message);
  }
};

const resetCreateInstructorForm = function () {
  name.value = '';
  age.value = '';
  email.value = '';
  experience.value = '';
  showButton(submitInstructorBtn);
  successfullMessage.textContent = '';
};

const resetDeleteInstructorForm = function () {
  showButton(deleteInstructorBtn);
  successfullDeletedMessage.textContent = '';
};

const deleteInstructorTriggered = async function () {
  try {
    hideButton(deleteInstructorBtn);
    await deleteInstructor(currentInstructorID);
    successfullDeletedMessage.textContent = 'Instructor removed successfully!';
    await wait(1.5);
    toggleDeletePopup();
    displayInstructorsData();
    resetDeleteInstructorForm();
  } catch (error) {
    showButton(deleteInstructorBtn);
    alert(error.message);
  }
};

const deleteModalPopup = function () {
  toggleDeletePopup();
};

const removeInstructorData = function (object) {
  const instructorID = object.id.split(' ')[1];
  currentInstructorID = instructorID;
  deleteModalPopup();
};

const checkFullfilledForm = function () {
  return (
    updateName.value &&
    updateAge.value &&
    updateEmail.value &&
    updateExperience.value
  );
};

const resetUpdateInstructorForm = function () {
  showButton(updateInstructorBtn);
  successfullUpdatedMessage.textContent = '';
};

const displayInstructorData = function (instructor) {
  updateName.value = instructor.name;
  updateAge.value = instructor.age;
  updateEmail.value = instructor.email;
  updateExperience.value = instructor.experience;
};

const setInstructorData = function (instructorData) {
  const instructor = {
    name: updateName.value ? updateName.value : instructorData.name,
    age: updateAge.value ? updateAge.value : instructorData.age,
    email: updateEmail.value ? updateEmail.value : instructorData.email,
    experience: updateExperience.value
      ? updateExperience.value
      : instructorData.experience,
  };
  return instructor;
};

const updateModalPopup = async function (instructorID) {
  toggleUpdatePopup();
  const instructor = await getInstructor(instructorID);
  displayInstructorData(instructor);
};

const updateInstructorData = function (object) {
  const instructorID = object.id.split(' ')[1];
  currentInstructorID = instructorID;
  updateModalPopup(instructorID);
};

const updateInstructorTriggered = async function () {
  try {
    hideButton(updateInstructorBtn);
    const instructor = await getInstructor(currentInstructorID);
    if (checkFullfilledForm()) {
      await updateInstructor(
        currentInstructorID,
        setInstructorData(instructor)
      );
    } else {
      await partiallyUpdateInstructor(
        currentInstructorID,
        setInstructorData(instructor)
      );
    }
    successfullUpdatedMessage.textContent = 'Instructor updated successfully!';
    await wait(1.5);
    toggleUpdatePopup();
    displayInstructorsData();
    resetUpdateInstructorForm();
  } catch (error) {
    showButton(updateInstructorBtn);
    alert(error.message);
  }
};

viewAll.addEventListener('click', displayInstructorsData);
submitInstructorBtn.addEventListener('click', createInstructor);
deleteInstructorBtn.addEventListener('click', deleteInstructorTriggered);
cancelDeleteBtn.addEventListener('click', toggleDeletePopup);
updateInstructorBtn.addEventListener('click', updateInstructorTriggered);
cancelUpdateBtn.addEventListener('click', toggleUpdatePopup);
