// HTML ELEMENTS
const title = document.getElementById('title');

const userData = JSON.parse(localStorage.getItem('userData'));

if (userData) {
    title.innerHTML = `Olá ${userData.name}`;
}