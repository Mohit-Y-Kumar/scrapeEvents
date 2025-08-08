

const path = require("path");

const express = require("express");
const cors = require("cors");
const dotenv = require("dotenv");
const mongoose = require("mongoose");
const eventRoutes = require("./routes/eventRoutes");



dotenv.config();
const app = express();

mongoose.connect(process.env.MONGO_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log("✅ Connected to MongoDB"))
.catch((err) => {
  console.error("❌ MongoDB connection error:", err);
  process.exit(1); 
});

app.use(cors({
  origin: "http://localhost:5173",
  credentials: true, 
}));
app.use(express.json());

app.use("/api", eventRoutes);




app.listen(process.env.PORT, () => {
  console.log(`🚀 Server running on port ${process.env.PORT}`);
  require('./scraper/scrapeCron');
  
});
