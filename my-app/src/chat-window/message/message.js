import React from 'react';
import './message.scss'
class Message extends React.Component {
  render() {
    return (
      <div className='message-wrap'>
        <div className='user'>{this.props.data.user}</div>
        <div className='content'>{this.props.data.message}</div>
      </div>
    );
  }
}

export default Message;