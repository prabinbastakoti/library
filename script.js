
const removeIcon = "<img src=\"\static/images/delete.png\" id=\"delete\">";
const yes = "<img src=\"\static/images/ok.png\" id=\"changeStatus\">";
const no = "<img src=\"\static/images/no.png\" id=\"changeStatus\">";

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

    console.log(myLibrary);

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
    const del = e.target;
    
    console.log(del.parentElement.rowIndex);
    console.log(del.cellIndex);
    console.log(e.target);
})