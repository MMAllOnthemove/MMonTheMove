const sftp = require("ssh2-sftp-client");

const sftpConfig = {
    host: `${process.env.SFTP_HOST}`,
    port: process.env.SFTP_PORT,
    username: `${process.env.SFTP_USERNAME}`,
    password: `${process.env.SFTP_PASSWORD}`,
};

const sftpClient = new sftp();

const uploadFile = async (req, res) => {
    try {
        await sftpClient.connect(sftpConfig);
        const file = req.file;

        if (!file) {
            return res.status(400).json({ error: "No file uploaded" });
        }
        console.log("file", file);
        await sftpClient.put(
            `${file.path}`,
            `/root/uploads/${file.originalname}`
        );
        console.log(`File uploaded to /root/uploads/${file.originalname}`);

        const fileAddress = `https://repair.mmallonthemove.co.za/files/root/uploads/${file.originalname}`;
        res.json({ fileAddress });
    } catch (err) {
        console.error("Upload error:", err);
        res.status(500).json({ error: "Failed to upload file" });
    } finally {
        sftpClient.end();
    }
};

module.exports = { uploadFile };
