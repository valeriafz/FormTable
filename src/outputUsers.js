import json from './users.json' assert { type: 'json' };

document.addEventListener('DOMContentLoaded', () => {
  const tableBody = document.querySelector('#userTable tbody');

  json.users.forEach((user) => {
    const row = tableBody.insertRow();
    const userId = user.id || ''; 
    const idCell = row.insertCell();
    idCell.appendChild(document.createTextNode(userId));
    const propertiesOrder = ['lastname', 'firstname', 'age', 'phone', 'email', 'password', 'repeatPassword'];
    propertiesOrder.forEach((property) => {
      const cell = row.insertCell();
      cell.appendChild(document.createTextNode(user[property] || ''));
    });
  });
});
