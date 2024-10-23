const API_URL = 'http://ec2-50-19-19-195.compute-1.amazonaws.com';

// HTML ELEMENTS
const categoriesSelect = document.getElementById('categories');

const populateCategoriesSelect = (categories) => {
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

// PAGE EVENTS