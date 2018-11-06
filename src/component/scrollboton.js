import React, { Component } from 'react';

export default class ScrollBotton extends Component {
    componentDidMount() {
      this.scrollToBottom();
    }
  
    componentDidUpdate() {
      this.scrollToBottom();
    }
  
    scrollToBottom() {
      this.el.scrollIntoView({ behavior: 'smooth' });
    }
  
    render() {
      return <div ref={el => { this.el = el; }} />
    }
  }