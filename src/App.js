import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';
import data from './Data';

class BooksApp extends Component {
    bookshelves = [
        { key: 'currentlyReading', name: 'Currently Reading' },
        { key: 'wantToRead', name: 'Want to Read' },
        { key: 'read', name: 'Have Read' },
    ];
  state = {
      books : data,
  };
  render() {
      const { books } = this.state;
    return (
        <div className="app">
          <Route exact path="/"
                 render={() => (
                     <ListBooks bookshelves={this.bookshelves} books={books} />
                     )}
          />
          <Route path="/search" render={() => <BookSearch books={books} />}/>
        </div>
    );
  }
}

class ListBooks extends Component{
    render(){
        const { bookshelves, books } = this.props;
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <Bookfloor bookshelves={bookshelves} books={books} />
                <OpenSearchButton />
            </div>
        )
    }
}

const Bookfloor = props => {
    const { bookshelves, books } = props;
    return(
        <div className="list-books-content">
            <div>
                {bookshelves.map(shelf => (
                    <Bookshelf key={shelf.key} shelf={shelf} books={books} />
                ))}
            </div>
        </div>
    );
};

const Bookshelf = props => {
    const { shelf, books } = props;
    const shelfsBook = books.filter(book => book.shelf === shelf.key);
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf.name}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    {shelfsBook.map(book => (
                        <Book key={book.id} book={book} shelf={shelf.key}/>
                    ))
                    }
                </ol>
            </div>
        </div>
    );
};

const Book = props => {
    const { book, shelf } = props;
    return(
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
                <BookshelfChanger book={book} shelf={shelf} />
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors.join(', ')}</div>
        </div>
        </li>
    );
};

const OpenSearchButton = () => {
        return(
            <div className="open-search">
                <Link to="search">
                <button>Add a book</button>
                </Link>
            </div>
        );
};

class BookshelfChanger extends Component{
    render() {
        return(
            <div className="book-shelf-changer">
                <select>
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

class BookSearch extends Component{
    render(){
        const { books } = this.props;
        return(
            <div className="search-books">
                <SearchBar />
                <Searchresults books={books} />
            </div>
        );
    }
}

const SearchBar = props => {
    return(
        <div className="search-books-bar">
            <CloseButton />
            <SearchInput />
        </div>
    );
};

const CloseButton = () => {
    return(
        <Link to="/">
        <button className="close-search">Close</button>
        </Link>
    );
};

class SearchInput extends Component{
    render() {
        return(
            <div className="search-books-input-wrapper">
                <input type="text" placeholder="Search by title or author" />
            </div>
        );
}}

const Searchresults = props =>{
    const { books } = props;
    return(
        <div className="search-books-results">
            <ol className="books-grid">
                {books.map(book => (
                    <Book key={book.id} book={book} shelf="none"/>
                ))}
            </ol>
        </div>
    );
};

export default BooksApp;
