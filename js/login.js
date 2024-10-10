const API_URL = 'http://ec2-3-90-236-38.compute-1.amazonaws.com';

// HTML ELEMENTS
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginForm = document.getElementById('login-form');

async function SubmitLogin () {
    const email = loginEmail.value;
    const password = loginPassword.value;

    const response = await fetch(`${API_URL}/login`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
    });

    const data = await response.json();

    if (data.error) {
        alert(data.error);
    } else {
        window.location.href = '/dashboard.html';
        localStorage.setItem('userData', JSON.stringify(data));
    }
};

// PAGE EVENTS
registerBtn.addEventListener('click', () => {
    container.classList.add("active");
});

loginBtn.addEventListener('click', () => {
    container.classList.remove("active");
});

loginForm.addEventListener('submit', (event) => {
    event.preventDefault();
    SubmitLogin();
});