const titleInput = document.querySelector('#title');
const authorInput = document.querySelector('#author');
const pagesInput = document.querySelector('#pages');
const readInput = document.getElementById("read");
const submitButton = document.querySelector('#submitButton');

let myLibrary = [];

function Book(title, author, pages, read){
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.id = Math.random() + title;
}

function addBookToLibrary(){
    const title = titleInput.value;
    const author = authorInput.value;
    const pages =  pagesInput.value;
    const read = readInput.checked;
    let newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function updateDisplay(){
    const myBooksList = document.querySelector('#myBooks');
    myBooksList.innerHTML = ''

    myLibrary.forEach(newBook => {
        const book = document.createElement("div");
        book.dataset.bookID = newBook.id;

        const cardBody = document.createElement("div");

        const title = document.createElement("h5");
        title.textContent = newBook.title;
        book.append(cardBody);
        const removeButton = document.createElement("button");
        removeButton.addEventListener("click", e => removeBook(e));
        removeButton.textContent = "X";
        cardBody.append(title, removeButton);


        const bookInfo = document.createElement("ul");
        const author = document.createElement("li");
        author.textContent = newBook.author;


        const pages = document.createElement("li");
        pages.textContent = newBook.pages;

        const inputHolder = document.createElement("span");
        const read = document.createElement("input");
        const readLi = document.createElement("li");
        read.type = "checkbox";
        if (newBook.read) read.checked = true;
        readBook(newBook)
        read.addEventListener("change", e => updateRead(e));
        inputHolder.append(read);
        readLi.textContent = "Read ";
        readLi.append(inputHolder);


        bookInfo.append(author, pages, readLi);
        book.append(bookInfo);
        myBooksList.append(book);
    }
)}

submitButton.addEventListener('click', (e) =>{
    e.preventDefault();
    addBookToLibrary();
    updateDisplay();
    titleInput.value = ''
    authorInput.value = ''
    pagesInput.value = ''
    readInput.checked = false
})

function removeBook(event){
    let targetBook = event.currentTarget.parentNode.parentNode.parentNode.dataset.bookID;
    let index = myLibrary.findIndex(book => book.id == targetBook)
    myLibrary.splice(index, 1);
    updateDisplay()
}


function updateRead(event) {
    let targetBook = event.currentTarget.parentNode.parentNode.parentNode.parentNode.dataset.bookID;
    console.log(event.currentTarget.parentNode.parentNode.parentNode.parentNode);
    let index = myLibrary.findIndex(book => book.id == targetBook)
    myLibrary[index].read = !myLibrary[index].read;
}

function readBook(newBook){
    for(let i = 0; newBook.read == true; i++){
        console.log('You read ' + i + ' books!') // xd
    }

    /*if(newBook.read == true){
        console.log()
    }*/
}