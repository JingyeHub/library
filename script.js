const addButton = document.querySelector("[data-add-button]");
const modal = document.querySelector("dialog");
const submitButton = document.querySelector("[data-submit-button]");
const myLibrary = [];
function Book(title, author, pages, read) {
    this.id = crypto.randomUUID();
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
}

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

submitButton.addEventListener("click", (e) => {
    const titleInput = document.querySelector("[data-title-input]");
    const authorInput = document.querySelector("[data-author-input]");
    const pagesInput = document.querySelector("[data-pages-input]");

    if (isNaN(pagesInput.value)) {
        alert("Please enter a valid number for pages");
        return;
    }
    if (!titleInput.value || !authorInput.value || !pagesInput.value) return;

    e.preventDefault();
    addBookToLibrary(
        titleInput.value,
        authorInput.value,
        pagesInput.value,
        document.querySelector("[data-read-input]").checked ? "Finished" : "Not read"
    );

    updateBookContainer();
    modal.close();
    modal.querySelector("form").reset();
})

function addBookToLibrary(title, author, pages, read) {
    myLibrary.push(new Book(title, author, pages, read));
}

function updateBookContainer() {
    const bookContainer = document.querySelector("#book-container");
    bookContainer.innerHTML = "";

    if (myLibrary.length === 0) {
        bookContainer.innerHTML = `<p class="empty-message">Your library is empty. Add some books!</p>`;
        return;
    }

    myLibrary.forEach(book => {
        const bookCard = document.createElement("div");
        bookCard.className = "book";
        bookCard.dataset.id = book.id; // Add data-id for reference
        bookCard.innerHTML = `
            <h3>Title: ${book.title}</h3>
            <p>Author: ${book.author}</p>
            <p>Pages: ${book.pages}</p>
            <p>Status: ${book.read}</p>
            <div class="button-group">
            <button class="toggle-read">Toggle Status</button>
            <button class="delete-button">Remove</button>
            </div>`;

        bookContainer.appendChild(bookCard);

        bookCard.querySelector(".delete-button").addEventListener("click", () => {
            deleteBook(book.id);
        })

        bookCard.querySelector(".toggle-read").addEventListener("click", () => {
            toggleReadStatus(book.id);
        })
    })
}

function deleteBook(id) {
    const index = myLibrary.findIndex(book => book.id === id);
    if (index !== -1) {
        myLibrary.splice(index, 1)
        updateBookContainer();
    }
}

function toggleReadStatus(id) {
    const book = myLibrary.find(book => book.id === id);
    if (book) {
        book.read = book.read === "Finished" ? "Not read" : "Finished";
        updateBookContainer();
    }
}