import { BookTypes } from "../resource/books.types";

const addBookToLocalStorage = (book: BookTypes) => {
    try {
        let books = fetchBooksFromLocaStorage();
        if (books.length > 0) {
            let i = books.findIndex((value) => value.title === book.title && value.author === book.title);
            if (i < 0) {
                // Add to local storage
                books.push(book);
                window.localStorage.setItem("reading_list", JSON.stringify(books));
                return `The Book ${book.title} has been added to the reading list.`;
            }
            return `The Book ${book.title} has already been added to the reading list.`;
        }
        window.localStorage.setItem("reading_list", JSON.stringify([book]));
        return `The Book ${book.title} has been added to the reading list.`;
    } catch (err) {
        return `The Book ${book.title} was not added to the reading list.`;
    }
}

const fetchBooksFromLocaStorage = () => {
    let lclData = window.localStorage.getItem("reading_list");
    if (lclData) {
        let parsedData = JSON.parse(lclData);
        let books: Array<BookTypes> = parsedData;
        return books;
    }
    return [];
}

const removeBookFromLocalStorage = (book: BookTypes) => {
    try {
        let books = fetchBooksFromLocaStorage();
        if (books.length > 0) {
            let filteredBooks = books.filter((value) => value.title !== book.title && value.author !== book.title);
            // Add to local storage
            window.localStorage.setItem("reading_list", JSON.stringify(filteredBooks));
            return `The Book ${book.title} has been removed from the reading list.`;
        }
        return `There are not saved Books in the reading list.`;
    } catch (err) {
        return `The Book ${book.title} was not removed from the reading list.`;
    }
}

const clearLocalStorage = () => {
    try {
        window.localStorage.clear();
        return `The reading list was cleared.`;
    } catch (err) {
        return `The reading list was not cleared.`;
    }
}

export { addBookToLocalStorage, fetchBooksFromLocaStorage, removeBookFromLocalStorage, clearLocalStorage }