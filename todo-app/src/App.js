import React, { Component } from 'react';
import logo from './logo.svg';
import './App.css';
import List from './List';
import folderAddIcon from './img/folderadd.png';

function RenderList(props) {
  console.log(props.title);
  return <li><List id={props.id} title={props.title} items={props.data} addItem={props.addItem}/></li>;
}

function RenderUI(props) {
  if (this.state.groups.length === 0) {
    return <span>empty</span>;
  } else {
    return (
    <ul>
      {this.state.groups.map((group) => <RenderList key={group.groupId} id={group.groupId} title={group.title} data={group.data} addItem={this.addItem.bind(this)}/> )}
    </ul>);
  }
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
    this.state.groups[groupId].data.push(item);
    this.setState({data: this.state.groups});
    localStorage.setItem("data", JSON.stringify(this.state));
  }

  addGroup() {
    let newId = this.state.groups.length;
    let name = this.AddGroupInputRef.current.value;
    
    const item = {title: name, groupId: newId, data: []};
    this.state.groups.push(item);
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
        {/* <ul>
          {this.state.groups.map((group) => <RenderList key={group.groupId} id={group.groupId} title={group.title} data={group.data} addItem={this.addItem.bind(this)}/> )}
        </ul> */}
        {hasData ? (
          <ul>
            {this.state.groups.map((group) => <RenderList key={group.groupId} id={group.groupId} title={group.title} data={group.data} addItem={this.addItem.bind(this)}/> )}
          </ul>
        ) : (
          <span>empty</span>
        )}
        <p className="App-intro">
          To get started, edit <code>src/App.js</code> and save to reload.
        </p>
      </div>
    );
  }
}

export default App;
