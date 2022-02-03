'use strict';

const getClients = async function () {
  try {
    const clientsResponse = await fetch(`http://localhost:1029/api/clients`);
    const clientsData = await clientsResponse.json();
    return clientsData;
  } catch (error) {
    console.log(
      `Error while getting the clients. Error message: ${error.message}.`
    );
  }
};

const getClient = async function (clientID) {
  try {
    const clientResponse = await fetch(
      `http://localhost:1029/api/clients/${clientID}`
    );
    const clientsData = await clientResponse.json();
    return clientsData;
  } catch (error) {
    `Error while getting the client. Error message: ${error.message}.`;
  }
};

const getClientsForClient = async function (clientID) {
  try {
    const clientsForClientResponse = await fetch(
      `http://localhost:1029/api/clients/${clientID}/clients`
    );
    const clientsForClientData = await clientsForClientResponse.json();
    return clientsForClientData;
  } catch (error) {
    console.log(
      `Error while getting the clients for client ${clientID}. Error message: ${error.message}.`
    );
  }
};

const addClient = async function () {
  try {
    const client = {
      name: String(name.value),
      age: Number(age.value),
      email: String(email.value),
    };
    const response = await fetch(`http://localhost:1029/api/clients`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(client),
    });

    if (!response.ok) {
      throw new Error('Error on submiting the client data. Try again!');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Error on submiting the client data. Try again!');
  }
};

const updateClient = async function (clientID, client) {
  try {
    const response = await fetch(
      `http://localhost:1029/api/clients/${clientID}`,
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
        body: JSON.stringify(client),
      }
    );
    if (!response.ok) {
      throw new Error('Error on updating the client data. Try again!');
    }
    await response.text();
    return response.ok;
  } catch (error) {
    throw new Error('Error on updating the client data. Try again!');
  }
};

const partiallyUpdateClient = async function (clientID, client) {
  try {
    const clientModified = [
      {
        op: 'replace',
        path: '/name',
        value: client.name,
      },
      {
        op: 'replace',
        path: '/age',
        value: client.age,
      },
      {
        op: 'replace',
        path: '/email',
        value: client.email,
      },
    ];
    const response = await fetch(
      `http://localhost:1029/api/clients/${clientID}`,
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
        body: JSON.stringify(clientModified),
      }
    );
    await response.text();
    return response.ok;
  } catch (error) {
    throw new Error('Error on partially updating the client data. Try again!');
  }
};

const deleteClient = async function (clientID) {
  try {
    const response = await fetch(
      `http://localhost:1029/api/clients/${clientID}`,
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
