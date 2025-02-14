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

// Ensure the users.json file exists with default data
if (!fs.existsSync(USERS_FILE)) {
    fs.writeFileSync(USERS_FILE, JSON.stringify({ users: [], loggedInUsers: [] }, null, 2));
}

// Utility functions
const readUsers = () => JSON.parse(fs.readFileSync(USERS_FILE, "utf8"));
const writeUsers = (data) => fs.writeFileSync(USERS_FILE, JSON.stringify(data, null, 2), "utf8");

app.post("/api/signup", (req, res) => {
    const usersData = readUsers();
    const { name, email, age, gender, education } = req.body;

    if (usersData.users.some(user => user.email === email)) {
        return res.status(400).json({ success: false, message: "Email already registered. Please log in." });
    }

    const newUser = { id: usersData.users.length + 1, name, email, age, gender, education };
    usersData.users.push(newUser);
    writeUsers(usersData);

    usersData.loggedInUsers.push(newUser);
    writeUsers(usersData);

    res.status(201).json({ success: true, message: "Signup successful!", email, redirect: "index1.html" });
});

app.post("/api/login", (req, res) => {
    const usersData = readUsers();
    const { email } = req.body;

    const user = usersData.users.find(u => u.email === email);
    if (!user) {
        return res.status(404).json({ success: false, message: "User not found. Please sign up." });
    }

    if (!usersData.loggedInUsers.some(u => u.email === email)) {
        usersData.loggedInUsers.push(user);
        writeUsers(usersData);
    }

    res.json({ success: true, message: "Login successful!", email, redirect: "index1.html" });
});

app.post("/api/logout", (req, res) => {
    const usersData = readUsers();
    const { email } = req.body;

    usersData.loggedInUsers = usersData.loggedInUsers.filter(u => u.email !== email);
    writeUsers(usersData);
    res.json({ success: true, message: "Logged out successfully" });
});

app.get("/landing", (req, res) => {
    res.sendFile(path.join(__dirname, "public", "landing.html"));
});

app.listen(3000, () => {
    console.log("Server running on http://localhost:3000");
});
