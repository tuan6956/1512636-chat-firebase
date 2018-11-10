import React, { Component } from 'react';

class People extends Component {

    
    render() {
        const star = this.props.star ? <i className="fa fa-star star"></i> : "";
        
        return (
            <li className="clearfix" onClick={this.props.onItemClick}>
                <img src={this.props.image} alt="avatar"/>
                <div className="about">
                    <div className="name">
                        {this.props.name}
                    </div>
                    <div className="status">
                        <i className={"fa fa-circle " + this.props.statusIcon}></i> {this.props.statusText}
                    </div>
                </div>
                {star}
                
                
            </li>
        );
    }
}
export default People;
