const API_URL = 'http://ec2-50-19-19-195.compute-1.amazonaws.com';

// HTML ELEMENTS
const container = document.getElementById('container');
const registerBtn = document.getElementById('register');
const loginBtn = document.getElementById('login');
const loginEmail = document.getElementById('login-email');
const loginPassword = document.getElementById('login-password');
const loginForm = document.getElementById('login-form');
const error = document.getElementById('error');
const signupForm = document.getElementById('signup-form');
const signupName = document.getElementById('signup-name');
const signupEmail = document.getElementById('signup-email');
const signupPassword = document.getElementById('signup-password');
const signupError = document.getElementById('signup-error');
const signupSuccess = document.getElementById('signup-success');

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
        error.classList.add('active');
        console.log(data.error);
    } else {
        window.location.href = '/dashboard.html';
        localStorage.setItem('userData', JSON.stringify(data));
    }
};

async function SubmitSignup () {
    const name = signupName.value;
    const email = signupEmail.value;
    const password = signupPassword.value;

    const response = await fetch(`${API_URL}/users`, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ name, email, password }),
    });

    const data = await response.json();

    if (data.error) {
        signupError.classList.add('active');
        signupError.innerHTML = 'Dados inválidos, confira os dados inseridos e tente novamente.';
        console.log(data.error);
    } else {
        signupSuccess.classList.add('active');
        signupSuccess.innerHTML = 'Cadastro realizado com sucesso! Faça login para acessar.';
    }
}

// PAGE EVENTS
loginEmail.addEventListener('keyup', () => {
    error.classList.remove('active');
});

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

signupForm.addEventListener('submit', (event) => {
    event.preventDefault();
    SubmitSignup();
});