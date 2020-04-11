import {Link} from "react-router-dom";
import React from "react";

const OpenSearchButton = () => {
    return (
        <div className="open-search">
            <Link to="search">
                <button>Add a book</button>
            </Link>
        </div>
    );
};

export default OpenSearchButton;