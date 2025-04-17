import "dotenv/config";
import nodemailer from "nodemailer";

// Nodemailer setup (or use another email service)
const transporter = nodemailer.createTransport({
    host: process.env.SMTP_HOST,
    port: 465,
    secure: true, // true for port 465, false for other ports
    auth: {
        user: process.env.SMTP_USER,
        pass: process.env.SMTP_PASSWORD,
    },
    tls: {
        rejectUnauthorized: false, // Set to false for development, or if you encounter certificate issues
    },
});
// async..await is not allowed in global scope, must use a wrapper
async function emailSend(email) {
    // send mail with defined transport object
    const info = await transporter.sendMail({
        from: '"Maddison Foo Koch 👻" <maddison53@ethereal.email>', // sender address
        to: email, // list of receivers
        subject: "Hello ✔", // Subject line
        text: "Hello world?", // plain text body
        html: "<b>Test gain?</b>", // html body
    });
   

    console.log("Message sent: %s", info.messageId);
    // Message sent: <d786aa62-4e0a-070a-47ed-0b0666549519@ethereal.email>
}

const testEmail = async (req, res) => {
    const { email } = req.body;
    try {
        emailSend(email);
        // Respond with success message and access token
        res.status(201).json({
            message: "Successfully sent",
        });
    } catch (error) {
        console.log("dev error email", error);
    }
};

export default testEmail;
