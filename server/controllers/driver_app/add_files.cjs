const sftp = require("ssh2-sftp-client");
const path = require("path");
const fs = require("fs");
const yup = require("yup");

const moment = require("moment");

const sftpConfig = {
    host: `${process.env.SFTP_HOST}`,
    port: process.env.SFTP_PORT,
    username: `${process.env.SFTP_USERNAME}`,
    password: `${process.env.SFTP_PASSWORD}`,
};

const fileUploadSchema = yup.object().shape({
    files: yup
        .array()
        .required("Files are required")
        .max(15, "Maximum 15 files allowed")
        .of(
            yup.mixed().test("fileSize", "File size exceeds 10MB", (value) => {
                return value.size <= 10 * 1024 * 1024;
            })
        ),
});
const sftpClient = new sftp();

const datetimestamp = new Date(
    Date.now() + 1000 * 60 * -new Date().getTimezoneOffset()
)
    .toISOString()
    .replace("T", " ")
    .replace("Z", "");

// Format date to remove special characters for filenames
const date = moment(datetimestamp).format("YYYY-MM-DD");

const uploadChecklistFiles = async (req, res) => {
    try {
        const { car } = req.body;
        // Check if files are present in the request
        if (!req.files || !Array.isArray(req.files) || req.files.length === 0) {
            return res.status(400).json({ error: "No files uploaded" });
        }
        // const { files } = req.files;
        // Validate files using Yup schema
        await fileUploadSchema.validate({ files: req.files });
        // connect to server
        await sftpClient.connect(sftpConfig);

        // Upload all files and remove local temporary files afterward
        const fileUrls = await Promise.all(
            req.files.map(async (file) => {
                // Because we have 'files' as a directory pointing to '/uploads' folder in our root
                // we will only reference it as 'files'
                // e.g. we have a directory inside 'files' called 'driver_app_checklists'
                // we will now reference it as https://url.com/files/driver_app_checklists/filename

                const remotePath = `/root/uploads/driver_app_checklists/${car}%${date}-${file.originalname}`;
                try {
                    await sftpClient.put(file.path, remotePath);

                    // Remove temporary file from local storage
                    fs.unlink(file.path, (err) => {
                        if (err)
                            if (process.env.NODE_ENV !== "production")
                                console.error(
                                    "Error deleting file:",
                                    file.path,
                                    err
                                );
                    });
                    // Construct URL for uploaded file
                    return `https://repair.mmallonthemove.co.za/files/driver_app_checklists/${car}%${date}-${file.originalname}`;
                } catch (uploadError) {
                    console.error("Error uploading file:", uploadError);
                    // throw new Error(
                    //     `Failed to upload file: ${file.originalname}`
                    // );
                }
            })
        );

        return res
            .status(201)
            .json({ message: "Files uploaded", fileUrls: fileUrls });
    } catch (err) {
        if (err instanceof yup.ValidationError) {
            return res.status(400).json({
                message: "Please check your files and try again",
            });
        } else {
            return res
                .status(500)
                .json({ message: "Failed to upload, try again" });
        }
    } finally {
        sftpClient.end();
    }
};

module.exports = { uploadChecklistFiles };
