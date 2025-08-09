# Use the official Node.js image
FROM node:18-slim

# Puppeteer-specific dependencies
RUN apt-get update && apt-get install -y \
    wget \
    ca-certificates \
    fonts-liberation \
    libappindicator3-1 \
    libasound2 \
    libatk-bridge2.0-0 \
    libatk1.0-0 \
    libcups2 \
    libdbus-1-3 \
    libx11-xcb1 \
    libxcomposite1 \
    libxdamage1 \
    libxrandr2 \
    xdg-utils \
    libgbm-dev \
    libnss3 \
    libxss1 \
    libxtst6 \
    --no-install-recommends \
    && rm -rf /var/lib/apt/lists/*

# Set working directory
WORKDIR /app

# Copy server files
COPY . .

# Install dependencies
RUN npm install

# Set environment variable for Puppeteer to skip downloading Chromium
ENV PUPPETEER_SKIP_DOWNLOAD=true

# Install Puppeteer
RUN npm install puppeteer

# Expose the port your server runs on
EXPOSE 4000

# Start your server
CMD ["node", "server.js"]
