# WordPress Jobs Monitor

A Node.js project that monitors new job listings from the WordPress Jobs feed and sends notifications via WhatsApp using the Twilio API. This project is designed to keep you updated with the latest WordPress job opportunities in real-time.

## Features
- Fetches job listings from [WordPress Jobs Feed](https://jobs.wordpress.net/feed/)
- Displays the job listings on a web interface using EJS templates
- Sends WhatsApp notifications when new jobs are detected
- Uses `.env` for managing sensitive credentials

## Project Structure
```
Job Monitor Node/
│
├── node_modules/          # Installed dependencies
├── public/                # Static files (CSS)
│   └── styles.css
├── views/                 # EJS templates
│   └── index.ejs
├── .env                   # Environment variables
├── index.js               # Main server code
├── twilioService.js       # WhatsApp messaging service
├── whatsappService.js     # WhatsApp API messaging service
└── processed_jobs.json    # JSON file to store processed jobs
└── .gitignore             # Git ignore file
```

## Requirements
- Node.js and npm installed
- A Twilio account for WhatsApp API integration

## Setup
1. Clone this repository.
2. Run `npm install` to install dependencies.
3. Create a `.env` file with your API keys and config.
4. Run `nodemon index.js` to start the server.

## Usage
- Access the job listings at `http://localhost:3000`.
- New job notifications will be sent to your WhatsApp number.

## License
This project is licensed under the MIT License.

---
*Happy Coding!* 😊
