const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

const sendDeliveredEmail = async (toEmail, customerName, orderId, total) => {
  const mailOptions = {
    from: `"Your Flower Shop 🌸" <${process.env.GMAIL_USER}>`,
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

  await transporter.sendMail(mailOptions);
};

module.exports = { sendDeliveredEmail };