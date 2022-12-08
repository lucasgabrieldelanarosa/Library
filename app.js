// Consts from HTML (values from inputs)
const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.getElementById("read");
const submitButton = document.querySelector('#submitButton');
// Book Constructor/Template
function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = Math.random() + title;
}
// Delete the book list, then uptade the a new one
function updateDisplay(){
    const myBooksList = document.querySelector('#myBooks');
    myBooksList.innerHTML = ''

    library.forEach(newBook => {
        const book = document.createElement("div");
        book.dataset.bookID = newBook.id;

        const cardBody = document.createElement("div");

        const title = document.createElement("h5");
        title.textContent = newBook.title;
        title.setAttribute('class', 'title')
        book.append(cardBody);


        const bookInfo = document.createElement("ul");
        const author = document.createElement("li");
        author.setAttribute('class', 'author')
        author.textContent = newBook.author;


        const pages = document.createElement("li");
        pages.setAttribute('class', 'pages')
        pages.textContent = newBook.pages;

        const inputHolder = document.createElement("span");
        const read = document.createElement("input");
        const readLi = document.createElement("li");
        read.type = "checkbox";
        if (newBook.read) read.checked = true;
        read.addEventListener("change", e => updateRead(e));
        inputHolder.append(read);
        readLi.textContent = "Read ";
        readLi.append(inputHolder);
        readLi.setAttribute('class', 'read')

        
        const removeButton = document.createElement("button");
        removeButton.addEventListener("click", e => removeBook(e));
        removeButton.textContent = "Remove";
        removeButton.setAttribute('class', 'remove')

        bookInfo.append(title, author, pages, readLi, removeButton);
        book.append(bookInfo);

        book.setAttribute('class', 'book-card')
        myBooksList.append(book);
    }
)}
// Add or remove books from the local storage
const updateLocalStorage = () => {
    localStorage.setItem('library', JSON.stringify(library))
    updateDisplay();
}
// Add the new book to the library array
function addBookToLibrary(){
    const title = titleInput.value;
    const author = authorInput.value;
    const pages =  pagesInput.value;
    const read = readInput.checked;
    let newBook = new Book(title, author, pages, read);
    library.push(newBook);
}
// Call the functions and reset the inputs on screen
submitButton.addEventListener('click', (e) =>{
    e.preventDefault();
    addBookToLibrary();
    updateLocalStorage();
    updateDisplay();
    console.log(library);
    titleInput.value = ''
    authorInput.value = ''
    pagesInput.value = ''
    readInput.checked = false
})
// Remove the target book
function removeBook(event){
    let targetBook = event.currentTarget.parentNode.parentNode.dataset.bookID;
    console.log(event.currentTarget.parentNode.parentNode);
    let index = library.findIndex(book => book.id == targetBook)
    library.splice(index, 1);
    updateLocalStorage();
    updateDisplay()
}
// I'll use it later to count how many books did you read
function updateRead(event) {
    let targetBook = event.currentTarget.parentNode.parentNode.parentNode.parentNode.dataset.bookID;
    console.log(event.currentTarget.parentNode.parentNode.parentNode.parentNode);
    let index = library.findIndex(book => book.id == targetBook)
    library[index].read = !library[index].read;
    updateLocalStorage()
}
// Local Storage
const localStorageLibrary = JSON.parse(localStorage.getItem('library'))
let library = localStorage.getItem('library') !== null ? localStorageLibrary : []
// Important to init the page with your books
updateDisplay()