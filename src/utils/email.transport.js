const nodemailer = require('nodemailer');

// Create a transporter object using SMTP
exports.sendMail = async ({ email, subject, text, html }) => {
  try {
    const transporter = nodemailer.createTransport({
      host: process.env.SMTP_HOST,
      port: process.env.SMTP_PORT || 587,
      secure: true, // true for 465, false for other ports
      auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASS,
      },
      tls: {
        rejectUnauthorized: false, // Allow self-signed certificates
      },
    });

    // await transporter.verify((error, success) => {
    //   if (error) {
    //     console.error("Error verifying SMTP connection:", error);
    //     throw new Error("SMTP connection verification failed");
    //   }
    //   console.log("SMTP connection verified successfully");
    // });
     try {
      await transporter.verify();
      console.log("SMTP connection verified successfully");
    } catch (error) {
      console.error("Error verifying SMTP connection:", error);
      throw new Error("SMTP connection verification failed");
    }
    // Set up email data
    const mailOptions = {
      from: `"${process.env.SMTP_FROM_NAME}" <${process.env.SMTP_FROM_EMAIL}>`, // sender address
      to: email, // list of receivers
      subject, // Subject line
      text, // plain text body
      html, // html body
    };

    // Send mail  
    const info = await transporter.sendMail(mailOptions);
    console.log(`Email sent to ${email}: ${info.messageId}`);

    console.log("Message sent: %s", info.messageId);
    return info;

  } catch (error) {
    console.error("Error sending email:", error);
    throw new Error("Email sending failed");
  }
}