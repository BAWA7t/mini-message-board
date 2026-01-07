const express = require("express");
const { body, validationResult } = require("express-validator");

const router = express.Router();

// Sample messages
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

// Home page
router.get("/", (req, res) => {
  res.render("index", { title: "Mini Message Board", messages });
});

// New message form
router.get("/new", (req, res) => {
  res.render("new", { title: "New Message", errors: [], formData: {} });
});

// Create message
router.post(
  "/new",
  [
    body("messageUser").trim().notEmpty().withMessage("Name is required"),
    body("messageText")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Message must be at least 3 characters"),
  ],
  (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("new", {
        title: "New Message",
        errors: errors.array(),
        formData: req.body,
      });
    }

    const { messageText, messageUser } = req.body;

    messages.push({
      text: messageText.trim(),
      user: messageUser.trim(),
      added: new Date(),
    });

    res.redirect("/");
  }
);

// Message details
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
