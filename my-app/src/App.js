import React from 'react';
import './App.css';
import ChatWindow from './chat-window/chat-window/chat-window';
import Login from './login/login';
import io from 'socket.io-client';

class App extends React.Component {
  constructor() {
    super();
    this.state = {
      isLogin: false,
      listUser: [],
      listMessage: [],
      loginError: '',
      currentUser: '',
      socket: io('http://localhost:8000')
    }
  }

  componentDidMount() {
    // kết nối tới server
    var socket = this.state.socket;
    socket.on('connect', function (data) {
      socket.emit('join', 'Hello server from client');
    });

    // listen thread event
    socket.on('thread', function (listMessage) { 
      this.setState({
        listMessage: listMessage
      })
    }.bind(this));
    
    // listen thread event
    socket.on('login_success', function (listUser) { 
      this.setState({
        listUser: listUser,
        isLogin: true
      });
      
    }.bind(this));

    socket.on('login_fail', function (error) { 
      this.setState({
        loginError: error
      })
    }.bind(this));

    socket.on('client_disconnect', function (listUser) { 
      this.setState({
        listUser: listUser
      });
    }.bind(this));
  }

  // submit việc thêm user
  handleSubmit(user) {
    this.state.socket.emit('user_login', user);
    this.setState({
      currentUser: user
    })
  }

  // Xử lý khi gửi message
  handleSendMessage(message) {
    var messageData = {
      message: message,
      user: this.state.currentUser
    }
    this.state.socket.emit('send_message', messageData);
  }

  render() {
    return (
      <div className="App">
        {this.state.isLogin ? null : <Login onSubmit={user => { this.handleSubmit(user) }}></Login>}
        {this.state.isLogin ? null : <div className='error'>{this.state.loginError}</div>}
        {this.state.isLogin ? <ChatWindow socket={this.state.socket} listMessage={this.state.listMessage} listUser={this.state.listUser} currentUser={this.state.currentUser} onSubmit={message => {this.handleSendMessage(message)}}></ChatWindow> : null}
      </div>
    );
  }
}

export default App;
