import React, { Component } from 'react';
import './Input.css';

class Input extends Component {
    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);
        this.addItemClick = this.addItemClick.bind(this);
        this.GroupInputRef = React.createRef();
    }

    addItem(e) {
        console.log(this.props.groupId);
        if (e.charCode === 13 /* enter */ && e.target.value.length > 0) {
            this.props.addItem(this.props.groupId, e.target.value);
            e.target.value = "";
        }
    }

    addItemClick () {
        if (this.GroupInputRef.current.value.length > 0) {
            this.props.addItem(this.GroupInputRef.current.value);
            this.GroupInputRef.current.value = "";
        } 
    }

    render() {
      return (
        <div className="Input">
            <div className="left"><input ref={this.GroupInputRef} onKeyPress={this.addItem} className="inputItem" /></div>
            <button className="addItemButton" onClick={this.addItemClick}>+ Add todo</button>
        </div>
      );
    }
  }
  
  export default Input;
  