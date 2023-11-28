     async function submitForm() {
        const form = document.getElementById("userForm");
        const formData = new FormData(form);

        const user = {};
        formData.forEach((value, key) => {
          user[key] = value;
        });

        const response = await fetch("http://localhost:3000/users", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({ users: [user] }),
        });

        if (response.ok) {
          updateTable();
        } else {
          console.error("Error submitting form");
        }
      }

      async function updateTable() {
        const response = await fetch("http://localhost:3000/users");
        const data = await response.json();

        const tableBody = document.querySelector("#userTable tbody");
        tableBody.innerHTML = "";

        data.users.forEach((user) => {
          const row = tableBody.insertRow();
          for (const key in user) {
            const cell = row.insertCell();
            cell.appendChild(document.createTextNode(user[key]));
          }
        });
      }