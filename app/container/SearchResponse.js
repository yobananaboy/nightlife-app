import React, { Component } from 'react';
import { SearchResults } from '../component/SearchResults';

const attendUrl = '/userIsAttending';

class SearchResponse extends Component {
    // handle user clicking button to attend
    handleClick = (e) => {
        e.preventDefault();
        // get id of button clicked, which corresponds to bar in array of bars
        let id = +e.target.id;
        // get the bar id
        let barId = this.props.bars[id]._id;
        // call our action creator
        this.props.attending(this.props.user, barId, this.props.bars, attendUrl);
    };
    
    render() {
        let searchResults = "";
        if(this.props.bars.length > 1) {
            searchResults = <SearchResults {...this.props} onClick={this.handleClick} />;
        }
        if(this.props.isLoading) {
            searchResults =  <div className="loader">Loading...</div>;
        }
        if(this.props.barsHaveErrored) {
            searchResults = <p>{this.props.barsHaveErrored}</p>;
        }
        return (
            <div className="row justify-content-center">
                <div className="col-12 col-md-10 search-results">
                    {searchResults}
                </div>
            </div>
            );
    }
}

export default SearchResponse;