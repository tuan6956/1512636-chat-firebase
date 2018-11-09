import React, { Component } from 'react';
import Search from '../../container/SearchPeopleContainer'
import SearchPeopleContainer from '../../container/SearchPeopleContainer';
class PeopleList extends Component {
    render() {
        return (
            <div class="people-list" id="people-list">
                <SearchPeopleContainer />
                <ul class="list">
                    { this.props.listPeople }
                </ul>
            </div>
        );
    }
}
export default PeopleList;
