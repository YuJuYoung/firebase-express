var Sender = require('node-xcs').Sender;

var SenderID = "651753486544";
var ServerKey = "AAAAl7-I-NA:APA91bGK6-3M2vRKOf9GSrABGAVJBJaHMhTyO7nz13z1z0vWZGn2WfpxoFWkX_-5sNE4hHt2aiuTVWUnaXq6qdDJ0zRcUSIFNMZsyfYUHIowakpq5Dlw709PWtx5GimNcmc6wRCL2lQ0";

var xcs = new Sender(SenderID, ServerKey);

xcs.on('message', function (messageId, from, data, category) {
    console.log('received message', messageId, from, data, category);
});

 xcs.on('receipt', function (messageId, from, data, category) {
    console.log('received receipt', arguments);
});

xcs.on('error', e => console.warn('XMPP error.', e));

xcs.start();