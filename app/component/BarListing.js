import React from 'react';

export const BarListing = (props) => {
    
    let peopleGoing = props.data.peopleGoing.map(person => {
        return <img className="float-left profile-img" src={person.img} alt="Profile picture" />;
    });
    
    let button = <p className="float-right">{props.data.peopleGoing.length} going</p>;
    
    if(props.user._id) {
        button = <button className="btn btn-primary float-right" id={props.index} onClick={props.onClick}>{props.data.peopleGoing.length} going</button>;
    }
    
    return(
        <li className="list-group-item">
            <div className="row">
                <div className="col-3">
                    <img src={props.data.img} alt={props.data.name} className="img-fluid" />
                </div>
                <div className="col-9">
                    <div className="row">
                        <div className="col-8">
                            <h5><a href={props.data.url} target="_blank">{props.data.name}</a></h5>
                        </div>
                        <div className="col-4">
                            <p className="float-right">{props.data.price}</p>
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-9">
                            {peopleGoing}
                        </div>
                        <div className="col-3">
                            {button}
                        </div>
                    </div>
                    <div className="row">
                        <div className="col-12">
                            {props.data.err}
                        </div>
                    </div>
                </div>
            </div>
        </li>
        );
};