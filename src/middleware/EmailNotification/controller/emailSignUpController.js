const nodemailer = require("nodemailer");
require("dotenv").config(); // Đọc biến môi trường từ .env

const transporter = nodemailer.createTransport({
  service: "gmail", // You can use any SMTP service like Gmail, SendGrid, etc.
  auth: {
    user: "tribtse183703@fpt.edu.vn", // Replace with your email
    pass: process.env.EMAIL_PASSWORD, // Replace with your email password or app-specific password
  },
});
const emailSignUpNotification = async (req, res) => {
  const { firstName, lastName, email } = req.body;

  if (!email || !firstName || !lastName) {
    return res.status(400).json({ message: "All fields are required" });
  }

  try {
    // Send a confirmation email to the customer
    const mailOptions = {
      from: "tribtse183703@gmail.com", // Sender address
      to: email, // Receiver address (customer's email)
      subject: "Thank you for signing up!",
      text: `Hi ${firstName} ${lastName},\n\nThank you for signing up for our updates! Stay tuned for exciting news and offers.`,
      html: `<!DOCTYPE html>
<html>
<head>
  <style>
    body {
      font-family: Arial, sans-serif;
      margin: 0;
      padding: 0;
      background-color: #f6f6f6;
    }
    .email-container {
      width: 100%;
      max-width: 600px;
      margin: 0 auto;
      background-color: #ffffff;
      border-radius: 10px;
      overflow: hidden;
      box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
    }
    .header {
      background-color: #c3402b;
      color: #d8c8a3;
      text-align: center;
      padding: 20px;
    }
    .header h1 {
      margin: 0;
      font-size: 24px;
      letter-spacing: 2px;
    }
    .content {
      padding: 20px;
      color: #333333;
      text-align: center;
    }
    .content h2 {
      font-size: 22px;
      color: #ff3333;
      margin-top: 0;
    }
    .content p {
      font-size: 16px;
      line-height: 1.5;
    }
    .content a {
      display: inline-block;
      margin-top: 20px;
      padding: 10px 20px;
      background-color: #ff3333;
      color: #ffffff;
      text-decoration: none;
      border-radius: 5px;
    }
    .footer {
      background-color: #f2f2f2;
      text-align: center;
      padding: 10px;
      font-size: 12px;
      color: #666666;
    }
    .koi-image {
      text-align: center;
      margin: 20px 0;
    }
    .koi-image img {
      max-width: 100%;
      height: auto;
    }
  </style>
</head>
<body>
  <div class="email-container">
    <!-- Header -->
    <div class="header">
      <h1>Welcome to Koi Paradise</h1>
    </div>

    <!-- Content -->
    <div class="content">
        <p>
          Hello <strong> ${firstName} ${lastName}</strong>,<br><br>
          We're thrilled to welcome you to Koi Paradise! Join us in exploring the vibrant world of stunning Koi fish and indulge in a tranquil, mesmerizing experience.
        </p>
        <p>
          Become a part of our community and share the passion for these extraordinary creatures!
        </p>
        <div class="koi-image">
          <img src="https://firebasestorage.googleapis.com/v0/b/koi-farm-shop-fc559.appspot.com/o/1728460987690_koi-farm.jpeg?alt=media&token=f2053012-e2a1-4002-92ea-09376a68932f" alt="Beautiful Koi Fish">
        </div>
        <a href="https://kodamakoifarm.com">Discover Koi Paradise</a>
      </div>

    <!-- Footer -->
    <div class="footer">
      <p>&copy; 2024 Koi Paradise</p>
    </div>
  </div>
</body>
</html>
`,
    };

    await transporter.sendMail(mailOptions);

    return res
      .status(200)
      .json({ message: "Signup successful and email sent" });
  } catch (error) {
    console.error("Error sending email:", error);
    return res.status(500).json({ message: "Signup failed" });
  }
};

module.exports = {
  emailSignUpNotification,
};
