import express from "express";
import cors from "cors";

const app = express();
app.use(cors());
app.use(express.json());

// sample API endpoint
app.get("/api/message", (req, res) => {
  res.json({ message: "Hello from backend!" });
});

// In-memory user storage
let users = [];

// POST: Add user
app.post("/api/addUser", (req, res) => {
  const { name, email } = req.body;

  if (!name || !email) {
    return res.status(400).json({ error: "Name and Email are required" });
  }

  const newUser = { name, email };
  users.push(newUser);

  res.json({ message: "User added successfully", user: newUser });
});

// GET: Get all users
app.get("/api/user", (req, res) => {
  res.json(users);
});

// Run server on port 3000
app.listen(3000, () => {
  console.log("Server is running on http://localhost:3000");
});
