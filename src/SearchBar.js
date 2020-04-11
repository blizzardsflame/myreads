import React from "react";
import CloseButton from "./CloseButton";
import SearchInput from "./SearchInput";

const SearchBar = props => {
    const {onSearch, onSearchReset} = props;
    return (
        <div className="search-books-bar">
            <CloseButton onSearchReset={onSearchReset}/>
            <SearchInput onSearch={onSearch}/>
        </div>
    );
};

export default SearchBar;