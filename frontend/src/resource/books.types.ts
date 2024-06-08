interface BookTypes {
    title: string
    author: string
    coverPhotoURL: string
    readingLevel: string
}

interface BookQueryTypes {
    books: Array<BookTypes>
}

export type { BookQueryTypes, BookTypes }