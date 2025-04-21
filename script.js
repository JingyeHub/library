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