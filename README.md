# WordPress Jobs Monitor

A Node.js project that monitors new job listings from the WordPress Jobs feed and sends notifications via WhatsApp using the Twilio API. This project runs as a standalone script for scheduled tasks, ideal for cron jobs, ensuring you stay updated with the latest WordPress job opportunities.

## Features
- Fetches job listings from [WordPress Jobs Feed](https://jobs.wordpress.net/feed/)
- Sends WhatsApp notifications when new jobs are detected
- Logs every execution with timestamps in `cron_execution.log`
- Uses `.env` for managing sensitive credentials

## Project Structure
```
Job Monitor Node/
│
├── node_modules/          # Installed dependencies
├── public/                # Static files (CSS)
│   └── styles.css
├── .env                   # Environment variables
├── index.js               # Main script executed by cron
├── twilioService.js       # WhatsApp messaging service
├── cron_execution.log     # Log file for each execution
├── processed_jobs.json    # JSON file to store processed jobs
└── .gitignore             # Git ignore file
```

## Requirements
- Node.js and npm installed
- A Twilio account for WhatsApp API integration

## Setup
1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file with your API keys and config.
4. Configure a cron job to run `node index.js` at your preferred interval.

## Usage
- The script runs automatically at scheduled intervals.
- Each execution is logged in `cron_execution.log`.
- New job notifications are sent to your WhatsApp number.

## License
This project is licensed under the MIT License.

---
*Happy Coding!* 😊
