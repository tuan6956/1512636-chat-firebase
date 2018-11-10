import React, { Component } from 'react';
import Search from '../../container/SearchPeopleContainer'
import SearchPeopleContainer from '../../container/SearchPeopleContainer';
class PeopleList extends Component {
    render() {
        return (
            <div className="people-list" id="people-list">
                <SearchPeopleContainer />
                <ul className="list">
                    { this.props.listPeople }
                </ul>
            </div>
        );
    }
}
export default PeopleList;
