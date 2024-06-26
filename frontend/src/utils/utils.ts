import { BookTypes } from "../resource/books.types";

const addBookToLocalStorage = (book: BookTypes) => {
    try {
        let books = fetchBooksFromLocaStorage();
        if (books.length > 0) {
            let i = books.findIndex((value) => value.title === book.title && value.author === book.author);
            if (i < 0) {
                // Add to local storage
                books.push(book);
                window.localStorage.setItem("reading_list", JSON.stringify(books));
                return {
                    message: `The Book ${book.title} has been added to the reading list.`,
                    severity: "success"
                }
            }
            return {
                message: `The Book ${book.title} has already been added to the reading list.`,
                severity: "warning"
            }
        }
        window.localStorage.setItem("reading_list", JSON.stringify([book]));
        return {
            message: `The Book ${book.title} has been added to the reading list.`,
            severity: "success"
        }
    } catch (err) {
        return {
            message: `The Book ${book.title} was not added to the reading list.`,
            severity: "error"
        }
    }
}

const fetchBooksFromLocaStorage = () => {
    try {
        let lclData = window.localStorage.getItem("reading_list");
        if (lclData) {
            let parsedData = JSON.parse(lclData);
            let books: Array<BookTypes> = parsedData;
            return books;
        }
        return [];
    } catch (err) {
        return [];
    }
}

const removeBookFromLocalStorage = (book: BookTypes) => {
    try {
        let books = fetchBooksFromLocaStorage();
        if (books.length > 0) {
            let filteredBooks = books.filter((value) => value.title !== book.title && value.author !== book.author);
            // Add to local storage
            window.localStorage.setItem("reading_list", JSON.stringify(filteredBooks));
            return {
                message: `The Book ${book.title} has been removed from the reading list.`,
                severity: "success"
            }
        }
        return {
            message: `There are not saved Books in the reading list.`,
            severity: "warning"
        }
    } catch (err) {
        return {
            message: `The Book ${book.title} was not removed from the reading list.`,
            severity: "error"
        }
    }
}

const clearLocalStorage = () => {
    try {
        window.localStorage.clear();
        return {
            message: `The reading list was cleared.`,
            severity: "success"
        }
    } catch (err) {
        return {
            message: `The reading list was not cleared.`,
            severity: "error"
        }
    }
}

export { addBookToLocalStorage, fetchBooksFromLocaStorage, removeBookFromLocalStorage, clearLocalStorage }