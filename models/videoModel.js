const cloudinary = require('../config/cloudinaryConfig');
const { join, basename } = require('path');
const { promises: fsPromises } = require('fs');
const ffmpeg = require('fluent-ffmpeg');

const ffmpegPath = require('@ffmpeg-installer/ffmpeg').path;
const ffprobePath = require('@ffprobe-installer/ffprobe').path;

ffmpeg.setFfmpegPath(ffmpegPath);
ffmpeg.setFfprobePath(ffprobePath); 

async function uploadToCloudinary(filePath) {
    try {
        const result = await cloudinary.uploader.upload(filePath, {
            resource_type: "video",
            folder: "your_folder_name" // Optional: Specify a folder in your Cloudinary account
        });
        return result.secure_url;
    } catch (error) {
        console.error('Error uploading to Cloudinary:', error);
        throw error;
    }
}

async function trimVideo(inputPath, trimStart, trimDuration) {
    return new Promise((resolve, reject) => {
        const outputPath = join('uploads', `trimmed-${Date.now()}-${basename(inputPath)}`);

        ffmpeg(inputPath)
            .setStartTime(trimStart)
            .setDuration(trimDuration)
            .output(outputPath)
            .on('end', async () => {
                try {
                    const cloudinaryUrl = await uploadToCloudinary(outputPath);
                    await fsPromises.unlink(outputPath); // Delete local trimmed file after upload
                    resolve(cloudinaryUrl);
                } catch (error) {
                    reject(error);
                }
            })
            .on('error', reject)
            .run();
    });
}

async function mergeVideos(prePath, inputPath1, inputPath2) {
    return new Promise((resolve, reject) => {
        const inputName1 = basename(inputPath1);
        const inputName2 = basename(inputPath2);
        const outputPath = join('uploads', `merged-${Date.now()}-${inputName1}-${inputName2}`);

        ffmpeg(prePath)
            .input(inputPath1)
            .input(inputPath2)
            .on('error', reject)
            .on('end', async () => {
                try {
                    const cloudinaryUrl = await uploadToCloudinary(outputPath);
                    await fsPromises.unlink(outputPath); // Delete local merged file after upload
                    resolve(cloudinaryUrl);
                } catch (error) {
                    reject(error);
                }
            })
            .mergeToFile(outputPath, 'uploads/tmp');
    });
}

module.exports = { uploadToCloudinary, trimVideo, mergeVideos };
