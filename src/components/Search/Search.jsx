import React from 'react'
import { BiSearch } from 'react-icons/bi'

const Search = (handleSearchText) => {
    return (
        <>
            <input type="search" placeholder='search student here..' className='search' name="search" id="search" onChange={handleSearchText} />
            
        </>
    )
}

export default Search