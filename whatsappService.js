const axios = require("axios");

// Configuration
const PHONE_NUMBER_ID = process.env.PHONE_NUMBER_ID;
const ACCESS_TOKEN = process.env.ACCESS_TOKEN;
const RECIPIENT_PHONE = process.env.RECIPIENT_PHONE;
const WHATSAPP_API_URL = `https://graph.facebook.com/v17.0/${PHONE_NUMBER_ID}/messages`;

/**
 * Sends a WhatsApp message using the Meta Cloud API.
 * @param {Object} job - Job object containing title, date, link, and description.
 */
async function sendWhatsAppMessage(job) {
    const message = {
        messaging_product: "whatsapp",
        to: RECIPIENT_PHONE.replace("whatsapp:", ""),
        type: "text",
        text: {
            body: `🆕 *New Job Alert*\n\n📌 ${job.title}\n🗓️ ${job.date}\n🔗 ${job.link}\n📝 ${job.description.slice(0, 300)}...`,
        },
    };

    try {
        const response = await axios.post(WHATSAPP_API_URL, message, {
            headers: {
                Authorization: `Bearer ${ACCESS_TOKEN}`,
                "Content-Type": "application/json",
            },
        });

        console.log(`✅ Message sent successfully. ID: ${response.data.messages[0].id}`);
    } catch (error) {
        console.error("❌ Error sending the message:", error.response ? error.response.data : error.message);
    }
}

module.exports = sendWhatsAppMessage;
