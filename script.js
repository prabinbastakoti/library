
const removeIcon = "<img src=\"\static/images/delete.png\" id=\"delete\">";
const yes = "<img src=\"\static/images/ok.png\" id=\"changeStatus\" name=\"yes\">";
const no = "<img src=\"\static/images/no.png\" id=\"changeStatus\" name=\"no\">";

let myLibrary = [];

const tableContainer = document.querySelector('.tableContainer tbody');
const submit = document.querySelector('button[type="submit"]');

const BookTitle = document.querySelector('input[name="title"]');
const BookAuthor = document.querySelector('input[name="author"]');
const NoPages = document.querySelector('input[name="pages"]');
const Readstatus = document.querySelector('select#status');

let i = 0;

// popup form on click 
document.querySelector(".showAdd").addEventListener("click", function () {
    document.querySelector(".popup").classList.add("active");
});

// close form on click
document.querySelector(".popup .close-btn").addEventListener("click", function () {
    document.querySelector(".popup").classList.remove("active");
});


// when Submit Button is clicked
submit.addEventListener("click", (event) => {

    let isValidForm = document.querySelector("form").checkValidity();
    if (!isValidForm) {
        isValidForm.reportValidity();
    }
    else {
        //If form is valid , prevent default action of submit button
        event.preventDefault();

        const title = BookTitle.value;
        const author = BookAuthor.value;
        const pages = NoPages.value;
        const status = Readstatus.value;


        Book(title, author, pages, status, removeIcon);

        //close popup after submission
        document.querySelector(".popup").classList.remove("active");
        // Clear form after submission
        document.querySelector("form").reset();
    }

});


function Book(title, author, pages, status, removeIcon) {

    const obj = {
        title: title,
        author: author,
        pages: pages,
        status: status,
        removeIcon: removeIcon
    }

    myLibrary.push(obj);

    addBookToLibrary(obj);

}


function addBookToLibrary(currentObj) {

    const row = tableContainer.insertRow(i);

    let indexCell = 0;

    Object.keys(currentObj).forEach(key => {

        let cell = row.insertCell(indexCell);

        if (key == 'status') {
            if (currentObj[key] == 'yes') {
                cell.innerHTML = yes;
            }
            else {
                cell.innerHTML = no;
            }
        }

        else {
            cell.innerHTML = currentObj[key];
        }

        indexCell++;
    });

    i++;

}


document.addEventListener("click", (e) => {


    // Delete Row if remove button is clicked

    if (e.target == document.querySelector("img#delete")) {

        const deleteRow = e.target.parentElement.parentElement.rowIndex;

        e.target.parentElement.parentElement.remove();

        myLibrary.splice(deleteRow - 1, 1);

    }

    // change status from completed to not read yet and vice versa

    if (e.target == document.querySelector("img#changeStatus")) {

        // change status from completed to not read yet

        if (e.target.name == 'yes') {

            const rIndex = e.target.parentElement.parentElement.rowIndex;

            const cIndex = e.target.parentElement.cellIndex;

            myLibrary[rIndex - 1].status = "no";

            tableContainer.rows[rIndex - 1].cells[cIndex].innerHTML = no;

        }

        //change status from not read yet to completed 

        else {

            const rIndex = e.target.parentElement.parentElement.rowIndex;

            const cIndex = e.target.parentElement.cellIndex;

            myLibrary[rIndex - 1].status = "yes";

            tableContainer.rows[rIndex - 1].cells[cIndex].innerHTML = yes;
        }

    }
})