const Pusher = require("pusher");

const pusher = new Pusher({
  appId: "1553447",
  key: "a1ade43c26f8926836df",
  secret: "ef8460912ba4f0a348dd",
  cluster: "eu",
  useTLS: true
});

pusher.trigger("presence-my-channel", "my-event", {
  message: "hello world"
});