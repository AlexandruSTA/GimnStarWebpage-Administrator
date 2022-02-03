'use strict';

const getInstructors = async function () {
  try {
    const instructorsResponse = await fetch(
      `http://localhost:1029/api/instructors`
    );
    const instructorsData = await instructorsResponse.json();
    return instructorsData;
  } catch (error) {
    console.log(
      `Error while getting the instructors. Error message: ${error.message}.`
    );
  }
};

const getInstructor = async function (instructorID) {
  try {
    const instructorResponse = await fetch(
      `http://localhost:1029/api/instructors/${instructorID}`
    );
    const instructorsData = await instructorResponse.json();
    return instructorsData;
  } catch (error) {
    `Error while getting the instructor. Error message: ${error.message}.`;
  }
};

const getClientsForInstructor = async function (instructorID) {
  try {
    const clientsForInstructorResponse = await fetch(
      `http://localhost:1029/api/instructors/${instructorID}/clients`
    );
    const clientsForInstructorData = await clientsForInstructorResponse.json();
    return clientsForInstructorData;
  } catch (error) {
    console.log(
      `Error while getting clients for instructor with id ${instructorID}. Error message: ${error.message}.`
    );
  }
};

const addInstructor = async function () {
  try {
    const instructor = {
      name: String(name.value),
      age: Number(age.value),
      email: String(email.value),
      experience: Number(experience.value),
    };
    const response = await fetch(`http://localhost:1029/api/instructors`, {
      method: 'POST',
      mode: 'cors',
      cache: 'no-cache',
      credentials: 'same-origin',
      headers: {
        'Content-Type': 'application/json',
      },
      redirect: 'follow',
      referrerPolicy: 'no-referrer',
      body: JSON.stringify(instructor),
    });

    if (!response.ok) {
      throw new Error('Error on submiting the instructor data. Try again!');
    }
    return await response.json();
  } catch (error) {
    throw new Error('Error on submiting the instructor data. Try again!');
  }
};

const updateInstructor = async function (instructorID, instructor) {
  try {
    const response = await fetch(
      `http://localhost:1029/api/instructors/${instructorID}`,
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
        body: JSON.stringify(instructor),
      }
    );
    if (!response.ok) {
      throw new Error('Error on updating the instructor data. Try again!');
    }
    await response.text();
    return response.ok;
  } catch (error) {
    throw new Error('Error on updating the instructor data. Try again!');
  }
};

const partiallyUpdateInstructor = async function (instructorID, instructor) {
  try {
    const instructorModified = [
      {
        op: 'replace',
        path: '/name',
        value: instructor.name,
      },
      {
        op: 'replace',
        path: '/age',
        value: instructor.age,
      },
      {
        op: 'replace',
        path: '/email',
        value: instructor.email,
      },
      {
        op: 'replace',
        path: '/experience',
        value: instructor.experience,
      },
    ];
    const response = await fetch(
      `http://localhost:1029/api/instructors/${instructorID}`,
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
        body: JSON.stringify(instructorModified),
      }
    );
    if (!response.ok) {
      throw new Error('Error on updating the instructor data. Try again!');
    }
    await response.text();
    return response.ok;
  } catch (error) {
    throw new Error(
      'Error on partially updating the instructor data. Try again!'
    );
  }
};

const deleteInstructor = async function (instructorID) {
  try {
    const response = await fetch(
      `http://localhost:1029/api/instructors/${instructorID}`,
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
