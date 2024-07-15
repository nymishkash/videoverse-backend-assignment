const express = require('express');
const router = express.Router();
const multer = require('multer');
const { uploadToCloudinary, trimVideo, mergeVideos } = require('../models/videoModel');

// Multer configuration for file uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
        cb(null, 'uploads/');
    },
    filename: function (req, file, cb) {
        cb(null, Date.now() + '-' + file.originalname);
    }
});
const upload = multer({ storage: storage });

// POST /videos/upload - Upload a video file to Cloudinary
router.post('/upload', upload.single('video'), async (req, res) => {
    try {
        const cloudinaryUrl = await uploadToCloudinary(req.file.path);
        res.status(201).json({ message: 'Video uploaded to Cloudinary successfully.', cloudinaryUrl });
    } catch (error) {
        console.error('Error uploading video to Cloudinary:', error);
        res.status(500).send('Error uploading video to Cloudinary.');
    }
});

// POST /videos/trim - Trim a video file and upload to Cloudinary
router.post('/trim', upload.single('video'), async (req, res) => {
    const { trimStart, trimDuration } = req.body;

    try {
        const cloudinaryUrl = await trimVideo(req.file.path, trimStart, trimDuration);
        res.status(200).json({ message: 'Video trimmed and uploaded to Cloudinary successfully.', cloudinaryUrl });
    } catch (error) {
        console.error('Error trimming and uploading video to Cloudinary:', error);
        res.status(500).send('Error trimming and uploading video to Cloudinary.');
    }
});

// POST /videos/merge - Merge two video files and upload to Cloudinary
router.post('/merge', upload.fields([{ name: 'video1', maxCount: 1 }, { name: 'video2', maxCount: 1 }]), async (req, res) => {
    const { prePath } = req.body;
    const inputFile1 = req.files['video1'][0];
    const inputFile2 = req.files['video2'][0];

    try {
        const cloudinaryUrl = await mergeVideos(prePath, inputFile1.path, inputFile2.path);
        res.status(200).json({ message: 'Videos merged and uploaded to Cloudinary successfully.', cloudinaryUrl });
    } catch (error) {
        console.error('Error merging and uploading videos to Cloudinary:', error);
        res.status(500).send('Error merging and uploading videos to Cloudinary.');
    }
});

module.exports = router;
