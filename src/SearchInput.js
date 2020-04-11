import React, {Component} from "react";

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
};

export default SearchInput;