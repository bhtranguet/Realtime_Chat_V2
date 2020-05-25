import React from 'react';
import './chat-window.scss';
import ListUser from '../list-user/list-user.js';
import ListMessage from '../message-list/message-list';
import InputBox from '../input-box/input-box';
class ChatWindow extends React.Component {
  render() {
    return (
      <div className='chat-window'>
        <div className='left'>
          <ListUser listUser={this.props.listUser}></ListUser>
        </div>
        <div className='right'>
          <div className='list-message'>
            <ListMessage listMessage={this.props.listMessage}></ListMessage>
          </div>
          <div className='input'>
            <InputBox onSubmit={message => this.props.onSubmit(message)}></InputBox>
          </div>
        </div>
      </div>
    );
  }

}

export default ChatWindow;