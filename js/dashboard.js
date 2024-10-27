const API_URL = 'http://ec2-50-19-19-195.compute-1.amazonaws.com';

function urlPush (url) {
  const currentUrl = window.location.href;
  const currentPage = currentUrl.split('/').pop();
  const replace = currentUrl.replace(currentPage, `${url}.html`);
  window.location.href = replace;
}

const months = {
    0: 'Janeiro',
    1: 'Fevereiro',
    2: 'Março',
    3: 'Abril',
    4: 'Maio',
    5: 'Junho',
    6: 'Julho',
    7: 'Agosto',
    8: 'Setembro',
    9: 'Outubro',
    10: 'Novembro',
    11: 'Dezembro'
}

const expenseCategories = {
    1: 'moradia',
    2: 'alimentacao',
    3: 'transporte',
    4: 'saude',
    5: 'educacao',
    6: 'lazer'
}

const currentDate = new Date();
const currentMonth = currentDate.getMonth();
const currentYear = currentDate.getFullYear();
const userData = JSON.parse(localStorage.getItem('userData'));

// HTML ELEMENTS
const title = document.getElementById('title');
const month = document.getElementById('current-month');
const cat01V = document.getElementById('cat-01-value');
const cat02V = document.getElementById('cat-02-value');
const cat03V = document.getElementById('cat-03-value');
const cat04V = document.getElementById('cat-04-value');
const cat05V = document.getElementById('cat-05-value');
const cat06V = document.getElementById('cat-06-value');
const newEntry = document.getElementById('new-entry');
const logout = document.getElementById('logout');
const avatar = document.getElementById('avatar');
const preferences = document.getElementById('preferences');
const totalIncome = document.getElementById('total-income');
const balance = document.getElementById('balance');
const goToEntries = document.getElementById('go-to-entries');
let total = 0;

if (userData) {
    title.innerHTML = `Olá ${userData.name}`;
}

month.innerHTML = months[currentMonth];

function formatMoney(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function calculateTotal(data) {
  
  data.reduce((acc, [key, value]) => {
    total += Number(value.total);
  }, 0);

  totalIncome.innerHTML = `${formatMoney(total)}`;
}

function calculateBalance() {
  const balanceValue = userData.user_income - total;
  const halfIncome = userData.user_income / 2;

  if (balanceValue < 0) {
    console.log('menor')
    balance.innerHTML = '--';
    return
  }

  if (balanceValue < halfIncome) {
    balance.style.color = '#c14d4d';
  } else {
    balance.style.color = '#218b20';
  }

  balance.innerHTML = `${formatMoney(balanceValue)}`;
}

async function getExpensesByMonth() {
  try {
    const response = await fetch(`${API_URL}/expenses/${userData.id}/${currentYear}/${currentMonth + 1}`);
    const data = await response.json();

    calculateTotal(Object.entries(data));
    calculateBalance();

    Object.entries(data).forEach(([key, value]) => {
      switch (key) {
        case expenseCategories[1]:
          cat01V.innerHTML = `${formatMoney(value?.total)}`; 
          break;
        case expenseCategories[2]:
          cat02V.innerHTML = `${formatMoney(value.total)}`;
          break;
        case expenseCategories[3]:
          cat03V.innerHTML = `${formatMoney(value.total)}`;
          break;
        case expenseCategories[4]:
          cat04V.innerHTML = `${formatMoney(value.total)}`;
          break;
        case expenseCategories[5]:
          cat05V.innerHTML = `${formatMoney(value.total)}`;
          break;
        case expenseCategories[6]:
          cat06V.innerHTML = `${formatMoney(value.total)}`;
          break
      default:
        break;
      }
    });
  } catch (error) {
    console.error(error);
  }
}

getExpensesByMonth();

function populateAvatar() {
  const nameInitial = userData.name.split(' ').map(name => name[0]).join('')
  const lastnameInitial = userData.last_name ? userData.last_name.split(' ').map(name => name[0]).join('') : '';
  const userInitials = `${nameInitial}${lastnameInitial}`;
  avatar.innerHTML = userInitials;
}


populateAvatar();

// PAGE EVENTS
newEntry.addEventListener('click', () => {
    urlPush('newEntry');
});

logout.addEventListener('click', () => {
    localStorage.removeItem('userData');
    urlPush('index');
});

avatar.addEventListener('mouseover', () => {
  preferences.style.display = 'block';
});

preferences.addEventListener('mouseleave', () => {
  preferences.style.display = 'none';
});

preferences.addEventListener('click', () => {
  urlPush('preferences');
});

goToEntries.addEventListener('click', () => {
  urlPush('entries');
});