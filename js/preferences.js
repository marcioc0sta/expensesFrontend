// const API_URL = 'http://ec2-50-19-19-195.compute-1.amazonaws.com';
const API_URL = 'http://localhost:8080';

// HTML ELEMENTS
const firstname = document.getElementById('name');
const lastName = document.getElementById('last-name');
const email = document.getElementById('email');
const income = document.getElementById('income');
const back = document.getElementById('back');
const successMessage = document.getElementById('success-message');
const preferencesForm = document.getElementById('preferences-form');
const error = document.getElementById('error');
const userData = JSON.parse(localStorage.getItem('userData'));

async function SubmitPreferences () {
  const nameV = firstname.value;
  const last_nameV = lastName.value;
  const emailV = email.value;
  const incomeV = income.value;

  const response = await fetch(`${API_URL}/users`, {
    method: 'PUT',
    headers: {
        'Content-Type': 'application/json',
    },
    body: JSON.stringify({ 
      name: nameV, 
      last_name: last_nameV, 
      email: emailV, 
      income: incomeV, 
      userId: userData.id
    }),
  });

  const data = await response.json();

  if (data.error) {
    error.classList.add('active');
  } else {
    successMessage.classList.add('active');
    localStorage.setItem('userData', JSON.stringify(data));
  }
}

function populatePreferencesForm() {
  firstname.value = userData.name;
  lastName.value = userData.last_name;
  email.value = userData.email;
  income.value = userData.user_income;
}

populatePreferencesForm()

// PAGE EVENTS
preferencesForm.addEventListener('submit', (e) => {
  e.preventDefault();
  SubmitPreferences();
});

back.addEventListener('click', () => {
  window.location.href = 'dashboard.html';
});