const { response } = require('express');
const express = require('express')
const app = express()
const port = 3000

app.use(express.json());
app.use(express.urlencoded({
  extended: true
}));

var admin = require("firebase-admin");

GOOGLE_APPLICATION_CREDENTIALS="./fir-test-c933b-firebase-adminsdk-5e2z0-8cbdd71d12.json";

var serviceAccount = require(GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

app.get('/', (req, res) => {
  res.send('Hello World!')
})

app.post('/', (req, res) => {
  const topic = 'weather';

  const message = {
    data: {
      condition: req.body.message
    },
    topic: topic
  };

  var resoponseBody = {
    result: true,
  };

  // Send a message to devices subscribed to the provided topic.
  admin.messaging().send(message)
    .then((response) => {
      // Response is a message ID string.
      console.log('Successfully sent message:', response);
    })
    .catch((error) => {
      console.log('Error sending message:', error);
      resoponseBody.result = false;
    });
  
  res.send(resoponseBody);
})

app.listen(port, () => {
  console.log(`Example app listening on port ${port}`)
})