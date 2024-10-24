const API_URL = 'http://ec2-50-19-19-195.compute-1.amazonaws.com';

const userData = JSON.parse(localStorage.getItem('userData'));

function urlPush (url) {
  const currentUrl = window.location.href;
  const currentPage = currentUrl.split('/').pop();
  const replace = currentUrl.replace(currentPage, `${url}.html`);
  window.location.href = replace;
}

// HTML ELEMENTS
const categoriesSelect = document.getElementById('categories');
const dateInput = document.getElementById('date');
const descriptionInput = document.getElementById('description');
const valueInput = document.getElementById('value');
const successMessage = document.getElementById('success-message');
const form = document.getElementById('entry-form');
const error = document.getElementById('error');
const back = document.getElementById('back');


function populateCategoriesSelect(categories) {
  categories.forEach((cat) => {
    const option = document.createElement('option');
    option.value = cat.id;
    option.text = cat.name;
    categoriesSelect.appendChild(option);
  });
}

async function getCategories() {
    try {
        const response = await fetch(`${API_URL}/categories`);
        const data = await response.json();
        populateCategoriesSelect(data);
    } catch (error) {
        console.log(error);
    }
}

getCategories();

function formatDate(date) {
  const [day, month, year] = date.split('/');
  console.log(year, month, day);
  return `${year}-${month}-${day}`;
}

function verifyEmptyFields() {
  switch (true) {
    case dateInput.value === '':
      error.textContent = 'Informe a data';
      error.classList.add('active');
      return true;
    case descriptionInput.value === '':
      error.textContent = 'Informe a descrição';
      error.classList.add('active');
      return true;
    case valueInput.value === '':
      error.textContent = 'Informe o valor';
      error.classList.add('active');
      return true;
    default:
      return false;
  }
}

function validateDate(date) {
  const [day, month, year] = date.split('/');
  if (day > 31 || day < 1) {
    error.textContent = 'Dia inválido, informe um dia entre 1 e 31';
    error.classList.add('active');
    return false;
  }
  if (month > 12 || month < 1) {
    error.textContent = 'Mês inválido, informe um mês entre 1 e 12';
    error.classList.add('active');
    return false;
  }
  if (year < 1900) {
    error.textContent = 'Ano inválido, informe um ano maior que 1900';
    error.classList.add('active');
    return false;
  }
  return true;
}

async function createEntry() {
  const date = dateInput.value;
  const description = descriptionInput.value;
  const categoryId = categoriesSelect.value;
  const value = valueInput.value;

  const entry = {
    userId: userData.id,
    date: formatDate(date),
    description,
    category: categoryId,
    value
  }

  if (!validateDate(date)) {
    successMessage.classList.remove('active');
    return
  }

  if (verifyEmptyFields()) {
    successMessage.classList.remove('active');
    return
  }

  try {
    await fetch(`${API_URL}/expenses`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(entry)
    });

    successMessage.classList.add('active');
  } catch (error) {
    console.log(error);
    successMessage.remove.add('active');
    error.classList.add('active');
    error.textContent = 'Erro ao criar despesa, tente novamente mais tarde';
  }
}

function dateInputMask (dateInput) {
  dateInput.addEventListener('input', (event) => {
    event.target.value = event.target.value.replace(/\D/g, '')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{2})(\d)/, '$1/$2')
      .replace(/(\d{4})(\d)/, '$1');
  });
}

dateInputMask(dateInput);

// PAGE EVENTS
categoriesSelect.addEventListener('keyup', () => {
  successMessage.classList.remove('active');
  error.classList.remove('active');
});

dateInput.addEventListener('keyup', () => {
  successMessage.classList.remove('active');
  error.classList.remove('active');
});

descriptionInput.addEventListener('keyup', () => {
  successMessage.classList.remove('active');
  error.classList.remove('active');
});

valueInput.addEventListener('keyup', () => {
  successMessage.classList.remove('active');
  error.classList.remove('active');
});

form.addEventListener('submit', (event) => {
    event.preventDefault();
    createEntry();
});

back.addEventListener('click', () => {
  urlPush('dashboard');
})
