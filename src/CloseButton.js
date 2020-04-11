import {Link} from "react-router-dom";
import React from "react";

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

export default CloseButton;