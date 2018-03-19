import React, { Component } from 'react';
import { Header } from './Header';
import { Footer } from './Footer';
import Search from '../container/Search';
import SearchResponse from '../container/SearchResponse';
import { connect } from 'react-redux';
import { checkUserLoggedIn, makeSearch, userIsAttending } from '../actions/bars'; 

const userUrl = '/user';

class App extends Component {
    componentDidMount() {
        if(!this.props.user) {
            this.props.getUser(userUrl);    
        }
    }
    
    render() {
        return(
            <div className="container">
                <Header {...this.props} />
                <Search {...this.props} />
                <SearchResponse {...this.props} />
                <Footer />
            </div>
        );
    }
}

const mapStateToProps = (state) => {
    return {
        bars: state.bars,
        hasErrored: state.barsHaveErrored,
        isLoading: state.barsAreLoading,
        user: state.user
    };
};

const mapDispatchToProps = (dispatch) => {
    return {
        getUser: (url) => dispatch(checkUserLoggedIn(url)),
        search: (url, user, search) => dispatch(makeSearch(url, user, search)),
        attending: (user, index, barId, bars, url) => dispatch(userIsAttending(user, index, barId, bars, url))
    };
};

export default connect(mapStateToProps, mapDispatchToProps)(App);