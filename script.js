
function Book(title, author, pages, read) {
    this.title = title;
    this.author = author;
    this.pages = pages;
    this.read = read;
    this.info = function() {
        const information = `${title} by ${author}, ${pages} pages, ${read}`;
        return information; 
    }
}

const theAlchemist = new Book("The Alchemist" , "Paulo Coelho", 183, "done reading");
const thinketh = new Book("As a man thinketh", "James Allen" , 95, "not read yet");
const nineTeenEightyFour = new Book("1984", "George Orwell" , 331, "not read yet");
const theHobbit = new Book("The Hobbit", "J.R.R. Tolkien" , 295, "not read yet");

console.log(theHobbit.info());










document.querySelector(".showAdd").addEventListener("click" ,function() {
    document.querySelector(".popup").classList.add("active");
});

document.querySelector(".popup .close-btn").addEventListener("click" ,function() {
    document.querySelector(".popup").classList.remove("active");
});