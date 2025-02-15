require("dotenv").config();
const axios = require("axios");
const { parseString } = require("xml2js");
const fs = require("fs");

const FEED_URL = process.env.FEED_URL;
const DATA_FILE = "processed_jobs.json";
const sendWhatsAppMessage = require("./twilioService");
const logFile = 'cron_execution.log';

function logExecution(message) {
    const timestamp = new Date().toISOString();
    fs.appendFileSync(logFile, `[${timestamp}] ${message}\n`);
}

function loadProcessedJobs() {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
        return [];
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

function saveProcessedJobs(jobs) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(jobs, null, 2));
}

(async function main() {
    try {
        const response = await axios.get(FEED_URL);
        parseString(response.data, async (err, result) => {
            if (err) {
                logExecution('Error parsing the feed: ' + err.message);
                return;
            }

            const jobs = result.rss.channel[0].item.map(item => ({
                title: item.title[0],
                link: item.link[0],
                date: item.pubDate[0],
                description: item.description[0],
                content: item['content:encoded'] ? item['content:encoded'][0] : 'No content available'
            }));

            let processedJobs = loadProcessedJobs();
            let newJobs = [];

            for (let job of jobs) {
                if (!processedJobs.includes(job.link)) {
                    newJobs.push(job);
                    processedJobs.push(job.link);
                    await sendWhatsAppMessage(job);
                    logExecution('New job sent: ' + job.title);
                }
            }

            saveProcessedJobs(processedJobs);
            logExecution('Job monitoring executed successfully.');
            process.exit(0);
        });
    } catch (error) {
        logExecution('Error fetching the feed: ' + error.message);
        process.exit(1);
    }
})();
