require("dotenv").config();
const axios = require("axios");
const express = require("express");
const { parseString } = require("xml2js");
const fs = require("fs");

const app = express();
const PORT = process.env.PORT;
const FEED_URL = process.env.FEED_URL;
const DATA_FILE = "processed_jobs.json";

const sendWhatsAppMessage = require("./twilioService");

// Set EJS as the template engine
app.set("view engine", "ejs");
// Serve static files from the 'public' folder
app.use(express.static("public"));

// Load processed jobs from the JSON file, creating the file if it doesn't exist
function loadProcessedJobs() {
    if (!fs.existsSync(DATA_FILE)) {
        fs.writeFileSync(DATA_FILE, JSON.stringify([]));
        return [];
    }
    return JSON.parse(fs.readFileSync(DATA_FILE, "utf8"));
}

// Save the processed jobs to the JSON file
function saveProcessedJobs(jobs) {
    fs.writeFileSync(DATA_FILE, JSON.stringify(jobs, null, 2));
}

// Main route to display the list of jobs
app.get("/", async (req, res) => {
    try {
        const response = await axios.get(FEED_URL); // Fetch the RSS feed

        parseString(response.data, async (err, result) => {
            // Parse the XML feed
            if (err) {
                console.error("Error parsing the feed:", err);
                return res.status(500).send("Error retrieving the feed.");
            }

            // Extract job details from the feed
            const jobs = result.rss.channel[0].item.map((item) => ({
                title: item.title[0],
                link: item.link[0],
                date: item.pubDate[0],
                description: item.description[0],
                content: item["content:encoded"] ? item["content:encoded"][0] : "No content available",
            }));

            let processedJobs = loadProcessedJobs();
            let newJobs = [];

            // Check for new jobs and send WhatsApp messages for them
            for (let job of jobs) {
                if (!processedJobs.includes(job.link)) {
                    newJobs.push(job);
                    processedJobs.push(job.link);
                    await sendWhatsAppMessage(job);
                }
            }

            saveProcessedJobs(processedJobs); // Save updated processed jobs
            res.render("index", { jobs }); // Render the job list page
        });
    } catch (error) {
        console.error("Error fetching the feed:", error.message);
        res.status(500).send("Failed to connect to the feed.");
    }
});

// Start the server
app.listen(PORT, () => {
    console.log(`✅ Server running at: http://localhost:${PORT}`);
});
