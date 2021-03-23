let myLibrary = [];
let bookCount = 0;

function Book(name, author, pages) {
	this.name = name;
	this.author = author;
	this.pages = pages;
	this.read = false;
	this.bookID = `ID- ${bookCount++}`;
	this.info = console.log(
		`${this.name} by ${this.author}, ${this.pages} ${this.read} this book id is ${this.bookID}`
	);
}

// LOCAL STORAGE

function saveLocal() {
	localStorage.setItem('myLibrary', JSON.stringify(myLibrary));
	localStorage.setItem('bookCount', JSON.stringify(bookCount));
}

function restoreLocal() {
	myLibrary = JSON.parse(localStorage.getItem('myLibrary'));
	bookCount = JSON.parse(localStorage.getItem('bookCount'));
	if (myLibrary === null) myLibrary = [];
	myLibrary.forEach(displayBookShelf);
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

const displayBookShelf = (novel) => {
	// create the book
	const bookShelf = document.querySelector('#book-shelf');
	const book = document.createElement('div');
	book.classList.add('book-card');
	book.id = novel.bookID;

	// create the top section
	const topSection = document.createElement('div');
	topSection.classList.add('top-container');
	book.appendChild(topSection);

	// create the title
	const title = document.createElement('div');
	title.classList.add('book-title');
	title.textContent = novel.name;
	topSection.appendChild(title);

	// create the author
	const author = document.createElement('div');
	author.classList.add('book-author');
	author.textContent = `By: ${novel.author}`;
	topSection.appendChild(author);

	// create bottom section
	const bottomSection = document.createElement('div');
	bottomSection.classList.add('bottom-container');
	book.appendChild(bottomSection);

	// create page count section
	const pages = document.createElement('div');
	pages.classList.add('book-pages');
	pages.textContent = `${novel.pages} + pages`;
	// novel.pages + ' pages';
	bottomSection.appendChild(pages);

	// create book footer section
	const footer = document.createElement('div');
	footer.classList.add('book-footer');
	bottomSection.appendChild(footer);

	// create delete button
	const deleteButton = document.createElement('button');
	deleteButton.classList.add('delete-button');
	deleteButton.textContent = 'Delete';
	deleteButton.onclick = () => {
		deleteBook(event);
	};
	footer.appendChild(deleteButton);

	// create read Y/N section
	const read = document.createElement('button');
	if (novel.read == false) {
		read.classList.add('is-not-read');
		read.textContent = 'Mark as read?';
	} else {
		read.classList.add('is-read');
		read.textContent = 'Book Read!';
	}
	read.onclick = () => {
		readBook(event);
	};
	footer.appendChild(read);

	// add book to bookShelf
	bookShelf.appendChild(book);
};

// Javascript to open and close form pop up
function openForm() {
	document.getElementById('popup-form').style.display = 'block';
}

function closeForm() {
	document.getElementById('popup-form').style.display = 'none';
}
// function to clear form inputs
function clearForm() {
	document.getElementById('title').value = '';
	document.getElementById('author').value = '';
	document.getElementById('pages').value = '';
}

// function to mark book as read
function readBook(e) {
	const bookID = e.target.parentNode.parentNode.parentNode.id;
	const bookFrame = e.target.parentNode.parentNode.parentNode;

	const book = myLibrary.find((novel) => novel.bookID == bookID);
	if (book.read === false) {
		book.read = true;
		e.target.textContent = 'Book Read!';
		e.target.classList.remove('is-not-read');
		e.target.classList.add('is-read');
		bookFrame.classList.add('read-border');
	} else {
		book.read = false;
		e.target.textContent = 'Mark as read?';
		e.target.classList.remove('is-read');
		e.target.classList.add('is-not-read');
		bookFrame.classList.remove('read-border');
	}

	saveLocal();
}

// delete book
function deleteBook(e) {
	const bookID = e.target.parentNode.parentNode.parentNode.id;
	const book = document.getElementById(bookID);
	removeFromLibrary(bookID);
	book.remove();
	saveLocal();
	console.log('book sucessfully deleted');
}

// Javascript to turn form inputs into js object
function submitForm() {
	const name = document.getElementById('title').value;
	const author = document.getElementById('author').value;
	const pages = document.getElementById('pages').value;
	const newBook = new Book(name, author, pages);
	addBookToLibrary(newBook);
	displayBookShelf(newBook);
	clearForm();
	closeForm();
}

function bindUI() {
	const newBook = document.getElementById('new-book');
	newBook.addEventListener('click', openForm);
	const submitButton = document.getElementById('submit-button');
	submitButton.addEventListener('click', submitForm);
}

/* Toggle between showing and hiding the navigation menu links when the user clicks on the hamburger menu / bar icon */
function mobileNavMenu() {
	const x = document.getElementById('myLinks');
	if (x.style.display === 'block') {
		x.style.display = 'none';
	} else {
		x.style.display = 'block';
	}
}

restoreLocal();

bindUI();
