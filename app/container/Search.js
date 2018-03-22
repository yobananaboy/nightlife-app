import React, { Component } from 'react';
import emoji from 'react-easy-emoji';

class Search extends Component {
    constructor(props) {
        super(props);
        this.state = {
            search: '',
            err: ''
        };
        
        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleChange = this.handleChange.bind(this);
        
    }

    handleSubmit = (e) => {
        e.preventDefault();
        
        // if search is one character or less and there is no previous search from user, show an error
        if(this.state.search.length < 2 && !this.props.user.lastSearch) {
            this.setState({ err: 'Please enter more than one character for a search term' });
        } else {
            // else search for either the user inputted search term or, if there is none, their last search
            let search = this.state.search ? this.state.search : this.props.user.lastSearch;
            this.setState({
                search: '',
                err: ''
            });
            this.props.search('/getBars', this.props.user, search);  
        }
        
    }
    
    handleChange = (e) => {
        this.setState({ search: e.target.value });
    }


    render() {
        return(
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 search">
                    <form onSubmit={this.handleSubmit}>
                        <div className="input-group">
                            <input type="text" className="form-control" type="text" value={this.state.search} aria-label="Search" placeholder={this.props.user.lastSearch} onChange={this.handleChange} />
                            <span className="input-group-btn">
                                <button className="btn btn-secondary" type="submit">{emoji('Go 🔥')}</button>
                            </span>
                        </div>
                    </form>
                    <p className="error">{this.state.err}</p>
                </div>
            </div>
        );
    }    
}

export default Search;