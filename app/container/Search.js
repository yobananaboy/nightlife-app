import React, { Component } from 'react';
import { SearchInput } from '../component/SearchInput';

const searchUrl = '/getBars';

class Search extends Component {
    // make search on form submit
    handleSubmit = (e) => {
        e.preventDefault();
        if(this.searchTerm.value.length > 1) {
            this.props.search(searchUrl, this.props.user, this.searchTerm.value);   
        }
    }
    render() {
        return(
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 search">
                    <SearchInput  searchTerm={input => this.searchTerm = input} onSubmit={this.handleSubmit} user={this.props.user} />
                </div>
            </div>
        );
    }    
}

export default Search;