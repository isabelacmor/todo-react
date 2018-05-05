import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import List from './List';
import folderAddIcon from './img/folderadd.png';

function RenderList(props) {
  console.log(props.title);
  return <li className="mainlistitem"><List id={props.id} title={props.title} items={props.data} addItem={props.addItem} deleteGroup={props.deleteGroup} /></li>;
}

class App extends Component {
  constructor(props) {
    super(props);

    // Let's you access an element by "id"
    this.AddGroupRef = React.createRef();
    this.AddGroupInputRef = React.createRef();

    // Bind this to all functions defined and used here
    this.addGroup = this.addGroup.bind(this);
    this.keyPress = this.keyPress.bind(this);
    this.toggleInput = this.toggleInput.bind(this);

    // Load localStorage
    if (localStorage.getItem("data") === null) {
      this.state = {
        groups: []
      }
    } else {
      this.state = JSON.parse(localStorage.getItem("data"));
    }
  }

  addItem(groupId, data) {
    const item = {text: data, id: Date.now()};
    let objIndex = this.state.groups.findIndex(e => e.groupId === groupId);

    this.state.groups[objIndex].data.unshift(item);
    this.setState({data: this.state.groups});
    localStorage.setItem("data", JSON.stringify(this.state));
  }

  addGroup() {
    let newId = 0;
    if (this.state.groups.length > 0) {
      newId = this.state.groups[0].groupId + 1;
    }
    let name = this.AddGroupInputRef.current.value;
    
    const item = {title: name, groupId: newId, data: []};
    this.state.groups.unshift(item);
    this.setState({data: this.state.groups});
    localStorage.setItem("data", JSON.stringify(this.state));
  }

  deleteGroup (groupId) {
    console.log("deleting: " + groupId);
    this.state.groups.splice(this.state.groups.findIndex(e => e.groupId === groupId),1);
    this.setState({data: this.state.groups});
    localStorage.setItem("data", JSON.stringify(this.state));
  }

  keyPress(e) {
    if (e.charCode === 13 /* enter */) {
      this.addGroup();
    }
  }

  toggleInput () {
    if (this.AddGroupRef.current.className === "addGroup visible") {
      this.AddGroupRef.current.className = "addGroup hidden";
    } else {
      this.AddGroupRef.current.className = "addGroup visible";
    }
  }

  render() {
    let hasData = this.state.groups.length > 0;
    return (
      <div className="App">
        <div className="header">
          <h1>To-Do</h1>

          {/* Input for new group */}
          <div ref={this.AddGroupRef} className="addGroup hidden">
            <input ref={this.AddGroupInputRef} onKeyPress={this.keyPress} />
            <button className="confirm" onClick={this.addGroup}>CREATE</button>
          </div>
          <img onClick={this.toggleInput} src={folderAddIcon} />
        </div>
        {hasData ? (
          <ul className="mainlist">
            {this.state.groups.map((group) => <RenderList key={group.groupId} id={group.groupId} title={group.title} data={group.data} addItem={this.addItem.bind(this)} deleteGroup={this.deleteGroup.bind(this)} /> )}
          </ul>
        ) : (
          <span>empty</span>
        )}
      </div>
    );
  }
}

export default App;
