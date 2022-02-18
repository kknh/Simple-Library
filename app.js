const modalOverlay = document.querySelector('.modal-overlay')
const btnAddBook = document.querySelector('.btn-add-book')
const modalForm = document.querySelector('.modal-form')
const bookSubmitBtn = document.querySelector('.btn-submit')
const titleInput = document.getElementById('title-input')
const authorInput = document.getElementById('author-input')
const pagesInput = document.getElementById('pages-input')
const readInput = document.getElementById('have-you-read')
const booksDisplay = document.querySelector('.books-display')

let myLibrary = JSON.parse(localStorage.getItem('books')) || []

showLibrary()

function showLibrary() {
	const html = myLibrary
		.map((book, i) => {
			return `	<div class="book">
            <div class="display-info">${book.author}</div>
            <div class="display-info">${book.title}</div>
        <div class="display-info">${book.pages}</div>
        <button type="button" class="btn btn-read-status ${
					book.read ? 'read' : ''
				}" data-bookid=${i}>${book.read ? 'Read' : 'Not read'}</button>
        <button type="reset" class="btn btn-remove-book" data-bookid=${i}>Remove</button>
        </div>`
		})
		.join('')
	booksDisplay.innerHTML = html

	btnReadStatusFunction()
	btnRemoveFunction()
}

function btnReadStatusFunction() {
	const btnReadStatus = document.querySelectorAll('.btn-read-status')
	if (btnReadStatus) {
		btnReadStatus.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				const book = e.target
				const id = book.dataset.bookid
				myLibrary[id].read = !myLibrary[id].read
				localStorage.setItem('books', JSON.stringify(myLibrary))
				book.classList.toggle('read')
				book.innerText = book.innerText === 'Read' ? 'Not read' : 'Read'
			})
		})
	}
}

function btnRemoveFunction() {
	const btnRemoveBook = document.querySelectorAll('.btn-remove-book')
	if (btnRemoveBook) {
		btnRemoveBook.forEach((btn) => {
			btn.addEventListener('click', (e) => {
				const book = e.target
				const id = book.dataset.bookid
				myLibrary.splice(id, 1)
				localStorage.setItem('books', JSON.stringify(myLibrary))
				showLibrary()
			})
		})
	}
}

btnAddBook.addEventListener('click', () =>
	modalOverlay.classList.add('modal-visible')
)

modalOverlay.addEventListener('click', (e) => {
	if (e.target.classList.contains('modal-overlay')) {
		modalOverlay.classList.remove('modal-visible')
	} else return
})

bookSubmitBtn.addEventListener('click', (e) => {
	const title = titleInput.value
	const author = authorInput.value
	const pages = pagesInput.value
	const read = readInput.checked
	const book = {
		title,
		author,
		pages,
		read,
	}
	if (title && author && pages) {
		myLibrary.push(book)
		localStorage.setItem('books', JSON.stringify(myLibrary))
		modalOverlay.classList.remove('modal-visible')
		showLibrary()
	}
})
