import React, {Component} from 'react';
import {Route, Link} from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import {debounce} from 'throttle-debounce';


class BooksApp extends Component {
    bookshelves = [
        {key: 'currentlyReading', name: 'Currently Reading'},
        {key: 'wantToRead', name: 'Want to Read'},
        {key: 'read', name: 'Have Read'},
    ];
    state = {
        books: [],
        booksearch: [],
    };

    componentDidMount = () => {
        BooksAPI.getAll().then(books => {
            this.setState({books: books});
        });
    };

    //function to update the book shelf
    moveBookshelf = (book, shelf) => {
        BooksAPI.update(book, shelf);

        let updateBookshelf = [];
        updateBookshelf = this.state.books.filter(bk => bk.id !== book.id);

            if (shelf !== 'none') {
                book.shelf = shelf;
                updateBookshelf = updateBookshelf.concat(book);
            }

        this.setState({
            books: updateBookshelf,
        });
    };

    //function for search
    searchBook = debounce(300, false, query => {
        if (query.length > 0) {
            BooksAPI.search(query).then(books => {
                if (books.error) {
                    this.setState({booksearch: []});
                } else {
                    this.setState({booksearch: books});
                }
            });
        } else {
            this.setState({booksearch: []});
        }
    });
    //reseting the search
    searchReset = () => {
        this.setState({booksearch: []});
    };

    render() {
        const {books, booksearch} = this.state;
        return (
            <div className="app">
                <Route exact path="/"
                       render={() => (
                           <ListBooks bookshelves={this.bookshelves}
                                      books={books} onMove={this.moveBookshelf}/>
                       )}
                />
                <Route path="/search" render={() => <BookSearch books={books}
                                                                booksearch={booksearch}
                                                                onSearch={this.searchBook}
                                                                onSearchReset={this.searchReset}
                                                                onMove={this.moveBookshelf}/>}/>
            </div>
        );
    }
}

class ListBooks extends Component {
    render() {
        const {bookshelves, books, onMove} = this.props;
        return (
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <Bookfloor bookshelves={bookshelves} books={books} onMove={onMove}/>
                <OpenSearchButton/>
            </div>
        )
    }
}

const Bookfloor = props => {
    const {bookshelves, books, onMove} = props;
    return (
        <div className="list-books-content">
            <div>
                {bookshelves.map(shelf => (
                    <Bookshelf key={shelf.key} shelf={shelf} books={books} onMove={onMove}/>
                ))}
            </div>
        </div>
    );
};

const Bookshelf = props => {
    const {shelf, books, onMove} = props;
    const shelfsBook = books.filter(book => book.shelf === shelf.key);
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf.name}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {shelfsBook.map(book => (
                        <Book key={book.id} book={book} shelf={shelf.key} onMove={onMove}/>
                    ))
                    }
                </ol>
            </div>
        </div>
    );
};

const Book = props => {
    const {book, shelf, onMove} = props;
    return (
        <li>
            <div className="book">
                <div className="book-top">
                    <div
                        className="book-cover"
                        style={{
                            width: 128,
                            height: 192,
                            backgroundImage: `url(${book.imageLinks.thumbnail})`,
                        }}
                    />
                    <BookshelfChanger book={book} shelf={shelf} onMove={onMove}/>
                </div>
                <div className="book-title">{book.title}</div>
                <div className="book-authors">
                    {book.authors && book.authors.join(', ')}</div>
            </div>
        </li>
    );
};

const OpenSearchButton = () => {
    return (
        <div className="open-search">
            <Link to="search">
                <button>Add a book</button>
            </Link>
        </div>
    );
};

class BookshelfChanger extends Component {
    state = {
        val: this.props.shelf,
    };
    handleChange = event => {
        this.setState({val: event.target.value});
        this.props.onMove(this.props.book, event.target.value);
    };

    render() {
        return (
            <div className="book-shelf-changer">
                <select value={this.state.val} onChange={this.handleChange}>
                    <option value="move" disabled>
                        Move to...
                    </option>
                    <option value="currentlyReading">
                        Currently Reading
                    </option>
                    <option value="wantToRead">Want to Read</option>
                    <option value="read">Read</option>
                    <option value="none">None</option>
                </select>
            </div>
        );
    }
}

class BookSearch extends Component {
    render() {
        const {books, booksearch, onSearch, onSearchReset, onMove} = this.props;
        return (
            <div className="search-books">
                <SearchBar onSearch={onSearch} onSearchReset={onSearchReset} />
                <Searchresults books={books} booksearch={booksearch} onMove={onMove} />
            </div>
        );
    }
}

const SearchBar = props => {
    const {onSearch, onSearchReset} = props;
    return (
        <div className="search-books-bar">
            <CloseButton onSearchReset={onSearchReset}/>
            <SearchInput onSearch={onSearch}/>
        </div>
    );
};

const CloseButton = props => {
    const {onSearchReset} = props;
    return (
        <Link to="/">
            <button className="close-search" onClick={onSearchReset}>
                Close
            </button>
        </Link>
    );
};

class SearchInput extends Component {
    state = {
        val: "",
    };
    handleChange = event => {
        const value = event.target.value;
        this.setState({val: value}, () => {
            this.props.onSearch(value);
        });
    };

    render() {
        return (
            <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author"
                       value={this.state.val} onChange={this.handleChange} autoFocus/>
            </div>
        );
    }
}

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
                          onMove={onMove} />
                ))}
            </ol>
        </div>
    );
};

export default BooksApp;
