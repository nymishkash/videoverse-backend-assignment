const { uploadVideo, trimVideo, mergeVideos } = require('../models/videoModel');

exports.uploadVideo = async (req, res) => {
    try {
        await uploadVideo(req.file.path); // Handle the uploaded file path
        res.status(200).send('Video uploaded successfully.');
    } catch (error) {
        console.error('Error uploading video:', error);
        res.status(500).send('Error uploading video.');
    }
};

exports.trimVideo = async (req, res) => {
    const { inputPath, trimStart, trimDuration } = req.body;

    try {
        await trimVideo(inputPath, trimStart, trimDuration);
        res.status(200).send('Video trimmed successfully.');
    } catch (error) {
        console.error('Error trimming video:', error);
        res.status(500).send('Error trimming video.');
    }
};

exports.mergeVideos = async (req, res) => {
    const { prerollPath, inputPath } = req.body;

    try {
        await mergeVideos(prerollPath, inputPath);
        res.status(200).send('Videos merged successfully.');
    } catch (error) {
        console.error('Error merging videos:', error);
        res.status(500).send('Error merging videos.');
    }
};
