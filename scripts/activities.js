'use strict';

const viewAll = document.querySelector('#viewAll');
const activitiesHTMLData = document.querySelector('.activitiesData');
const submitActivityBtn = document.getElementById('submit');
const updateActivityBtn = document.getElementById('update');
const cancelUpdateBtn = document.getElementById('cancelUpdate');
const deleteActivityBtn = document.getElementById('delete');
const cancelDeleteBtn = document.getElementById('cancelDelete');
const activitiesTableSection = document.querySelector(
  '.activitiesBackgroundImage'
);

let name = document.getElementById('name');
let description = document.getElementById('description');
let startTime = document.getElementById('startTime');
let endTime = document.getElementById('endTime');
let intensityLevel = document.getElementById('intensityLevel');
let updateName = document.getElementById('updateName');
let updateDescription = document.getElementById('updateDescription');
let updateStartTime = document.getElementById('updateStartTime');
let updateEndTime = document.getElementById('updateEndTime');
let updateIntensityLevel = document.getElementById('updateIntensityLevel');
let deleteBtn;
let currentActivityID;

const renderActivityData = function (data) {
  const id = data.activityID;
  const name = data.name;
  const description = data.description;
  const startTime = data.startTime;
  const endTime = data.endTime;
  const duration = data.duration;
  const intensityLevel = data.intensityLevel;
  const html = `<tr>
  <td id="idValue">${id}</td>
  <td>${name}</td>
  <td>${description}</td>
  <td>${startTime}</td>
  <td>${endTime}</td>
  <td>${duration}</td>
  <td>${intensityLevel}</td>
  <td>
    <i id="view" class="far fa-eye"></i>
    <i id="edit ${id}" class="far fa-edit" onclick="updateActivityData(this);"></i>
    <i id="delete ${id}" class="far fa-trash-alt" onclick="removeActivityData(this);"></i>
  </td>
</tr>`;
  activitiesHTMLData.insertAdjacentHTML('beforeend', html);
};

const displayActivitiesData = async function () {
  const html = `<thead>
  <td id="id">ID</td>
  <td>Name</td>
  <td>Description</td>
  <td>Start Time</td>
  <td>End Time</td>
  <td>Duration</td>
  <td>Intensity Level</td>
  <td>Options</td>
</thead>`;
  activitiesHTMLData.innerHTML = html;
  const activitiesData = await getActivities();
  activitiesData.forEach(activity => {
    renderActivityData(activity);
  });
};

const createActivity = async function () {
  try {
    hideButton(submitActivityBtn);
    await addActivity();
    successfullMessage.textContent = 'Activity added successfully!';
    await wait(1.5);
    togglePopup();
    displayActivitiesData();
    resetCreateActivityForm();
  } catch (error) {
    showButton(submitActivityBtn);
    alert(error.message);
  }
};

const resetCreateActivityForm = function () {
  name.value = '';
  description.value = '';
  startTime.value = '';
  endTime.value = '';
  intensityLevel.value = '';
  showButton(submitActivityBtn);
  successfullMessage.textContent = '';
};

const resetDeleteActivityForm = function () {
  showButton(deleteActivityBtn);
  successfullDeletedMessage.textContent = '';
};

const deleteActivityTriggered = async function () {
  try {
    hideButton(deleteActivityBtn);
    await deleteActivity(currentActivityID);
    successfullDeletedMessage.textContent = 'Activity removed successfully!';
    await wait(1.5);
    toggleDeletePopup();
    displayActivitiesData();
    resetDeleteActivityForm();
  } catch (error) {
    showButton(deleteActivityBtn);
    alert(error.message);
  }
};
const deleteModalPopup = function () {
  toggleDeletePopup();
};

const removeActivityData = function (object) {
  const activityID = object.id.split(' ')[1];
  currentActivityID = activityID;
  deleteModalPopup();
};

const checkFullfilledForm = function () {
  return (
    updateName.value &&
    updateDescription.value &&
    updateStartTime.value &&
    updateEndTime.value &&
    updateIntensityLevel.value
  );
};

const resetUpdateActivityForm = function () {
  showButton(updateActivityBtn);
  successfullUpdatedMessage.textContent = '';
};

const displayActivityData = function (activity) {
  updateName.value = activity.name;
  updateDescription.value = activity.description;
  updateStartTime.value = activity.startTime;
  updateEndTime.value = activity.endTime;
  updateIntensityLevel.value = activity.intensityLevel;
};

const setActivityData = function (activityData) {
  const activity = {
    name: updateName.value ? updateName.value : activityData.name,
    description: updateDescription.value
      ? updateDescription.value
      : activityData.description,
    startTime: updateStartTime.value
      ? updateStartTime.value
      : activityData.startTime,
    endTime: updateEndTime.value ? updateEndTime.value : activityData.endTime,
    intensityLevel: updateIntensityLevel.value
      ? updateIntensityLevel.value
      : activityData.intensityLevel,
  };
  return activity;
};

const updateModalPopup = async function (activityID) {
  toggleUpdatePopup();
  const activity = await getActivity(activityID);
  displayActivityData(activity);
};

const updateActivityData = function (object) {
  const activityID = object.id.split(' ')[1];
  currentActivityID = activityID;
  updateModalPopup(activityID);
};

const updateActivityTriggered = async function () {
  try {
    hideButton(updateActivityBtn);
    const activity = await getActivity(currentActivityID);
    if (checkFullfilledForm()) {
      await updateActivity(currentActivityID, setActivityData(activity));
    } else {
      await partiallyUpdateActivity(
        currentActivityID,
        setActivityData(activity)
      );
    }
    successfullUpdatedMessage.textContent = 'Activity updated successfully!';
    await wait(1.5);
    toggleUpdatePopup();
    displayActivitiesData();
    resetUpdateActivityForm();
  } catch (error) {
    showButton(updateActivityBtn);
    alert(error.message);
  }
};

viewAll.addEventListener('click', displayActivitiesData);
submitActivityBtn.addEventListener('click', createActivity);
deleteActivityBtn.addEventListener('click', deleteActivityTriggered);
cancelDeleteBtn.addEventListener('click', toggleDeletePopup);
updateActivityBtn.addEventListener('click', updateActivityTriggered);
cancelUpdateBtn.addEventListener('click', toggleUpdatePopup);
