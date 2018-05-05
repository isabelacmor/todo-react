import React, { Component } from 'react';
import './Item.css';

class Item extends Component {
    constructor(props) {
        super(props);

        // this.deleteItem = this.deleteItem.bind(this);
    }

    // deleteItem () {
    //     this.props.deleteItem(this.props.groupId);
    // }

    render() {
      return (
        <div className="Item">
          <span className="title">{this.props.text}</span>
          <span className="date">{this.props.date}</span>
          {/* <span onClick={this.deleteItem}>X</span> */}
        </div>
      );
    }
  }
  
  export default Item;
  