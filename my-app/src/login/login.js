import React from 'react';
class Login extends React.Component {
  constructor() {
    super();
    this.state = {
      username: ''
    }
  }
  handleChange(e) {
    this.setState({username: e.target.value});
  }
  handleSubmit(e) {
    this.props.onSubmit(this.state.username);
    e.preventDefault();
  }
  render() {
    return (
      <div>
        <form onSubmit={this.handleSubmit.bind(this)}>
          <input type='text' value={this.state.username} onChange={this.handleChange.bind(this)} placeholder='Nhập username' />
          <input type='submit' value='Join' />
        </form>
      </div>
    );
  }
}

export default Login;