"use strict"
const capitalizeInput = (inputElement) => {
    let inputValue = inputElement.value;

    inputValue = inputValue.replace(/[^a-zA-Z-]/g, '');

    inputValue = inputValue.toLowerCase().replace(/(?:^|(?<=-))([a-zA-Z])/g, (match, group) => group.toUpperCase());

    inputElement.value = inputValue;
  };

  document.getElementById('lastname').addEventListener('input', (event) => {
    capitalizeInput(event.target);
  });

  document.getElementById('firstname').addEventListener('input', (event) => {
    capitalizeInput(event.target);
  });


   const populateAgeOptions = () => {
    const selectElement = document.getElementById('age');


    selectElement.innerHTML = '';

  
    const defaultOption = document.createElement('option');
    defaultOption.value = '';
    defaultOption.text = 'Select Age';
    selectElement.appendChild(defaultOption);

   
    for (let age = 12; age <= 99; age++) {
      const option = document.createElement('option');
      option.value = age;
      option.text = age;
      selectElement.appendChild(option);
    }
  };

  populateAgeOptions();