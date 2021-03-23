let myLibrary = [];
let bookCount = 0;

function Book(name, author, pages) {
  this.name = name;
  this.author = author;
  this.pages = pages;
  this.read = false;
  this.bookID = "ID-" + bookCount++;

  this.info = console.log(
    this.name +
      " by " +
      this.author +
      ", " +
      this.pages +
      " pages " +
      this.read +
      " this book id is " +
      this.bookID
  );
}

// add book
function addBookToLibrary(newBook) {
  myLibrary.push(newBook);
  saveLocal();
}

// remove book
function removeFromLibrary(bookID) {
  myLibrary = myLibrary.filter((novel) => novel.bookID !== bookID);
  saveLocal();
}

// Function to display all books on the web page
// test book creation

const displayBookShelf = function (novel) {
  // create the book
  const bookShelf = document.querySelector("#book-shelf");
  const book = document.createElement("div");
  book.classList.add("book-card");
  book.id = novel.bookID;

  // create the top section
  const topSection = document.createElement("div");
  topSection.classList.add("top-container");
  book.appendChild(topSection);

  // create the title
  const title = document.createElement("div");
  title.classList.add("book-title");
  title.textContent = novel.name;
  topSection.appendChild(title);

  // create the author
  const author = document.createElement("div");
  author.classList.add("book-author");
  author.textContent = "By: " + novel.author;
  topSection.appendChild(author);

  // create bottom section
  const bottomSection = document.createElement("div");
  bottomSection.classList.add("bottom-container");
  book.appendChild(bottomSection);

  // create page count section
  const pages = document.createElement("div");
  pages.classList.add("book-pages");
  pages.textContent = novel.pages + " pages";
  bottomSection.appendChild(pages);

  // create book footer section
  const footer = document.createElement("div");
  footer.classList.add("book-footer");
  bottomSection.appendChild(footer);

  // create delete button
  const deleteButton = document.createElement("button");
  deleteButton.classList.add("delete-button");
  deleteButton.textContent = "Delete";
  deleteButton.onclick = function () {
    deleteBook(event);
  };
  footer.appendChild(deleteButton);

  // create read Y/N section
  const read = document.createElement("button");
  if (novel.read == false) {
    read.classList.add("is-not-read");
    read.textContent = "Mark as read?";
  } else {
    read.classList.add("is-read");
    read.textContent = "Book Read!";
  }
  read.onclick = function () {
    readBook(event);
  };
  footer.appendChild(read);

  // add book to bookShelf
  bookShelf.appendChild(book);
};

// Javascript to open and close form pop up
function openForm() {
  document.getElementById("popup-form").style.display = "block";
}

function closeForm() {
  document.getElementById("popup-form").style.display = "none";
}
// function to clear form inputs
function clearForm() {
  document.getElementById("title").value = "";
  document.getElementById("author").value = "";
  document.getElementById("pages").value = "";
}

// function to mark book as read
function readBook(e) {
  let bookID = e.target.parentNode.parentNode.parentNode.id;

  let book = myLibrary.find((novel) => novel.bookID == bookID);
  if (book.read == false) {
    book.read = true;
    e.target.textContent = "Book Read!";
    e.target.classList.remove("is-not-read");
    e.target.classList.add("is-read");
  } else {
    book.read = false;
    e.target.textContent = "Mark as read?";
    e.target.classList.remove("is-read");
    e.target.classList.add("is-not-read");
  }
  saveLocal();
}

// delete book
function deleteBook(e) {
  let bookID = e.target.parentNode.parentNode.parentNode.id;
  let book = document.getElementById(bookID);
  removeFromLibrary(bookID);
  book.remove();
  saveLocal();
  console.log("book sucessfully deleted");
}

// Javascript to turn form inputs into js object
function submitForm() {
  name = document.getElementById("title").value;
  author = document.getElementById("author").value;
  pages = document.getElementById("pages").value;

  let newBook = new Book(name, author, pages);
  addBookToLibrary(newBook);

  displayBookShelf(newBook);
  clearForm();
  closeForm();
}

// LOCAL STORAGE

function saveLocal() {
  localStorage.setItem("myLibrary", JSON.stringify(myLibrary));
  localStorage.setItem("bookCount", JSON.stringify(bookCount));
}

function restoreLocal() {
  myLibrary = JSON.parse(localStorage.getItem("myLibrary"));
  bookCount = JSON.parse(localStorage.getItem("bookCount"));
  if (myLibrary === null) myLibrary = [];
  myLibrary.forEach(displayBookShelf);
}

restoreLocal();

// Start of formula's in action
// const theHobbit = new Book("The Hobbit", "J.R. Tolkein", 498);
// const antiracist = new Book("How to be an Antiracist", "Ibram X. Kendi", 280);
// const mediocre = new Book("Mediocre", "Ileoma Olou", 306);

// addBookToLibrary(theHobbit);
// addBookToLibrary(antiracist);
// addBookToLibrary(mediocre);

// console.log(myLibrary);

// myLibrary.forEach(displayBookShelf);
