// JavaScript code for login functionality (you can add your own logic)
document.getElementById('login-form').addEventListener('submit', function (e) {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    // Add your authentication logic here (e.g., check if username and password are valid)

    // For demonstration purposes, let's just show an alert
    alert(`Logged in as: ${username}`);
});
