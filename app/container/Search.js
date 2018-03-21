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
        if(this.state.search.length > 1) {
            this.setState({
                search: '',
                err: ''
            });
            this.props.search('/getBars', this.props.user, this.state.search);  
        } else {
            this.setState({ err: 'Please enter more than one character for a search term' });
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