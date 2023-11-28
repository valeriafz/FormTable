const fs = require('fs/promises');

const filePath = 'users.json';

function readUsersData() {
  try {
    const data = fs.readFileSync(filePath, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error(`Error reading ${filePath}:`, error.message);
    throw error;
  }
}

function addUser() {
  try {
    let usersData = readUsersData();

    const newUser = {
      id: usersData.users.length + 1,
      lastname: document.getElementById('lastname').value,
      firstname: document.getElementById('firstname').value,
      age: document.getElementById('age').value,
      phone: document.getElementById('phone').value,
      email: document.getElementById('email').value,
      pass: document.getElementById('pass').value,
      repeatpass: document.getElementById('repeatpass').value,
    };

    usersData.users.push(newUser);

    const jsonData = JSON.stringify(usersData, null, 2);
    fs.writeFileSync(filePath, jsonData);
    console.log('User added successfully!');
  } catch (error) {
    console.error(`Error adding user to ${filePath}:`, error.message);
  }
}

function submitForm() {
  addUser();
}

document.addEventListener('DOMContentLoaded', function() {
  const form = document.getElementById('userForm');
  form.addEventListener('submit', function(event) {
    event.preventDefault();
    submitForm();
  });
});
