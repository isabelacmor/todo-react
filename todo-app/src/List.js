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

        this.DeleteGroupButtonRef = React.createRef();
        this.AddItemInputRef = React.createRef();

        this.deleteGroup = this.deleteGroup.bind(this);
        this.showDeleteButton = this.showDeleteButton.bind(this);
        this.hideDeleteButton = this.hideDeleteButton.bind(this);
    }

    deleteGroup () {
        this.props.deleteGroup(this.props.id);
    }

    showDeleteButton () {
        this.DeleteGroupButtonRef.current.className = "displaybutton";
    }

    hideDeleteButton () {
        this.DeleteGroupButtonRef.current.className = "hidebutton";
    }

    render() {
    let hasData = this.props.items.length > 0;
      return (
        <div className="List">
            <div className="listheader" onMouseOver={this.showDeleteButton} onMouseOut={this.hideDeleteButton}>
                <span>{this.props.title}</span>
                <div ref={this.DeleteGroupButtonRef} className="hidebutton"><button onClick={this.deleteGroup}>X</button></div>
            </div>
            <div>
                <Input addItem={this.props.addItem} groupId={this.props.id} />
            </div>

            {hasData ? (
            <ul>
                {this.props.items.map((data) => <RenderItem key={data.id} text={data.text} id={data.id} /> )}
            </ul>
            ) : (
            <div className="emptyState">Looks like you don't have any tasks!</div>
            )}
        </div>
      );
    }
  }
  
  export default List;
  