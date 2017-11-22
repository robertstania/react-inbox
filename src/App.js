/* eslint-disable */
import React, { Component } from 'react';
import './App.css';
import MessageList from './Child Component Views/MessageList';
import Toolbar from './Child Component Views/Toolbar';
import axios from 'axios';


class App extends Component {

  state = {
    messages: [],
    showForm: false
  }

  /*GET Request using Async/Await Syntax*/
  //get - retreive
  async componentDidMount() {
    let serverResponse = await Promise.all([
      axios.get(`http://localhost:8000/messages`)
    ]);
    let messages = serverResponse[0].data
    messages.map(message => {
         if(message.id === message) {
         }
         return message;
       })
      this.setState({
        messages
      })
  }

  /*POST Request using Async/Await Syntax*/
  //post - add to
  //put/patch - update
  //delete - remove
  async itemsAdded(message) {
    let newMessage = {
      ... message,
      labels: JSON.stringify([]),
      read: false,
      starred: false,
      selected: false
    }
    let serverResponse = await axios.post(`http://localhost:8000/messages`, newMessage);
    let messages = serverResponse.data
    console.log('this:', this)
      this.setState({
        message: messages
      })
  }

  toggleRead = (selectedMessage) => {
    let originalMessages = this.state.messages.filter(message => selectedMessage.id != message.id)
    let updatedMessages = {
      id: selectedMessage.id,
      subject: selectedMessage.subject,
      read: !selectedMessage.read,
      starred: selectedMessage.starred,
      labels: selectedMessage.labels
    }
    this.setState({ messages: originalMessages.concat(updatedMessages).sort((a, b) => a.id - b.id)})
  }

  toggleStarred = (selectedMessage) => {
    let originalMessages = this.state.messages.filter(message => selectedMessage.id != message.id)
    let updatedMessages = {
      id: selectedMessage.id,
      subject: selectedMessage.subject,
      read: selectedMessage.read,
      starred: !selectedMessage.starred,
      labels: selectedMessage.labels
    }
    this.setState({ messages: originalMessages.concat(updatedMessages).sort((a, b) => a.id - b.id)})
  }

  toggleSelected = (selectedMessage) => {
    let originalMessages = this.state.messages.filter(message => selectedMessage.id != message.id)
    let updatedMessages = {
      id: selectedMessage.id,
      subject: selectedMessage.subject,
      read: selectedMessage.read,
      starred: selectedMessage.starred,
      labels: selectedMessage.labels,
      selected: !selectedMessage.selected || false
    }
    this.setState({ messages: originalMessages.concat(updatedMessages).sort((a, b) => a.id - b.id)})
  }

  toggleComposeForm = (type) => {
    console.log('type', type)
    this.setState({
      showForm: !this.state.showForm
    })
  }

  selectButtonFunc = (type) => {
    console.log('type', type)
    this.setState({
      messages: !this.state.messages.some(msg => msg.selected)
    })

  }

  toolbarCopyCurrentState = () => {
    return this.state.messages.map((message) => {
      return {...message};
    });
  }

  selectButtonFunc = (type) => {

    let messagesStateCopy = this.toolbarCopyCurrentState();

    if (type.includes('check')) {
      messagesStateCopy = this.state.messages.map(message => {
        message.selected = false;
        return message;
      });
    } else {
      messagesStateCopy = this.state.messages.map(message => {
        message.selected = true
        return message;
      });
    }

      this.setState({ messages: messagesStateCopy });
  }

  setUnreadFunc = () => {
    let newState = this.state.messages.map(msg => {
      if(msg.selected) msg.read = false
      return msg;
    })
    this.setState({ messages: newState });
  }

  setReadFunc = () => {
    let newState = this.state.messages.map(msg => {
      if(msg.selected) msg.read = true
      return msg;
    })
    this.setState({ messages: newState });
  }

  deleteMessages = () => {
    let newState = this.state.messages.filter(msg => !msg.selected);
    this.setState({ messages: newState });
  }

  addLabel = (label) => {
    console.log('heard', label);
    let newState = this.state.messages.map(msg => {
      if(msg.selected && !msg.labels.includes(label)) msg.labels.push(label)
      return msg
    })
    this.setState({ messages: newState })
  }

  removeLabel = (label) => {
    let newState = this.state.messages.map(msg => {
      if(msg.selected) msg.labels = msg.labels.filter(l => l !== label)
      return msg
    })
    console.log('heard', newState);
    this.setState({ messages: newState })
  }


  render() {
    let numOfSelectedMsgs = this.state.messages.filter(msg => msg.selected).length;
    return (
      <div className="App">
        <Toolbar
          numOfSelectedMsgs={numOfSelectedMsgs}
          messages={this.state.messages}
          toggleComposeForm={this.toggleComposeForm}
          showForm={this.state.showForm}
          selectButtonFunc={this.selectButtonFunc}
          setUnreadFunc={this.setUnreadFunc}
          setReadFunc={this.setReadFunc}
          deleteMessages={this.deleteMessages}
          addLabel={this.addLabel}
          removeLabel={this.removeLabel}
          itemsAdded={this.itemsAdded}
        />

        <MessageList
          messages={this.state.messages}
          toggleRead={this.toggleRead}
          toggleStarred={this.toggleStarred}
          toggleSelected={this.toggleSelected}
        />
      </div>
    );
  }
}

export default App;
