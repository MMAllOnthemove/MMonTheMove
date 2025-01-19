// File filter to allow only images and videos
export const fileFilter = (req, file, cb) => {
    const allowedMimeTypes = [
        "image/jpeg",
        "image/png",
        "image/gif",
        "video/mp4",
        "video/avi",
        "video/mov",
    ];

    if (allowedMimeTypes.includes(file.mimetype)) {
        cb(null, true); // Accept the file
    } else {
        cb(
            new Error("Invalid file type. Only images and videos are allowed."),
            false
        ); // Reject the file
    }
};
