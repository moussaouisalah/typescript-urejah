// Import stylesheets
import './style.css';

// Write TypeScript code!
const itemInput = document.getElementById('input') as HTMLInputElement;
const submitButton = document.getElementById('submit');
const deleteButton = document.getElementById('delete');
const list = document.getElementById('list');
const searchInput = document.getElementById('search-input') as HTMLInputElement;
const searchButton = document.getElementById('search-submit');
const searchResultsContainer = document.getElementById(
  'search-results-container'
);
const searchResults = document.getElementById('search-results');
const hideResultsButton = document.getElementById('hide-results');
const sortButton = document.getElementById('sort-button');

class ShoppingList {
  groceries: string[];

  constructor() {
    this.groceries = [];
  }

  addItem(item: string) {
    this.groceries = [...this.groceries, item];
    this.render();
  }

  removeItem(item: string) {
    this.groceries = this.groceries.filter((grocery) => grocery !== item);
    this.render();
  }

  sort() {
    const sortedList = [...this.groceries];
    sortedList.sort();
    this.groceries = sortedList;
    this.render();
  }

  render() {
    list.innerHTML = '';
    this.groceries.forEach((item) => {
      const listItem = document.createElement('li');
      listItem.innerHTML = item;

      const deleteButton = document.createElement('button');
      deleteButton.innerText = 'Delete';
      deleteButton.onclick = () => {
        this.removeItem(item);
      };

      listItem.appendChild(deleteButton);
      list.appendChild(listItem);
    });
  }
}

const myList = new ShoppingList();

submitButton.onclick = () => {
  const inputText = itemInput.value;
  if (!inputText) return;
  myList.addItem(inputText);
  itemInput.value = '';
};

deleteButton.onclick = () => {
  const inputText = itemInput.value;
  if (!inputText) return;
  myList.removeItem(inputText);
  itemInput.value = '';
};

searchButton.onclick = () => {
  const searchQuery = searchInput.value;
  if (!searchQuery) return;
  const searchResultsList = myList.groceries.filter((item) =>
    item.toLowerCase().includes(searchQuery)
  );
  searchResults.innerHTML = '';
  searchResultsList.forEach((item) => {
    searchResults.innerHTML += `<li>${item}</li>`;
  });
  searchResultsContainer.style.display = 'block';
};

hideResultsButton.onclick = () => {
  searchResultsContainer.style.display = 'none';
};

sortButton.onclick = () => {
  myList.sort();
};

searchResultsContainer.style.display = 'none';
