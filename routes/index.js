const express = require("express");
const router = express.Router();

//Sample message
const messages = [
  {
    text: "Hello there",
    user: "Maxwell",
    added: new Date(),
  },
  {
    text: "Hi! This is the second message",
    user: "Fuseini",
    added: new Date(),
  },
];

//Get the home page
router.get("/", (req, res) => {
  res.render("index", { title: "Mini message Board", messages });
});

//Get new message form
router.get("/new", (req, res) => {
  res.render("new", { title: "New Message" });
});

//Post new Message
router.post("/new", (req, res) => {
  const { messageText, messageUser } = req.body;

  messages.push({
    text: messageText,
    user: messageUser,
    added: new Date(),
  });

  res.redirect("/");
});

router.get("/messages/:id", (req, res) => {
  const messageId = req.params.id;
  const message = messages[messageId];

  if (!message) {
    return res.status(404).send("Message not found");
  }

  res.render("message", {
    title: "Message Details",
    message,
  });
});

module.exports = router;
