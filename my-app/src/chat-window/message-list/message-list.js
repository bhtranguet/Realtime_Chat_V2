import React from 'react';
import Message from '../message/message';
class ListMessage extends React.Component {
  render() {
    var messages = this.props.listMessage.map((message, index) => {
      return (
        <div key={index} className='message'>
          <Message data={message}></Message>
        </div>
      );
    });
    return (
      <div>
        {messages}
      </div>
    );
  }
}

export default ListMessage;