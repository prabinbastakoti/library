

const removeIcon = "<img src=\"\static/images/delete.png\">";
const yes = "<img src=\"\static/images/ok.png\" id=\"changeStatus\">";
const no = "<img src=\"\static/images/no.png\" id=\"changeStatus\">";


let myLibrary = [];


const tableContainer = document.querySelector('.tableContainer');

const submit = document.querySelector('button[type="submit"]');

submit.addEventListener("click", (event) => {

    let isValidForm = document.querySelector("form").checkValidity();
    if (!isValidForm) {
        isValidForm.reportValidity();
    }
    else {
        event.preventDefault();

        const BookTitle = document.querySelector('input[name="title"]');
        const BookAuthor = document.querySelector('input[name="author"]');
        const NoPages = document.querySelector('input[name="pages"]');
        const Readstatus = document.querySelector('#status');

        Book(BookTitle, BookAuthor, NoPages, Readstatus);
        //close popup after submission
        document.querySelector(".popup").classList.remove("active");
        // Clear form after submission
        document.querySelector("form").reset();
    }

});



function Book(BookTitle, BookAuthor, NoPages, Readstatus) {
    const object = {
        title: BookTitle.value,
        author: BookAuthor.value,
        pages: NoPages.value,
        status: Readstatus.value
    }
    //update array
    myLibrary.push(object);

    addBookToLibrary(object);
}

function addBookToLibrary(object) {
    // do stuff here

    const tableRow = document.createElement("tr");

    Object.keys(object).forEach(key => {
        const tableData = document.createElement("td");

        // if the input is selection field
        if (key == 'status') {
            if(object[key] == 'yes') {
                // if the selection is positive , show tick icon
                tableData.innerHTML = yes;
                //add table cell to the row
                tableRow.appendChild(tableData);
            }
            else {
                //if the selection is negative , show cross icon
                tableData.innerHTML = no;
                tableRow.appendChild(tableData);
            }
        }
        // if the input is text field or number field. All fields that is not selection field
        else {
            tableData.innerText = object[key];
            tableRow.appendChild(tableData);
        }
    })
    // add remove button 
    const tableData = document.createElement("td");
    tableData.innerHTML = removeIcon;
    tableRow.appendChild(tableData);

    // add table row to the table 
    tableContainer.appendChild(tableRow);

}

// popup form on click 
document.querySelector(".showAdd").addEventListener("click", function () {
    document.querySelector(".popup").classList.add("active");
});


// close form on click
document.querySelector(".popup .close-btn").addEventListener("click", function () {
    document.querySelector(".popup").classList.remove("active");
});






document.addEventListener("click", (e) => {
    console.log(e.target);
    if (e.target == document.querySelector("img#changeStatus")) {
        console.log("Found");
    }
})




