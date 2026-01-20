{/*import axios from "axios";

const BASE_URL = "http://localhost:7777/api/email/send";

const sendEmail = async (emailData) => {
  try {
    const response = await axios.post(BASE_URL, emailData);
    return response.data;
  } catch (error) {
    console.error("Error sending email:", error);
    throw error;
  }
};

export default { sendEmail };*/}

// EmailService.js
import axios from "axios";

const API_URL = "http://localhost:7777/api/email/send";

const sendEmail = async (mailData) => {
  console.log("Sending email via POST:", mailData);

  const response = await axios.post(API_URL, mailData);
  return response.data;
};

export default {
  sendEmail,
};