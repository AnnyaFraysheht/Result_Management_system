import React from 'react'
import "./pagination.css"
const Pagination = ({ currentPage, getPrevPage, getNextPage, totalPage }) => {
    return (
        <div className='pagination'>
            <div className='paginationinside'>
                <button disabled={currentPage == 1} onClick={getPrevPage}> &lt;&lt;&lt; prev </button>
                <h4>{currentPage}</h4>
                <button disabled={currentPage == totalPage} onClick={getNextPage}> next &gt;&gt;&gt; </button>
            </div>
        </div>
    )
}

export default Pagination