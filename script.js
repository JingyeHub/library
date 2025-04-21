const addButton = document.querySelector("[data-add-button]");
const modal = document.querySelector("dialog");

addButton.addEventListener("click", () => {
    modal.showModal();
})

modal.addEventListener("click", (e) => {
    const modalDimensions = modal.getBoundingClientRect();
    if (
        e.clientX < modalDimensions.left ||
        e.clientX > modalDimensions.right ||
        e.clientY < modalDimensions.top ||
        e.clientY > modalDimensions.bottom
    ) {
        modal.close();
    }
})
const submitButton = document.querySelector("[data-submit-button]");

submitButton.addEventListener("click", (e) => {
    e.preventDefault();
    let title = document.querySelector("[data-title-input]").value;
    let author = document.querySelector("[data-author-input]").value;
    let pages = document.querySelector("[data-pages-input]").value;
    let read = document.querySelector("[data-read-input]").checked === false ? "False" : "True";

    addBookToLibrary(title, author, pages, read);
    updateBookContainer();
    modal.close();
    title = "";
    author = "";
    pages = "";
    read = "";
})

const myLibrary = [];

function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

function addBookToLibrary(title, author, pages, read) {
    const newBook = new Book(title, author, pages, read);
    myLibrary.push(newBook);
}

function updateBookContainer() {
    const bookContainer = document.querySelector("#book-container");
    bookContainer.innerHTML = `
    <div class="book"><h3>Learning how to learn</h3>
    <p>Jay Zhang</p>
    <p>200</p>
    <p>True</p>
    <div>`;
    myLibrary.forEach(book => {
        const div = document.createElement("div");
        div.setAttribute("class", "book");
        div.innerHTML = `
            <h3>${book.title}</h3>
            <p>${book.author}</p>
            <p>${book.pages}</p>
            <p>${book.read}</p>
            `;
        const deleteButton = document.createElement("button");
        deleteButton.innerText = "X";
        deleteButton.setAttribute("class", "delete-button");
        div.appendChild(deleteButton);
        bookContainer.appendChild(div);

        deleteButton.addEventListener("click", (e) => {
            e.target.parentNode.remove();
        })
    })
}