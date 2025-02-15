const twilio = require("twilio");
const accountSid = process.env.ACCOUNT_SID;
const authToken = process.env.AUTH_TOKEN;
const fromWhatsApp = process.env.FROM_WHATSAPP;
const toWhatsApp = process.env.TO_WHATSAPP;
const client = new twilio(accountSid, authToken);

/**
 * Sends a WhatsApp message with job details using Twilio API.
 * @param {Object} job - Job object containing title, date, link, and description.
 */
async function sendWhatsAppMessage(job) {
    const message = `🆕 *New Job Alert*\n\n📌 ${job.title}\n🗓️ ${job.date}\n🔗 ${job.link}\n📝 ${job.description.slice(0, 300)}...`;

    try {
        const response = await client.messages.create({
            from: fromWhatsApp,
            to: toWhatsApp,
            body: message,
        });
        console.log(`✅ Message sent successfully: ${response.sid}`);
    } catch (error) {
        console.error("❌ Error sending the message:", error.message);
    }
}

module.exports = sendWhatsAppMessage;
