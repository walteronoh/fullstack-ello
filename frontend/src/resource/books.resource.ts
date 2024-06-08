import { gql } from "@apollo/client";

const BooksQuery = gql`
query GetBooks {
    books {
    author
    coverPhotoURL
    readingLevel
    title
  }
}
`;
export { BooksQuery }