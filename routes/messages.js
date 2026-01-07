const express = require("express");
const { body, validationResult } = require("express-validator");
const db = require("../db/messages");

const router = express.Router();

router.get("/", async (req, res) => {
  const messages = await db.getAllMessages();
  res.render("index", { title: "Message Board", messages });
});

router.get("/new", (req, res) => {
  res.render("new", { title: "New Message", errors: [] });
});

router.post(
  "/new",
  [
    body("messageUser").trim().notEmpty().withMessage("Name is required"),
    body("messageText")
      .trim()
      .isLength({ min: 3 })
      .withMessage("Message must be at least 3 characters"),
  ],
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.render("new", {
        title: "New Message",
        errors: errors.array(),
      });
    }

    const { messageUser, messageText } = req.body;
    await db.createMessage(messageUser, messageText);

    res.redirect("/");
  }
);

router.get("/messages/:id", async (req, res) => {
  const message = await db.getMessageById(req.params.id);

  if (!message) return res.status(404).send("Message not found");

  res.render("message", { title: "Message", message });
});

module.exports = router;
