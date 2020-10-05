const apiUrl = 'http://localhost:3000';

const addBtn = document.getElementById('add'),
  deleteBtn = document.getElementById('delete'),
  wrapper = document.getElementById('data');

const createDataElement = (element) => `<div>
    <span>ID: ${element.id}</span>
    <span>Name: ${element.name}</span>
    <span data-user-id="${element.id}" class="delete">X</span>
</div>`;

const createData = (data) =>
  data.map((element) => createDataElement(element)).join('');

const drawData = (data, wrapper = document.body) =>
  (wrapper.innerHTML = createData(data));

fetch(apiUrl)
  .then((response) => response.json())
  .then((data) => drawData(data, wrapper));

wrapper.addEventListener('click', (e) => {
  if (e.target.classList.contains('delete')) {
    fetch(`${apiUrl}/delete?id=${e.target.dataset.userId}`)
      .then((response) => response.json())
      .then((data) => drawData(data, wrapper));
  }
});

addBtn.addEventListener('click', () => {
  fetch(`${apiUrl}/add`)
    .then((response) => response.json())
    .then((data) => drawData(data, wrapper));
});

deleteBtn.addEventListener('click', () => {
  fetch(`${apiUrl}/delete`)
    .then((response) => response.json())
    .then((data) => drawData(data, wrapper));
});
