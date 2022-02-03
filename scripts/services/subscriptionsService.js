'use strict';

const getSubscriptions = async function () {
  try {
    const subscriptionsResponse = await fetch(
      `http://localhost:1029/api/subscriptions`
    );
    const subscriptionsData = await subscriptionsResponse.json();
    return subscriptionsData;
  } catch (error) {
    console.log(
      `Error while getting the subscriptions. Error message: ${error.message}.`
    );
  }
};

const getSubscription = async function (subscriptionID) {
  try {
    const subscriptionResponse = await fetch(
      `http://localhost:1029/api/subscriptions/${subscriptionID}`
    );
    const subscriptionsData = await subscriptionResponse.json();
    return subscriptionsData;
  } catch (error) {
    `Error while getting the subscription. Error message: ${error.message}.`;
  }
};

const addSubscription = async function () {
  try {
    const subscription = {
      startDate: startDate.value,
      endDate: endDate.value,
      price: price.value,
    };
    const response = await fetch(`http://localhost:1029/api/subscriptions`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(subscription),
    });

    if (!response.ok) {
      throw new Error('Error on submiting the subscription data. Try again!');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Error on submiting the subscription data. Try again!');
  }
};

const updateSubscription = async function (subscriptionID, subscription) {
  try {
    const response = await fetch(
      `http://localhost:1029/api/subscriptions/${subscriptionID}`,
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
        body: JSON.stringify(subscription),
      }
    );
    if (!response.ok) {
      throw new Error('Error on updating the subscription data. Try again!');
    }
    await response.text();
    return response.ok;
  } catch (error) {
    throw new Error('Error on updating the subscription data. Try again!');
  }
};

const partiallyUpdateSubscription = async function (
  subscriptionID,
  subscription
) {
  try {
    const subscriptionModified = [
      {
        op: 'replace',
        path: '/startDate',
        value: subscription.startDate,
      },
      {
        op: 'replace',
        path: '/endDate',
        value: subscription.endDate,
      },
      {
        op: 'replace',
        path: '/price',
        value: subscription.price,
      },
    ];
    const response = await fetch(
      `http://localhost:1029/api/subscriptions/${subscriptionID}`,
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
        body: JSON.stringify(subscriptionModified),
      }
    );
    await response.text();
    return response.ok;
  } catch (error) {
    throw new Error(
      'Error on partially updating the subscription data. Try again!'
    );
  }
};

const deleteSubscription = async function (subscriptionID) {
  try {
    const response = await fetch(
      `http://localhost:1029/api/subscriptions/${subscriptionID}`,
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
