import "./style.css";
import axios from "axios";

// Inject new HTML into #app
document.querySelector("#app").innerHTML = `
  <div class="container">
    <h1>User Management</h1>
    
    <form id="userForm">
      <input type="text" id="name" placeholder="Enter name" required />
      <input type="email" id="email" placeholder="Enter email" required />
      <button type="submit">Add User</button>
    </form>

    <table id="userTable" border="1" cellpadding="8" style="margin-top:20px; width:100%;">
      <thead>
        <tr>
          <th>#</th>
          <th>Name</th>
          <th>Email</th>
        </tr>
      </thead>
      <tbody></tbody>
    </table>
  </div>
`;

// Select DOM elements
const form = document.querySelector("#userForm");
const nameInput = document.querySelector("#name");
const emailInput = document.querySelector("#email");
const userTable = document.querySelector("#userTable tbody");

// Function to fetch and display users
async function fetchUsers() {
  try {
    const res = await axios.get("http://localhost:3000/api/user");
    const users = res.data;

    // Clear old rows
    userTable.innerHTML = "";

    // Populate table
    users.forEach((user, index) => {
      const row = document.createElement("tr");

      row.innerHTML = `
        <td>${index + 1}</td>
        <td>${user.name}</td>
        <td>${user.email}</td>
      `;

      userTable.appendChild(row);
    });
  } catch (err) {
    console.error("Error fetching users:", err);
  }
}

// Handle form submit
form.addEventListener("submit", async (e) => {
  e.preventDefault();

  const name = nameInput.value.trim();
  const email = emailInput.value.trim();

  if (!name || !email) {
    alert("Both fields are required!");
    return;
  }

  try {
    await axios.post("http://localhost:3000/api/addUser", { name, email });
    nameInput.value = "";
    emailInput.value = "";

    // Refresh user list
    fetchUsers();
  } catch (err) {
    console.error("Error adding user:", err);
  }
});

// Initial fetch when page loads
fetchUsers();
