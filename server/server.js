var express = require('express');
var app = express();
var server = require('http').createServer(app);
var io = require('socket.io')(server);
var listMessage = [];
var listUser = [];
// Lắng nghe sự kiện khi client connect và server
io.on('connection', client => {
  console.log('Client connected!');
  client.on('join', data => {
    console.log(data);
  });

  client.on('disconnect', () => {
    listUser = listUser.filter(item => {
      return item.clientID != client.id;
    })
    client.broadcast.emit('client_disconnect', listUser);
    console.log("disconnect");
  });

  // Bắt sự kiện message ở client
  client.on('send_message', data => {
    listMessage.push(data);
    // client của chính nó
    client.emit('thread', listMessage);
    // các client khác connect tới server
    client.broadcast.emit('thread', listMessage);
  });

  // Bắt sự kiện message ở client
  client.on('user_login', user => {
    if (listUser.includes(user)) {
      client.emit('login_fail', 'Tên người dùng đã tồn tại');
    } else {
      var userData = {
        clientID: client.id,
        userName: user
      }
      listUser.push(userData);
      // client của chính nó
      client.emit('login_success', listUser);
      client.emit('thread', listMessage);
      // các client khác connect tới server
      client.broadcast.emit('login_success', listUser);
    }
  });
});

// Run server
server.listen(8000, () => {
  console.log('server is running!');
})