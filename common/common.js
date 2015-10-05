Slingshot.fileRestrictions("photoUploads", {
    allowedFileTypes: ["image/png", "image/jpeg", "image/jpg", "image/gif"],
    maxSize: 4 * 1024 * 1024 // 4 MB
});

Slingshot.fileRestrictions("documentUploads", {
    allowedFileTypes: ["application/pdf"],
    maxSize: 15 * 1024 * 1024 // 10 MB
});

