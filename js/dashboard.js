const API_URL = 'http://ec2-3-90-236-38.compute-1.amazonaws.com';

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

if (userData) {
    title.innerHTML = `Olá ${userData.name}`;
}

month.innerHTML = months[currentMonth];

function formatMoney(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

async function getExpensesByMonth() {
  try {
    const response = await fetch(`${API_URL}/expenses/${userData.id}/${currentMonth}`);
    const data = await response.json();

    Object.entries(data).forEach(([key, value]) => {
      switch (key) {
        case expenseCategories[1]:
          cat01V.innerHTML = `R$ ${formatMoney(value?.total)}`; 
          break;
        case expenseCategories[2]:
          cat02V.innerHTML = `R$ ${formatMoney(value.total)}`;
          break;
        case expenseCategories[3]:
          cat03V.innerHTML = `R$ ${formatMoney(value.total)}`;
          break;
        case expenseCategories[4]:
          cat04V.innerHTML = `R$ ${formatMoney(value.total)}`;
          break;
        case expenseCategories[5]:
          cat05V.innerHTML = `R$ ${formatMoney(value.total)}`;
          break;
        case expenseCategories[6]:
          cat06V.innerHTML = `R$ ${formatMoney(value.total)}`;
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