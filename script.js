class Book {
    constructor(title, author, pageRead, totalPage, defaultBook = false, readonly = false) {
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
let edit = document.querySelector('.edit-book');
const search = document.querySelector('.search input');
let myLibrary = [];
displayDefaultBook();

//event
addNewBook.addEventListener('click', addBookToLibrary);
tbody.addEventListener('click', (e) => {
    if (e.target.classList.contains('edit-book'))
        editBook(e);
    if (e.target.classList.contains('del-book')) {
        delRow(e);
    }
});
search.addEventListener('keyup', searchFunction);

//method

function displayDefaultBook() {
    const newBook1 = new Book('Harry Potter', 'JK Rowling', 3000, 3000, true, true);
    const newBook2 = new Book('Wednesday', 'Tehlor Kay Mejia', 521, 1521, true, true);
    const newBook3 = new Book('The Great Gatsby', 'F. Scott Fitzgerald', 65, 206, true, true);
    const newBook4 = new Book('Pride and Prejudice', 'Jane Austen', 25, 184, true, true);
    myLibrary.push(newBook1, newBook2, newBook3, newBook4);
    renderUI();

}
function addBookToLibrary() {
    const newBook = new Book("", "", "", "");
    myLibrary.push(newBook);
    renderUI();

}

function renderUI() {
    tbody.innerHTML = "";
    let count = 0;
    myLibrary.forEach(function (book) {

        //if already exit in DOM than skip instead of rendering.
        // if(tbody.innerHTML.includes(book.id)) return; 

        tbody.insertAdjacentHTML('beforeend', `
        <tr id="${book.id}">
                    <th>${++count}</th>
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
        const editBtn = row.querySelector('.edit-book');


        inputs.forEach(input => {
            progressBar.max = book.totalPage;
            progressBar.value = book.pageRead;

            input.readOnly = book.readOnly;
            input.classList.toggle('addInputBorder', !book.readOnly);

        })

        //styling button:
        changeButtonBG(editBtn, book);
    })

}

function editBook(e) {

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
        if (book.id === bookID) {
            //updating data after edit
            book.title = rowTitle.value === "" ? "" : rowTitle.value;
            book.author = rowAuthor.value === "" ? "" : rowAuthor.value;
            book.pageRead = rowPageRead.value;
            book.totalPage = rowTotalPage.value;
            rowProgressBar.max = book.totalPage;
            rowProgressBar.value = book.pageRead;

            //notifying title and author should not be empty else send alert.
            //if both value present than toggle readonly else reportValidity();
            if (book.title && book.author) {
                book.readOnly = book.readOnly ? false : true;
                inn.forEach(input => {
                    //add class when in edit mode and update readonly attribute.
                    input.readOnly = book.readOnly;
                    input.classList.toggle('addInputBorder', !book.readOnly);
                    changeButtonBG(e.target, book);
                })
            } else {
                rowAuthor.reportValidity();
                rowTitle.reportValidity();
            }
        }
    })
    styleRow(rowProgressBar, inn);
}

function changeButtonBG(editBtn, obj) {
    if (!obj.readOnly) {
        editBtn.style.backgroundColor = '#4CAF50';
        editBtn.style.color = 'white';
    } else {
        editBtn.style.backgroundColor = "";
        editBtn.style.color = "";
    }
}

function delRow(e) {
    const trow = e.target.closest('tr');
    console.log(e)
    myLibrary.forEach(book => {
        if (book.id === trow.id) {
            trow.remove();
        }
    })
    myLibrary = myLibrary.filter(book => book.id !== trow.id);
    renderUI();
}

function searchFunction(e) {
    let searchTerm = search.value.toLowerCase();
    let body = e.target.closest('body');
    let trows = body.querySelectorAll('tbody tr');

    if (searchTerm == "") {
        trows.forEach(row => row.classList.remove('hidden'));
        return;
    }
    //  console.log(trows)
    trows.forEach(row => {
        const book = myLibrary.find(b => b.id === row.id);
        if (book && (book.title.toLowerCase().includes(searchTerm) || book.author.toLowerCase().includes(searchTerm))) {
            row.classList.remove('hidden');
        } else {
            row.classList.add('hidden');
        }
    });

}

function styleRow(progressElement, inn) {
    // console.log(progressElement)

    if (parseFloat(progressElement.max) === parseFloat(progressElement.value)) {
        // console.log("hi");
        inn.forEach(input => input.style.textDecoration = 'line-through')
    } else {
        inn.forEach(input => input.style.textDecoration = 'none');
    }
}

