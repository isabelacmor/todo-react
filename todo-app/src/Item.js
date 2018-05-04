import React, { Component } from 'react';
import './Item.css';

class Item extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div className="Item">
          <span className="title">{this.props.text}</span>
          <span className="date">{this.props.date}</span>
        </div>
      );
    }
  }
  
  export default Item;
  