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
        await sftpClient.put(
            `${file.path}`,
            `/root/uploads/hhp/${file.originalname}`
        );
        // Because we have 'files' as a directory pointing to '/uploads' folder in our root
        // we will only reference it as 'files'
        // e.g. we have a directory inside 'files' called 'hhp'
        // we will now reference it as url.com/files/hhp/filename
        const fileAddress = `https://repair.mmallonthemove.co.za/files/hhp/${file.originalname}`;
        res.json({ fileAddress });
    } catch (err) {
        res.status(500).json({ error: "Failed to upload file" });
    } finally {
        sftpClient.end();
    }
};

module.exports = { uploadFile };
