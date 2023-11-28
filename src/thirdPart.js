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
