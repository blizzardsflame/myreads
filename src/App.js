import React, { Component } from 'react';
import { Route, Link } from 'react-router-dom';
import './App.css';

class BooksApp extends Component {
  state = {};
  render() {
    return (
        <div className="app">
          <Route exact path="/" component={ListBooks}/>
          <Route path="/search" component={BookSearch}/>
        </div>
    );
  }
}

class ListBooks extends Component{
    render(){
        const { bookshelves } = this.props;
        return(
            <div className="list-books">
                <div className="list-books-title">
                    <h1>MyReads</h1>
                </div>
                <Bookfloor bookshelves={bookshelves} />
                <OpenSearchButton />
            </div>
        )
    }
}

const Bookfloor = props => {
    const { bookshelves } = props;
    return(
        <div className="list-books-content">
            <div>
                {bookshelves.map(shelf => (
                    <Bookshelf key={shelf.key} shelf={shelf} />
                ))}
            </div>
        </div>
    );
};

const Bookshelf = props => {
    const { shelf } = props;
    return (
        <div className="bookshelf">
            <h2 className="bookshelf-title">{shelf.name}</h2>
            <div className="bookshelf-books">
                <ol className="books-grid">
                    <Book book={{}}/>
                </ol>
            </div>
        </div>
    );
};

const Book = props => {
    const { book } = props;
    return(
        <li>
        <div className="book">
            <div className="book-top">
                <div
                    className="book-cover"
                    style={{
                        width: 128,
                        height: 192,
                        backgroundImage:
                            'url("http://books.google.com/books/content?id=32haAAAAMAAJ&printsec=frontcover&img=1&zoom=1&imgtk=AFLRE72yckZ5f5bDFVIf7BGPbjA0KYYtlQ__nWB-hI_YZmZ-fScYwFy4O_fWOcPwf-pgv3pPQNJP_sT5J_xOUciD8WaKmevh1rUR-1jk7g1aCD_KeJaOpjVu0cm_11BBIUXdxbFkVMdi&source=gbs_api")',
                    }}
                />
                <BookshelfChanger />
            </div>
            <div className="book-title">{book.title}</div>
            <div className="book-authors">{book.authors}</div>
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
        return(
            <div className="search-books">
                <div className="search-books-bar">
                    <button
                        className="close-search"
                        onClick={() => this.setState({ showSearchPage: false })}
                    >
                        Close
                    </button>
                    <div className="search-books-input-wrapper">
                        {/*
                  NOTES: The search from BooksAPI is limited to a particular set of search terms.
                  You can find these search terms here:
                  https://github.com/udacity/reactnd-project-myreads-starter/blob/master/SEARCH_TERMS.md

                  However, remember that the BooksAPI.search method DOES search by title or author. So, don't worry if
                  you don't find a specific author or title. Every search is limited by search terms.
                */}
                        <input type="text" placeholder="Search by title or author" />
                    </div>
                </div>
                <div className="search-books-results">
                    <ol className="books-grid" />
                </div>
            </div>
        )
    }
}

export default BooksApp;
