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

  // Moved the event listener for delete buttons here
  document.querySelectorAll('#userTable tbody').forEach(tbody => {
    tbody.addEventListener('click', event => {
      const deleteButton = event.target.closest('button[data-action="delete"]');
      if (deleteButton) {
        const userId = deleteButton.dataset.userId;
        deleteUser(userId);
      }
    });
  });
});


const createDeleteButton = (userId) => {
  const deleteButton = document.createElement('button');
  deleteButton.textContent = 'Delete';
  deleteButton.type = 'button';
  deleteButton.addEventListener('click', () => deleteUser(userId));
  return deleteButton;
};

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

  const deleteCell = row.insertCell();
  deleteCell.appendChild(createDeleteButton(user.id));
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

const deleteUser = (userId) => {
  fetch(`http://localhost:3000/users/${userId}`, {
    method: 'DELETE',
  })
  .then(() => {
    const row = tableBody.querySelector(`tr[data-id="${userId}"]`);
    if (row) {
      row.remove();
      console.log(`User with ID ${userId} deleted successfully.`);
      reindexUsers();
    }
  })
  .catch(error => console.error('Error deleting user:', error));
};

const reindexUsers = () => {
  const tableRows = document.querySelectorAll('#userTable tbody tr');
  tableRows.forEach((row, index) => {
    const userIdCell = row.cells[0];
    if (userIdCell) {
      userIdCell.textContent = index + 1;
      row.dataset.id = index + 1;
    }
  });
};
