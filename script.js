
let myLibrary = [];


class Book {

    constructor(title, author, pages, status) {

        this.title = title,
            this.author = author,
            this.pages = pages,
            this.status = status
    }

}


const addBookToLibrary = () => {

    const table = document.querySelector('.tableContainer');
    // Clear the table Every time there is a new update to myLibrary // Start Fresh Rendering
    resetTable(table);

    const tbody = document.createElement("tbody");

    for (let i = 0; i < myLibrary.length; i++) {

        const row = tbody.insertRow(i);

        let indexCell = 0

        Object.keys(myLibrary[i]).forEach(key => {
            let cell = row.insertCell(indexCell);

            if (key == 'status') {
                if (myLibrary[i][key] == 'yes') {
                    cell.innerHTML = yesIcon();
                }
                else {
                    cell.innerHTML = noIcon();
                }
            }
            else {
                cell.innerHTML = myLibrary[i][key];
            }
            indexCell++;
        })

        let deleteCell = row.insertCell(4);

        deleteCell.innerHTML = deleteIcon();


    }

    table.appendChild(tbody);

    console.log(myLibrary);
}

const deleteIcon = () => {
    const icon = "<img src=\"\static/images/delete.png\" id=\"delete\" class=\"delete\">";
    return icon;
}

const yesIcon = () => {
    const icon = "<img src=\"\static/images/ok.png\" id=\"changeStatus\" class=\"ok sign\">";
    return icon;
}


const noIcon = () => {
    const icon = "<img src=\"\static/images/no.png\" id=\"changeStatus\" class=\"no sign\">";
    return icon;
}



const resetTable = (table) => {
    table.removeChild(table.lastElementChild);
}


const addNewBookForm = document.querySelector(".popup");
const form = document.querySelector("form");


const openAddNewBookForm = () => {
    form.reset();
    addNewBookForm.classList.add("active");
}

const closeAddNewBookForm = () => {
    addNewBookForm.classList.remove("active");
}

const getInputInformation = () => {
    const title = document.querySelector('input[id="title"]').value;
    const author = document.querySelector('input[id="author"]').value;
    const pages = document.querySelector('input[id="pages"]').value;
    const status = document.querySelector('select[id="status"]').value;

    return new Book(title, author, pages, status);
}

const submitAddNewBookForm = (event) => {

    if (!form.checkValidity()) {
        form.reportValidity();
    }
    else {
        event.preventDefault();
        const newBook = getInputInformation();
        myLibrary.push(newBook);
        addBookToLibrary();
        closeAddNewBookForm();
    }

}

const changeStatus = (classList) => {
    if (classList.contains("ok")) {
        return "no";
    }
    else {
        return "yes";
    }
}

const addBookButton = document.querySelector(".showAdd");
const close_btn = document.querySelector(".close-btn");
const submit = document.querySelector('button[type="submit"]');


addBookButton.addEventListener('click', openAddNewBookForm);
close_btn.addEventListener('click', closeAddNewBookForm);
submit.addEventListener('click', submitAddNewBookForm);


document.addEventListener('click', (e) => {
    if (e.target.classList.contains("sign")) {
        const rIndex = e.target.parentElement.parentElement.rowIndex;
        myLibrary[rIndex - 1].status = changeStatus(e.target.classList);
        addBookToLibrary();
    }
    if (e.target.classList.contains("delete")) {
        const rIndex = e.target.parentElement.parentElement.rowIndex;
        myLibrary.splice(rIndex-1 , 1);
        addBookToLibrary();
    }
})