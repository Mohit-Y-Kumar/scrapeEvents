const cron = require('node-cron');
const scrapeEvents = require('./scrapeEvents'); 

cron.schedule('*/5 * * * *', async () => {  
  try {
    const events = await scrapeEvents();
    console.log(`Scraped ${events.length} events at`, new Date());
  } catch (error) {
    console.error('Error during scheduled scraping:', error);
  }
});
