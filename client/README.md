# Event Scraper Client

This is the frontend React application for the Event Scraper project. It fetches and displays live event data scraped from Eventbrite (Sydney, Australia) using a backend API.

## Features

- Built with React and Tailwind CSS (or your preferred UI framework)
- Fetches data from the Express backend
- Displays event cards with:
  - Title
  - Date and time
  - Location
  - Category
  - Ticket status (Free/Paid)
  - Event image
  - "Get Tickets" button (opens original Eventbrite page)

## Prerequisites

- Node.js and npm installed
- The backend server should be running on `http://localhost:4000` or any configured API base URL

## Installation

1. Navigate to the `client` directory:

   ```bash
   cd client
2. Install dependencies:
  npm install
3.  Start the development server:

  npm run dev