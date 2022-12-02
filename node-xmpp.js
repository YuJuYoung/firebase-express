const { client, xml } = require("@xmpp/client");
const debug = require("@xmpp/debug");

var SenderID = "651753486544";
var ServerKey = "AAAAl7-I-NA:APA91bGK6-3M2vRKOf9GSrABGAVJBJaHMhTyO7nz13z1z0vWZGn2WfpxoFWkX_-5sNE4hHt2aiuTVWUnaXq6qdDJ0zRcUSIFNMZsyfYUHIowakpq5Dlw709PWtx5GimNcmc6wRCL2lQ0";

const xmpp = client({
  service: 'xmpps://fcm-xmpp.googleapis.com:5236',
  domain: 'fcm.googleapis.com',
  username: SenderID + '@fcm.googleapis.com',
  password: ServerKey,
});

debug(xmpp, true);

xmpp.on("error", (err) => {
  console.error(err);
});

xmpp.on("offline", () => {
  console.log("offline");
});

xmpp.on("stanza", async (stanza) => {
  if (stanza.is("message")) {
    await xmpp.send(xml("presence", { type: "unavailable" }));
    await xmpp.stop();
  }
});

xmpp.on("online", async (address) => {
  // Makes itself available
  await xmpp.send(xml("presence"));

  // Sends a chat message to itself
  const message = xml(
    "message",
    { type: "chat", to: address },
    xml("body", {}, "hello world"),
  );
  await xmpp.send(message);
});

xmpp.start().catch(console.error);