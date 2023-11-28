// import json from './users.json' assert { type: 'json' };

// document.addEventListener('DOMContentLoaded', () => {
//   const tableBody = document.querySelector('#userTable tbody');

//   json.users.forEach((user) => {
//     const row = tableBody.insertRow();
//     const userId = user.id || '';
//     const idCell = row.insertCell();
//     idCell.appendChild(document.createTextNode(userId));
//     const propertiesOrder = ['lastname', 'firstname', 'age', 'phone', 'email', 'password', 'repeatPassword'];
//     propertiesOrder.forEach((property) => {
//       const cell = row.insertCell();
//       cell.appendChild(document.createTextNode(user[property] || ''));
//     });
//   });
// });

// implemented this bs in ur code but kept it above

import json from "./users.json" assert { type: "json" };

const editForm = () => {
  // asta e doar placeholder, deja inlocuieste cu functia de edit
  alert("Edit button clicked!");
};
const createEditButton = () => {
  const editButton = document.createElement("button");
  editButton.textContent = "Edit";
  editButton.type = "button";
  editButton.addEventListener("click", editForm);
  return editButton;
};

const addRow = (user) => {
  const tableBody = document.querySelector("#userTable tbody");
  const row = tableBody.insertRow();

  const userId = user.id || "";
  const idCell = row.insertCell();
  idCell.appendChild(document.createTextNode(userId));

  const propertiesOrder = [
    "lastname",
    "firstname",
    "age",
    "phone",
    "email",
    "password",
    "repeatPassword",
  ];
  propertiesOrder.forEach((property) => {
    const cell = row.insertCell();
    cell.appendChild(document.createTextNode(user[property] || ""));
  });

  const editButtonCell = row.insertCell();
  editButtonCell.appendChild(createEditButton());
};

document.addEventListener("DOMContentLoaded", () => {
  json.users.forEach((user) => {
    addRow(user);
  });
});
