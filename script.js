
class Book{
    constructor(title, author, pageRead, totalPage, defaultBook = false, readonly = false){
        this.title = title;
        this.author = author;
        this.pageRead = pageRead;
        this.totalPage = totalPage;
        this.id = `unique-${crypto.randomUUID().split('-').at(-1)}`;
        this.readOnly = readonly;
        this.defaultBook = defaultBook;
    }
}


let addNewBook = document.querySelector('.add-new');
let tbody = document.querySelector('.table-body');
let trow = document.querySelectorAll('tbody tr');
let deleteBookBtn = document.querySelector('.del-book');
const editBookBtn = document.querySelectorAll('.edit-book');
let edit = document.querySelector('.edit-book');
const myLibrary = [];
displayDefaultBook();

//event
addNewBook.addEventListener('click', addBookToLibrary);
// deleteBookBtn.addEventListener('click', deleteBookFrom)
tbody.addEventListener('click', (e) =>{
    if(e.target.classList.contains('edit-book'))
        editBook(e);
})

//method

function displayDefaultBook(){
    const newBook1 = new Book('Harry Potter', 'JK Rowling', 50, 100, true, true);
    const newBook2 = new Book('Wednesday', 'JK Rowling', 65, 235, true, true);
    const newBook3 = new Book('Bridge to Terribettia', 'JK Rowling', 66, 25, true, true);
    const newBook4 = new Book('Alita - Battle Angel', 'JK Rowling', 25, 214, true, true);
    myLibrary.push(newBook1, newBook2, newBook3, newBook4);
    renderUI();
    
}
function addBookToLibrary(){
    const newBook = new Book("", "", "", "" );
    myLibrary.push(newBook);
    renderUI();

}

function renderUI() {
    tbody.innerHTML = "";
    let count = 0;
    myLibrary.forEach(book => {

        //if already exit in DOM than skip instead of rendering.
        // if(tbody.innerHTML.includes(book.id)) return; 

        tbody.insertAdjacentHTML('beforeend', `
        <tr id="${book.id}">
                    <td>${++count}</td>
                    <td><input type="text" required placeholder="Harry Potter" value="${book.title}" class="row-title input-field" /></td>
                    <td><input type="text" required placeholder="JK Rowling" value="${book.author}" class="row-author input-field"/></td>
                    <td><input type="number" placeholder="0" value="${book.pageRead}" class="row-pageRead input-field"/></td>
                    <td><input type="number" placeholder="0" value="${book.totalPage}" class="row-page input-field"/></td>
                    <td><progress max="${book.totalPage}" value="${book.pageRead}" class="progress-bar"></progress></td>
                    <td>
                        <button class="edit-book">Edit</button>
                        <button class="del-book">Delete</button>
                    </td> 
        </tr>
        `);
        const row = tbody.querySelector(`#${book.id}`);
        const inputs = row.querySelectorAll('input');
        const progressBar = row.querySelector('.progress-bar')


        inputs.forEach(input => {
            progressBar.max = book.totalPage;
            progressBar.value = book.pageRead;
            
            input.readOnly = book.readOnly;
            input.classList.toggle('addInputBorder', !book.readOnly);
        })
    })

}

function editBook(e){

    const button = e.target;
    //learn something new
    const row = button.closest('tr');
    const bookID = row.id;
    const inn = row.querySelectorAll('input');
    const rowTitle = row.querySelector('.row-title');
    const rowAuthor = row.querySelector('.row-author');
    const rowPageRead = row.querySelector('.row-pageRead');
    const rowTotalPage = row.querySelector('.row-page');
    const rowProgressBar = row.querySelector('.progress-bar');

    myLibrary.forEach(book => {
        if(book.id === bookID){
            //updating data after edit
            
            book.author = rowAuthor.value;
            book.pageRead = rowPageRead.value;
            book.totalPage = rowTotalPage.value;
            rowProgressBar.max = book.totalPage;
            rowProgressBar.value = book.pageRead;
            
            if(book.readOnly == true){
                book.readOnly = "";
                inn.forEach(inputs => {
                    inputs.readOnly = false;
                    inputs.classList.add('addInputBorder');
                    console.log(book.id);
            })
            }else{
                if(book.title){
                    book.readOnly = true;
                    inn.forEach(inputs => {
                        inputs.readOnly = true;
                        inputs.classList.remove('addInputBorder');
                    })
                }else{
                    book.title = "";
                    rowTitle.reportValidity();

                }
            }
            
           

            
        }
    })
}
 