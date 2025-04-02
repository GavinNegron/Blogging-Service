import React from "react";
import './styles.sass';

type SearchProps = {
    value: string;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void;
};

const Search: React.FC<SearchProps> = ({ value, onChange }) => {
    return (
        <div className='search'>
            <form action='' className='search__form'>
                <input 
                    type='text' 
                    className='search__form-input' 
                    placeholder='Search: '
                    value={value}
                    onChange={onChange}
                />
                <i className="fa-solid fa-magnifying-glass"></i>
            </form>
        </div>
    );
};

export default Search;