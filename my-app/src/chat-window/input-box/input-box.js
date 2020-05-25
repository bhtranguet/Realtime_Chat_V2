import React from 'react';
import './input-box.scss';
class InputBox extends React.Component {
  constructor(props) {
    super(props);
    this.state = {content: ''};
    this.handleChange = this.handleChange.bind(this);
    this.submitForm = this.submitForm.bind(this);
  }
  submitForm(e) {
    this.props.onSubmit(this.state.content);
    e.preventDefault();
  }
  handleChange(e) {
    this.setState({content: e.target.value});
  }
  render() {
    return (
      <div>
        <form onSubmit={this.submitForm}>
          <input className='text-box' value={this.state.content} onChange={this.handleChange} type='text' placeholder='Type message...'/>
          <input className='btn-send' type='submit' value='send'/>
        </form>
      </div>
    );
  }
}

export default InputBox;