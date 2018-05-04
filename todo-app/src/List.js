import React, { Component } from 'react';
import './List.css';
import Item from './Item';
import Input from './Input';

function RenderItem(props) {
    console.log(props.id);
    let date = new Date(props.id);
    console.log(date);
    
    // request a weekday along with a long date
    let options = { hour: 'numeric', minute: 'numeric', second: 'numeric', weekday: 'short', year: 'numeric', month: 'short', day: 'numeric' };
    let formattedDate = new Intl.DateTimeFormat('en-US', options).format(date);
    
    return <li><Item text={props.text} date={formattedDate} /></li>;
}

class List extends Component {
    constructor(props) {
        super(props);
    }

    render() {
      return (
        <div className="List">
            <div>{this.props.title}</div>
            <Input addItem={this.props.addItem} groupId={this.props.id} />
            <ul>
                {this.props.items.map((data) => <RenderItem key={data.id} text={data.text} id={data.id} /> )}
            </ul>
        </div>
      );
    }
  }
  
  export default List;
  