// script.js

const tableBody = document.querySelector('#userTable tbody');

document.addEventListener('DOMContentLoaded', () => {
  fetch('http://localhost:3000/users')
    .then(response => response.json())
    .then(users => {
      users.forEach(user => {
        addRow(user);
      });
    })
    .catch(error => console.error('Error fetching data:', error));
});

function addRow(user) {
  const row = tableBody.insertRow();
  row.setAttribute('data-id', user.id);

  const propertiesOrder = [
    "id",
    "lastname",
    "firstname",
    "age",
    "phone",
    "email",
    "password",
    "repeatPassword",
  ];

  propertiesOrder.forEach(property => {
    const cell = row.insertCell();
    cell.appendChild(document.createTextNode(user[property] || ""));
  });

  const editCell = row.insertCell();
  const editButton = document.createElement('button');
  editButton.textContent = 'Edit';
  editButton.type = 'button';
  editButton.addEventListener('click', () => editForm(user));
  editCell.appendChild(editButton);
}

function editForm(user) {
  const editForm = document.createElement('form');

  const propertiesOrder = [
    "lastname",
    "firstname",
    "age",
    "phone",
    "email",
    "password",
    "repeatPassword",
  ];

  propertiesOrder.forEach(property => {
    const label = document.createElement('label');
    label.for = property;
    label.textContent = property.charAt(0).toUpperCase() + property.slice(1);

    const input = document.createElement('input');
    input.type = 'text';
    input.id = property;
    input.name = property;
    input.value = user[property];

    editForm.appendChild(label);
    editForm.appendChild(input);
  });

  const saveButton = document.createElement('button');
  saveButton.type = 'button';
  saveButton.textContent = 'Save';
  saveButton.addEventListener('click', () => saveChanges(user, editForm));

  editForm.appendChild(saveButton);

  const row = tableBody.querySelector(`tr[data-id="${user.id}"]`);
  row.innerHTML = '';
  const editCell = row.insertCell();
  editCell.colSpan = propertiesOrder.length + 1;
  editCell.appendChild(editForm);
}

function saveChanges(user, editForm) {
  const row = tableBody.querySelector(`tr[data-id="${user.id}"]`);
  if (!row) {
    console.error('Row not found for user:', user);
    return;
  }

  const cells = Array.from(row.cells);
  if (!cells || cells.length === 0) {
    console.error('Cells not found for user:', user);
    return;
  }

  editForm.querySelectorAll('input').forEach((input, index) => {
    const propertyName = input.id;
    const newValue = input.value;

    if (index < cells.length) {
      cells[index].textContent = newValue;
      user[propertyName] = newValue;
    } else {
      console.error('Cell not found for user:', user, 'at index:', index);
    }
  });

  // Send a request to update the user on the server
  fetch(`http://localhost:3000/users/${user.id}`, {
    method: 'PUT',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(user),
  })
  .then(response => response.json())
  .then(updatedUser => console.log('User data saved:', updatedUser))
  .catch(error => console.error('Error saving data:', error));
}
