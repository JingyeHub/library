const addButton = document.querySelector("[data-add-button]");
const modal = document.querySelector("dialog");

addButton.addEventListener("click", () => {
    modal.showModal();
})

modal.addEventListener("click", e => {
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

const myLibrary = [
    { title: "Learning how to learn", author: "Jay Zhang", pages: 200, read: "True" },
];

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