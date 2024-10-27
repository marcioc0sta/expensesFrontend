const API_URL = 'http://ec2-50-19-19-195.compute-1.amazonaws.com';

function formatMoney(value) {
  return new Intl.NumberFormat('pt-BR', { style: 'currency', currency: 'BRL' }).format(value);
}

function urlPush (url) {
  const currentUrl = window.location.href;
  const currentPage = currentUrl.split('/').pop();
  const replace = currentUrl.replace(currentPage, `${url}.html`);
  window.location.href = replace;
}


// HTML ELEMENTS
const monthFilter = document.getElementById('month');
const yearFilter = document.getElementById('year');
const tableContent = document.getElementById('table-content');
const totalExpenses = document.getElementById('total-expenses');
const back = document.getElementById('back');

const currentDate = new Date();
const currentMonth = currentDate.getMonth() + 1;
const currentYear = currentDate.getFullYear();

function currentDateFilters () {
  monthFilter.value = currentMonth
  yearFilter.value = currentYear
}

const userData = JSON.parse(localStorage.getItem('userData'));

async function getCategories() {
  try {
    const response = await fetch(`${API_URL}/categories`);
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error);
  }
}

function allItemsInEachCategory (data) {
  const allItems = data.map(item => item[1].items);
  return allItems.flat(1);
}

function calculateTotalExpenses (data) {
  return data.reduce((acc, item) => {
    return acc + Number(item.value);
  }, 0);
}

async function getEntriesByYearAndMonth () {
  try {
    const response = await fetch(`${API_URL}/expenses/${userData.id}/${yearFilter.value}/${monthFilter.value}`);
    const data = await response.json();

    const categories = await getCategories();
    const flatData = allItemsInEachCategory(Object.entries(data));

    flatData.forEach(item => {
      const category = categories.find(category => category.id === item.category);
      if (tableContent) {
        tableContent.insertAdjacentHTML('beforeend', `
          <tr>
            <td>${item.description}</td>
            <td>${category.name}</td>
            <td>${formatMoney(item.value)}</td>
            <td class="actions">
                <button title="editar" class="btn btn-sm btn-primary"><span class="fa fa-pencil"></span></button>
                <button title="exlcuir" class="btn btn-sm btn-danger"><span class="fa fa-trash"></span></button>
            </td>
          </tr>
        `);

        totalExpenses.innerHTML = formatMoney(calculateTotalExpenses(flatData));
      } else {
        console.error('Element with ID "table-content" not found.');
      }
    });
  } catch (error) {
    console.log(error);
  }
}

currentDateFilters();
getEntriesByYearAndMonth();
totalExpenses.innerHTML = formatMoney(0);

// PAGE EVENTS
monthFilter.addEventListener('change', async () => {
  tableContent.innerHTML = ''
  totalExpenses.innerHTML = formatMoney(0);
  await getEntriesByYearAndMonth();
});
yearFilter.addEventListener('change', async () => {
  tableContent.innerHTML = ''
  totalExpenses.innerHTML = formatMoney(0);
  await getEntriesByYearAndMonth();
});
back.addEventListener('click', () => {
  urlPush('dashboard');
})

