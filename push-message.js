var admin = require("firebase-admin");

GOOGLE_APPLICATION_CREDENTIALS="./fir-test-c933b-firebase-adminsdk-5e2z0-8cbdd71d12.json"

var serviceAccount = require(GOOGLE_APPLICATION_CREDENTIALS);

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
});

// The topic name can be optionally prefixed with "/topics/".
const topic = 'weather';

const message = {
  data: {
    condition: "맑음"
  },
  topic: topic
};

// Send a message to devices subscribed to the provided topic.
admin.messaging().send(message)
  .then((response) => {
    // Response is a message ID string.
    console.log('Successfully sent message:', response);
  })
  .catch((error) => {
    console.log('Error sending message:', error);
  });
