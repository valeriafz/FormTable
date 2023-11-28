import json from './users.json' assert { type: 'json' };

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#userTable tbody');

  json.users.forEach((user) => {
    const row = tableBody.insertRow();
    for (const key in user) {
      const cell = row.insertCell();
      cell.appendChild(document.createTextNode(user[key]));
    }
  });
});

document.addEventListener('DOMContentLoaded', () => {
  updateTable();

  const form = document.getElementById('userForm');
  form.addEventListener('submit', (event) => {
    event.preventDefault(); 

    const formData = new FormData(form);
    const user = {};

    formData.forEach((value, key) => {
      user[key] = value;
    });

    json.users.push(user); 

    fetch('http://localhost:3000/users', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(json),
    })
      .then((response) => {
        if (response.ok) {
          updateTable();
        } else {
          console.error('Error submitting form');
        }
      });
  });
  function updateTable() {
  const tableBody = document.querySelector('#userTable tbody');
  tableBody.innerHTML = '';

  json.users.forEach((user) => {
    const row = tableBody.insertRow();

    const fields = ['lastname', 'firstname', 'age', 'phone', 'email', 'pass', 'repeatpass'];

    fields.forEach((field) => {
      const cell = row.insertCell();
      cell.appendChild(document.createTextNode(user[field]));
    });
  });
}
});
