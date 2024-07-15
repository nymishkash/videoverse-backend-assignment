const express = require('express');
const router = express.Router();
const videoController = require('../controllers/videoController');
const { authenticateToken } = require('../middleware/authenticate');
const multer = require('multer');

// Multer configuration for handling file uploads
const upload = multer({ dest: 'uploads/' });

// POST /upload endpoint for uploading a video (authenticated)
router.post('/upload', authenticateToken, upload.single('video'), videoController.uploadVideo);

// POST /trim endpoint for trimming a video (authenticated)
router.post('/trim', authenticateToken, videoController.trimVideo);

// POST /merge endpoint for merging videos (authenticated)
router.post('/merge', authenticateToken, videoController.mergeVideos);

module.exports = router;
