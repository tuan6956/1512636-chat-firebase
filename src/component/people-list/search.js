import React, { Component } from 'react';

class Search extends Component {
    render() {
        return (
            <div class="search">
                <input type="text" placeholder="search" onChange={this.props.onChange} value={this.props.filter} />
                <i class="fa fa-search"></i>
            </div>
        );
    }
}
export default Search;