import React, { Component } from 'react';
import {setFilter} from '../actions'
import { connect } from 'react-redux'
import Search from '../component/people-list/search';

class SearchContainer extends Component {
    handleChange(e) {
        if (e.target.value !== this.props.filter) {
            this.props.doSetFilter(e.target.value);
        }
    };
    render() {
        return (
            <Search onChange={this.handleChange.bind(this)} filter={this.props.filter} />
        );
    }
}

const mapDispatchToProps = dispatch => {
    return({
        doSetFilter: text => {
            dispatch(setFilter(text))
        }
    })
}
const mapStateToProps = state => {
    return({
        filter: state.SetListPeople.filter
    })
}

export default connect(mapStateToProps, mapDispatchToProps)(SearchContainer);
