import React, {Component} from "react";
import SearchBar from './SearchBar';
import Searchresults from './Searchresults';

class BookSearch extends Component {
    render() {
        const {books, booksearch, onSearch, onSearchReset, onMove} = this.props;
        return (
            <div className="search-books">
                <SearchBar onSearch={onSearch} onSearchReset={onSearchReset}/>
                <Searchresults books={books} booksearch={booksearch} onMove={onMove}/>
            </div>
        );
    }
};

export default BookSearch;