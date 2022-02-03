'use strict';

const getActivities = async function () {
  try {
    const activitiesResponse = await fetch(
      `http://localhost:1029/api/activities`
    );
    const activitiesData = await activitiesResponse.json();
    return activitiesData;
  } catch (error) {
    console.log(
      `Error while getting the activities for subscription ${subscriptionID}. Error message: ${error.message}.`
    );
  }
};

const getActivity = async function (activityID) {
  try {
    const activityResponse = await fetch(
      `http://localhost:1029/api/activities/${activityID}`
    );
    const activityData = await activityResponse.json();
    return activityData;
  } catch (error) {
    `Error while getting the activity. Error message: ${error.message}.`;
  }
};

const getActivitiesForSubscription = async function (subscriptionID) {
  try {
    const activitiesForSubscriptionResponse = await fetch(
      `http://localhost:1029/api/subscriptions/${subscriptionID}/activities`
    );
    const activitiesForSubscriptionData =
      await activitiesForSubscriptionResponse.json();
    return activitiesForSubscriptionData;
  } catch (error) {
    console.log(
      `Error while getting the activities for subscription ${subscriptionID}. Error message: ${error.message}.`
    );
  }
};

const addActivity = async function () {
  try {
    const activity = {
      name: name.value,
      description: description.value,
      startTime: String(startTime.value),
      endTime: String(endTime.value),
      intensityLevel: intensityLevel.value,
    };
    const response = await fetch(`http://localhost:1029/api/activities`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(activity),
    });
    if (!response.ok) {
      throw new Error('Error on submiting the activity data. Try again!');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Error on submiting the activity data. Try again!');
  }
};

const updateActivity = async function (activityID, activity) {
  try {
    const response = await fetch(
      `http://localhost:1029/api/activities/${activityID}`,
      {
        method: 'PUT',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(activity),
      }
    );
    if (!response.ok) {
      throw new Error('Error on updating the activity data. Try again!');
    }
    await response.text();
    return response.ok;
  } catch (error) {
    throw new Error('Error on updating the activity data. Try again!');
  }
};

const partiallyUpdateActivity = async function (activityID, activity) {
  try {
    const activityModified = [
      {
        op: 'replace',
        path: '/name',
        value: activity.name,
      },
      {
        op: 'replace',
        path: '/description',
        value: activity.description,
      },
      {
        op: 'replace',
        path: '/startTime',
        value: activity.startTime,
      },
      {
        op: 'replace',
        path: '/endTime',
        value: activity.endTime,
      },
      {
        op: 'replace',
        path: '/intensityLevel',
        value: activity.intensityLevel,
      },
    ];
    const response = await fetch(
      `http://localhost:1029/api/activities/${activityID}`,
      {
        method: 'PATCH',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
        body: JSON.stringify(activityModified),
      }
    );
    await response.text();
    return response.ok;
  } catch (error) {
    throw new Error(
      'Error on partially updating the activity data. Try again!'
    );
  }
};

const deleteActivity = async function (activityID) {
  try {
    const response = await fetch(
      `http://localhost:1029/api/activities/${activityID}`,
      {
        method: 'DELETE',
        mode: 'cors',
        cache: 'no-cache',
        credentials: 'same-origin',
        headers: {
          'Content-Type': 'application/json',
        },
        redirect: 'follow',
        referrerPolicy: 'no-referrer',
      }
    );
    await response.text();
    return response.ok;
  } catch (error) {
    throw error;
  }
};
