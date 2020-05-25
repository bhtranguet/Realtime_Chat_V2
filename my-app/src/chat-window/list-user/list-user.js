import React from 'react';
import './list-user.scss';
class ListUser extends React.Component {
  render() {
    var listUser = this.props.listUser.map((user, index) => {
      return (
        <div key={index}>
          {user.userName}
        </div>
      );
    });
    return (
      <div>
        <div>Online</div>
        <ul>
          {listUser}
        </ul>
      </div>
    );
  }
}
export default ListUser;