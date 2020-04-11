import React, {Component} from 'react';
import {Route} from 'react-router-dom';
import './App.css';
import * as BooksAPI from './BooksAPI';
import {debounce} from 'throttle-debounce';
import ListBooks from './ListBooks';
import BookSearch from './BookSearch';


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
};

export default BooksApp;
