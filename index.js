const fs = require('fs');
const path = require('path');
const sharp = require('sharp');

const inputDirectory = './input';
const outputDirectory = './output';

fs.readdir(inputDirectory, (err, files) => {
    if (err) {
        console.error('Error reading input directory:', err);
        return;
    }

    files.forEach((file) => {
        const inputFilePath = path.join(inputDirectory, file);
        const fileExtension = path.extname(file).toLowerCase();

        if (fileExtension === '.png' || fileExtension === '.jpg' || fileExtension === '.jpeg') {
            const outputFileName = path.basename(file, fileExtension) + '.webp';
            const outputFilePath = path.join(outputDirectory, outputFileName);

            sharp(inputFilePath)
                .webp({ quality: 80 })
                .toFile(outputFilePath)
                .then(() => {
                    console.log(`Converted ${file} to ${outputFileName}`);
                })
                .catch((err) => {
                    console.error('Error converting image:', err);
                });
        }
    });
});
