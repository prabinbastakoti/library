
const removeIcon = "<img src=\"\static/images/delete.png\" id=\"delete\">";
const yes = "<img src=\"\static/images/ok.png\" id=\"changeStatus\" class=\"ok\">";
const no = "<img src=\"\static/images/no.png\" id=\"changeStatus\" class=\"no\">";

let myLibrary = [{ title: "The Alchemist", author: "Paulo Coehlo", pages: "312", status: "yes", removeIcon: "<img src=\"static/images/delete.png\" id=\"delete\">" },
                    { title: "As a man Thinketh", author: "James Allen", pages: "112", status: "no", removeIcon: "<img src=\"static/images/delete.png\" id=\"delete\">"},
                    {title: "1984", author: "George Orwell", pages: "432", status: "yes" , removeIcon: "<img src=\"static/images/delete.png\" id=\"delete\">"}];

const tableContainer = document.querySelector('.tableContainer tbody');
const submit = document.querySelector('button[type="submit"]');

const BookTitle = document.querySelector('input[name="title"]');
const BookAuthor = document.querySelector('input[name="author"]');
const NoPages = document.querySelector('input[name="pages"]');
const Readstatus = document.querySelector('select#status');

let i = 3;

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

let deleteElement = document.querySelectorAll('img#delete');


deleteElement.forEach((item) => {
    item.addEventListener('click', () => {
        const index = item.parentElement.parentElement.rowIndex;
        item.parentElement.parentElement.remove();
        myLibrary.splice(index - 1 , 1);
        i--;
    })
});


document.addEventListener("click", (e) => {

    if(e.target.classList.contains("ok")) {

        let element = e.target;
        element.src = "static/images/no.png";
        element.classList.remove("ok");
        element.classList.add("no");

        let rIndex = element.parentElement.parentElement.rowIndex;

        myLibrary[rIndex - 1].status = "no";

    }
    else if(e.target.classList.contains("no")) {

        let element = e.target;
        element.src = "static/images/ok.png";
        element.classList.remove("no");
        element.classList.add("ok");

        let rIndex = element.parentElement.parentElement.rowIndex;

        myLibrary[rIndex - 1].status = "yes";
    }
});



























