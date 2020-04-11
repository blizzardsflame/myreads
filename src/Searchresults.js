import React from "react";
import Book from './Book';

const Searchresults = props => {
    const {books, booksearch, onMove} = props;
    const updateBook = booksearch.map(book => {
        books.map(bk => {
            if (bk.id === book.id) {
                book.shelf = bk.shelf;
            }
            return bk;
        });
        return book;
    });
    return (
        <div className="search-books-results">
            <ol className="books-grid">
                {updateBook.map(book => (
                    <Book key={book.id}
                          book={book}
                          shelf={book.shelf ? book.shelf : 'none'}
                          onMove={onMove}/>
                ))}
            </ol>
        </div>
    );
};

export default Searchresults;