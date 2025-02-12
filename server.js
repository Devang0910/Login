// const express = require("express");
// const fs = require("fs");
// const cors = require("cors");

// const app = express();
// app.use(express.json()); // Middleware to parse JSON
// app.use(cors()); // Enable CORS for frontend access

// const USERS_FILE = "./users.json";

// // Utility function to read user data
// const readUsers = () => {
//     return JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
// };

// // Utility function to write user data
// const writeUsers = (data) => {
//     fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2), "utf8");
// };

// // ✅ GET All Users
// app.get("/",(req,res)=>
// {
//     res.send("Welcome to Landing Page!");
    
// })
// app.get("/api/users", (req, res) => {
//     const users = readUsers();
//     res.json(users);
// });

// // ✅ GET Single User by ID
// app.get("/api/users/:id", (req, res) => {
//     const users = readUsers();
//     const user = users.find((u) => u.id === parseInt(req.params.id));
//     if (user) {
//         res.json(user);
//     } else {
//         res.status(404).json({ message: "User not found" });
//     }
// });

// // ✅ POST (Add) a New User
// app.post("/api/users", (req, res) => {
//     const users = readUsers();
//     const newUser = {
//         id: users.length + 1, // Auto-increment ID
//         ...req.body,
//     };
//     users.push(newUser);
//     writeUsers(users);
//     res.status(201).json({ message: "User added successfully", user: newUser });
// });

// // ✅ PUT (Update) an Existing User
// app.put("/api/users/:id", (req, res) => {
//     let users = readUsers();
//     const userIndex = users.findIndex((u) => u.id === parseInt(req.params.id));

//     if (userIndex !== -1) {
//         users[userIndex] = { ...users[userIndex], ...req.body };
//         writeUsers(users);
//         res.json({ message: "User updated successfully", user: users[userIndex] });
//     } else {
//         res.status(404).json({ message: "User not found" });
//     }
// });

// // ✅ DELETE a User
// app.delete("/api/users/:id", (req, res) => {
//     let users = readUsers();
//     const filteredUsers = users.filter((u) => u.id !== parseInt(req.params.id));

//     if (users.length !== filteredUsers.length) {
//         writeUsers(filteredUsers);
//         res.json({ message: "User deleted successfully" });
//     } else {
//         res.status(404).json({ message: "User not found" });
//     }
// });

// // ✅ Start Server
// app.listen(3000, () => {
//     console.log("Server running on http://localhost:3000");
// });
const express = require("express");
const fs = require("fs");
const cors = require("cors");
const path = require("path");

const app = express();
app.use(express.json());
app.use(cors());

// ✅ Serve Static Files
app.use(express.static(path.join(__dirname, "public")));

const USERS_FILE = "./users.json";

// Utility functions
const readUsers = () => JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
const writeUsers = (data) => fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2), "utf8");

// ✅ Sign Up (Create a new user)
app.post("/api/signup", (req, res) => {
    const usersData = readUsers();
    const { name, email, age, gender, education } = req.body;

    if (usersData.users.some(user => user.email === email)) {
        return res.status(400).json({ message: "Email already registered. Please log in." });
    }

    const newUser = {
        id: usersData.users.length + 1,
        name,
        email,
        age,
        gender,
        education
    };

    usersData.users.push(newUser);
    writeUsers(usersData);
    res.status(201).json({ message: "User registered successfully", user: newUser });
});

// ✅ Login
app.post("/api/login", (req, res) => {
    const usersData = readUsers();
    const { email } = req.body;

    const user = usersData.users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ message: "User not found. Please sign up." });
    }

    if (usersData.loggedInUsers.some(u => u.email === email)) {
        return res.status(200).json({ message: "Already logged in", user });
    }

    usersData.loggedInUsers.push(user);
    writeUsers(usersData);
    res.json({ message: "Login successful", user });
});

// ✅ Logout
app.post("/api/logout", (req, res) => {
    const usersData = readUsers();
    const { email } = req.body;

    usersData.loggedInUsers = usersData.loggedInUsers.filter(u => u.email !== email);
    writeUsers(usersData);
    res.json({ message: "Logged out successfully" });
});

// ✅ Serve Landing Page
app.get("/landing", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "landing.html"));
});

// ✅ Start Server
app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
