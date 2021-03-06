const express = require('express');
const bodyParser = require('body-parser');
const cors = require('cors');
// import chatkit
const ChatKit = require('@pusher/chatkit-server');

const app = express()

// initiate our own chatkit
const chatkit = new ChatKit.default({
  instanceLocator: 'v1:us1:5dff3a4f-a6e4-4036-b974-d09e53dc0568',
  key: '8735902e-5985-4858-a619-7f8ecb5dea3c:KHi93UxzBwxTdqbUUrFzk51UTDktYKfvVBOsjai2bEI='
});

app.use(bodyParser.urlencoded({ extended: false }))
app.use(bodyParser.json())
app.use(cors())

// we then take a user and create a chatkit user through chatkit instance
app.post('/users', (req, res) => {
  const { username } = req.body;
  chatkit
    .createUser({
      id: username,
      name: username
    })
    .then(() => res.sendStatus(201))
    .catch(error => {
      if (error.error === 'services/chatkit/user_already_exists') {
        res.sendStatus(200);
      } else {
        res.status(error.status).json(error);
      }
    });
});

// creating a room route
app.post('/createRoom', (req, res) => {
  const { username } = req.body
  chatkit.createRoom({
    creatorId: username,
    name: 'some room'
  })
  .then(() => {
    console.log('Chat room created');
  }).catch((err) => {
    console.log(err);
  });
});

// authenticating a user
app.post('/authenticate', (req, res) => {
  const authData = chatkit.authenticate({ userId: req.query.user_id });
  res.status(authData.status).send(authData.body);
});

// host server on 3001
const PORT = 3001
app.listen(PORT, err => {
  if (err) {
    console.error(err)
  } else {
    console.log(`Running on port ${PORT}`)
  }
})
