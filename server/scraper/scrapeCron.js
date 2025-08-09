const cron = require('node-cron');
const scrapeEvents = require('./scrapeEvents'); 
const Event = require('./models/Event'); // Your Mongoose model

// Run every 5 minutes
cron.schedule('*/5 * * * *', async () => {  
  try {
    console.log('⏳ Scheduled scraping started...');
    const events = await scrapeEvents();
    console.log(`✅ Scraped ${events.length} events at`, new Date());

    // Save to MongoDB (replace existing)
    await Event.deleteMany({});
    await Event.insertMany(events);
    console.log('💾 Events updated in DB');
    
  } catch (error) {
    console.error('❌ Error during scheduled scraping:', error);
  }
});
