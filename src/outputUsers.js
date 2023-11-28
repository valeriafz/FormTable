import json from "./users.json" assert { type: "json" };

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

const editForm = (event) => {
  const row = event.target.closest("tr");
  const cells = row.cells;
  
  for (let i = 1; i < cells.length - 1; i++) {
    const currentData = cells[i].textContent;
    
    const input = document.createElement("input");
    input.type = "text";
    input.value = currentData;
    cells[i].innerHTML = "";
    cells[i].appendChild(input);
  }

  const saveButton = document.createElement("button");
  saveButton.textContent = "Save";
  saveButton.type = "button";
  saveButton.addEventListener("click", saveChanges.bind(null, row));
  cells[cells.length - 1].innerHTML = "";
  cells[cells.length - 1].appendChild(saveButton);
};

const saveChanges = (row) => {
  const cells = row.cells;

  for (let i = 1; i < cells.length - 1; i++) {
    const inputValue = cells[i].querySelector("input").value;
    cells[i].innerHTML = "";
    cells[i].appendChild(document.createTextNode(inputValue));
  }

  cells[cells.length - 1].innerHTML = "";
  cells[cells.length - 1].appendChild(createEditButton());
};