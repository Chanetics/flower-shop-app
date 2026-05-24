const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 587,
  secure: false,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
  tls: {
    rejectUnauthorized: false,
  },
  connectionTimeout: 10000,
  greetingTimeout: 10000,
  socketTimeout: 10000,
});

transporter.verify((error, success) => {
  if (error) {
    console.error("❌ Gmail connection failed:", error);
  } else {
    console.log("✅ Gmail connected and ready to send!");
  }
});

const sendDeliveredEmail = async (toEmail, customerName, orderId, total) => {
  const mailOptions = {
    from: `"JM Flower Shop 🌸" <${process.env.GMAIL_USER}>`,
    to: toEmail,
    subject: `Your Order ${orderId} Has Been Delivered! 🌺`,
    html: `
      <div style="font-family: Arial, sans-serif; max-width: 600px; margin: auto; border: 1px solid #f0c040; border-radius: 10px; padding: 30px; background-color: #1a1a1a; color: #f5f5f5;">
        <h2 style="color: #f0c040;">🌸 Order Delivered!</h2>
        <p>Hi <strong>${customerName}</strong>,</p>
        <p>Great news! Your order has been successfully <strong style="color: #4caf50;">delivered</strong>.</p>
        <hr style="border-color: #f0c040;" />
        <p><strong>Order ID:</strong> ${orderId}</p>
        <p><strong>Total:</strong> ₱${total}</p>
        <hr style="border-color: #f0c040;" />
        <p>Thank you for shopping with us! 💐</p>
        <p style="color: #aaa; font-size: 12px;">If you have any concerns, please contact us.</p>
      </div>
    `,
  };

  const info = await transporter.sendMail(mailOptions);
  console.log("✅ Email sent! Message ID:", info.messageId);
  console.log("📧 Response:", info.response);
  return info;
};

module.exports = { sendDeliveredEmail };