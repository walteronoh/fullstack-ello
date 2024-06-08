interface BookTypes {
    title: String
    author: String
    coverPhotoURL: String
    readingLevel: String
}

interface BookQueryTypes {
    books: Array<BookTypes>
}

export type { BookQueryTypes }