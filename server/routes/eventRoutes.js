// routes/eventRoutes.js
const express = require("express");
const router = express.Router();
const Subscription = require("../models/subscription");

// GET from DB instead of scraping
router.get("/events", async (req, res) => {
  try {
    const events = await Event.find({});
    res.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    res.status(500).json({ message: "Failed to fetch events" });
  }
});

router.post("/subscribe", async (req, res) => {
  const { email, eventLink } = req.body;
  try {
    const newSubscription = new Subscription({ email, eventLink });
    await newSubscription.save();
    res.json({ message: "Subscribed successfully" });
  } catch (error) {
    console.error("Failed to save subscription:", error);
    res.status(500).json({ message: "Failed to subscribe" });
  }
});

module.exports = router;
