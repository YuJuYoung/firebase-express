var xmpp = require('simple-xmpp');

var SenderID = "651753486544";
var ServerKey = "AAAAl7-I-NA:APA91bGK6-3M2vRKOf9GSrABGAVJBJaHMhTyO7nz13z1z0vWZGn2WfpxoFWkX_-5sNE4hHt2aiuTVWUnaXq6qdDJ0zRcUSIFNMZsyfYUHIowakpq5Dlw709PWtx5GimNcmc6wRCL2lQ0";

xmpp.on('online', function(data) {
	console.log('Connected with JID: ' + data.jid.user);
	console.log('Yes, I\'m connected!');
});

xmpp.on('chat', function(from, message) {
	xmpp.send(from, 'echo: ' + message);
});

xmpp.on('error', function(err) {
	console.error(err);
});

xmpp.on('subscribe', function(from) {
	if (from === 'a.friend@gmail.com') {
		xmpp.acceptSubscription(from);
	}
});

xmpp.connect({
	jid: SenderID + '@fcm.googleapis.com',
	password: ServerKey,
	host: 'fcm-xmpp.googleapis.com',
	port: 5236
});

xmpp.subscribe('your.friend@gmail.com');
// check for incoming subscription requests
xmpp.getRoster();