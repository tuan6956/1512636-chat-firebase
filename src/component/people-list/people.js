import React, { Component } from 'react';

class People extends Component {
    render() {
        return (
            <li class="clearfix">
                <img src={this.props.image} alt="avatar"/>
                <div class="about">
                    <div class="name">{this.props.name}</div>
                    <div class="status">
                        <i class="fa fa-circle online"></i> {"online"}
                    </div>
                </div>
            </li>
        );
    }
}
export default People;
