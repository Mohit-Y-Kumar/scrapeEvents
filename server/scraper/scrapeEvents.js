const puppeteer = require("puppeteer");
console.log("📁 scrapeEvents.js module loaded");

const scrapeEvents = async () => {
  console.log("🟡 Launching browser...");

  let browser;
  try {
    browser = await puppeteer.launch({
      headless: true, // more stable than "new"
      ignoreHTTPSErrors: true,
      args: [
        "--no-sandbox",
        "--disable-setuid-sandbox",
        "--disable-dev-shm-usage",
        "--disable-gpu",
        "--window-size=1920x1080"
      ],
    });

    console.log("✅ Browser launched");

    const page = await browser.newPage();
    await page.goto("https://www.eventbrite.com.au/d/australia--sydney/events/", {
      waitUntil: "networkidle2",
      timeout: 0, // avoid premature timeout
    });

    console.log("✅ Page loaded");

    await page.waitForSelector("a.event-card-link", { timeout: 10000 });
    console.log("✅ Selector found");

 const rawEvents = await page.$$eval("a.event-card-link", (links) =>
  links.map((link) => {
    const title = link.querySelector("h3")?.innerText?.trim() || "";

    const dateTime =
      link.querySelector(".eds-text-bs--fixed")?.innerText?.trim() ||
      link.querySelector("time")?.innerText?.trim() || "";

    const description =
      link.querySelector(".eds-event-card-content__sub")?.innerText?.trim() ||
      link.querySelector(".eds-event-card-content__content__principal")?.innerText?.trim() || "";

    const imageUrl =
      link.querySelector("img")?.getAttribute("src") ||
      link.querySelector("picture img")?.getAttribute("src") || "";

    return {
      title,
      url: link.href,
      location: link.getAttribute("data-event-location") || "",
      category: link.getAttribute("data-event-category") || "",
      paidStatus: link.getAttribute("data-event-paid-status") || "",
      dateTime,
      description,
      imageUrl,
    };
  })
);



    const eventsWithTitle = rawEvents.filter((event) => event.title);
    const uniqueEvents = eventsWithTitle.filter(
      (event, index, self) => index === self.findIndex((e) => e.url === event.url)
    );

    console.log(`✅ Scraped ${uniqueEvents.length} events`);
    await browser.close();
    return uniqueEvents;

  } catch (error) {
    console.error("❌ Error scraping events:", error);

    if (browser) {
      await browser.close();
    }

    throw error; // this will trigger the 500 response in your Express route
  }
};

module.exports = scrapeEvents;
