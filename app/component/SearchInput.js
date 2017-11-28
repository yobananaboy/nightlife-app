import React from 'react';
import emoji from 'react-easy-emoji'

export const SearchInput = (props) => {
    return(
        <form onSubmit={props.onSubmit}>
            <div className="input-group">
                <input type="text" className="form-control" type="text" ref={props.searchTerm} aria-label="Search" placeholder={props.user.lastSearch} />
                <span className="input-group-btn">
                    <button className="btn btn-secondary" type="submit">{emoji('Go 🔥')}</button>
                </span>
            </div>
        </form>
        );
};