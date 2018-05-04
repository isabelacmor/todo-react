import React, { Component } from 'react';
// import './List.css';

class Input extends Component {
    constructor(props) {
        super(props);
        this.addItem = this.addItem.bind(this);
    }

    addItem(e) {
        console.log(e.charCode);
        if (e.charCode === 13 /* enter */ && e.target.value.length > 0)
        {
            this.props.addItem(this.props.groupId, e.target.value);
        }
    }

    render() {
      return (
        <div className="Input">
            <input onKeyPress={this.addItem} />
        </div>
      );
    }
  }
  
  export default Input;
  