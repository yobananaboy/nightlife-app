import React from 'react';
import { BarListing } from '../component/BarListing';

export const SearchResults = (props) => {
        let listItems = props.bars.map((bar, index) => {
            return <BarListing data={bar} user={props.user} index={index} onClick={props.onClick} />;
        });
    
    return(
        <ul className="list-group">
            {listItems}
        </ul>        
        );

};