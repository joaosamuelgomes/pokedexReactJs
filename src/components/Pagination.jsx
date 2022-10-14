import React from "react";

const Pagination = (props) => {

    const {page, totalPages, onPrevClick, onNextClick} = props;

    return (
        <div className="pagination-container">
            <button onClick={onPrevClick}>
                &lt;
            </button>
            <div>
                {page} de {totalPages}
            </div>
            <button onClick={onNextClick}>
                &gt;
            </button>
        </div>
    )
}

export default Pagination