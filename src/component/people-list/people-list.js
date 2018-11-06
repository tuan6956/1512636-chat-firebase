import React, { Component } from 'react';
import Search from './search'
class PeopleList extends Component {
    render() {
        return (
            <div class="people-list" id="people-list">
                <Search />
                <ul class="list">
                    { this.props.listPeople }
                </ul>
            </div>
        );
    }
}
export default PeopleList;
