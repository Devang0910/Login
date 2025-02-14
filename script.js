document.addEventListener("DOMContentLoaded", function () {
    console.log("Script loaded"); // ✅ Debugging check

    // ✅ Check if already logged in and redirect
    if (localStorage.getItem("email") && window.location.pathname !== "/index1.html") {
        window.location.href = "index1.html";
    }

    // ✅ Sign Up Function
    const signupForm = document.getElementById("signupForm");
    if (signupForm) {
        signupForm.addEventListener("submit", function (event) {
            event.preventDefault();

            const user = {
                name: document.getElementById("signupName").value,
                email: document.getElementById("signupEmail").value,
                age: document.getElementById("signupAge").value,
                gender: document.getElementById("signupGender").value,
                education: document.getElementById("signupEducation").value
            };

            fetch("http://localhost:3000/api/signup", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify(user)
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    localStorage.setItem("email", user.email);
                    window.location.href = "index1.html"; // ✅ Redirect after signup
                }
            })
            .catch(error => console.error("Error:", error));
        });
    }

    // ✅ Login Function
    const loginForm = document.getElementById("loginForm");
    if (loginForm) {
        loginForm.addEventListener("submit", function (event) {
            event.preventDefault();
            const email = document.getElementById("loginEmail").value;

            fetch("http://localhost:3000/api/login", {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ email })
            })
            .then(response => response.json())
            .then(data => {
                alert(data.message);
                if (data.success) {
                    localStorage.setItem("email", email);
                    window.location.href = "index1.html"; // ✅ Redirect after login
                }
            })
            .catch(error => console.error("Error:", error));
        });
    }
});
