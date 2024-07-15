const ffmpeg = require('fluent-ffmpeg');
const { promises: fsPromises } = require('fs');
const { basename, join } = require('path');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath);

function uploadVideo(filePath) {
    // Process uploaded video if needed
    return Promise.resolve();
}

function trimVideo(inputPath, trimStart, trimDuration) {
    return new Promise((resolve, reject) => {
        const outputPath = join('uploads', `trimmed-${basename(inputPath)}`);

        ffmpeg(inputPath)
            .setStartTime(trimStart)
            .setDuration(trimDuration)
            .output(outputPath)
            .on('end', resolve)
            .on('error', reject)
            .run();
    });
}

function mergeVideos(prePath, inputPath) {
    return new Promise((resolve, reject) => {
        const inputName = basename(inputPath);
        const outputPath = join('uploads', `merged-${inputName}`);

        ffmpeg(prePath)
            .input(inputPath)
            .on('error', reject)
            .on('end', resolve)
            .mergeToFile(outputPath, 'uploads/tmp');
    });
}

module.exports = { uploadVideo, trimVideo, mergeVideos };
