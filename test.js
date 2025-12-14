const fs = require('fs-extra');
const path = require('path');
const Jimp = require('jimp');

// --- Configuration ---
const INPUT_DIR = path.join(__dirname, 'bulk');
const OUTPUT_DIR = path.join(__dirname, 'output');
const IMAGE_QUALITY = 80; // Compression quality (0 to 100, where 100 is best quality)

// Allowed image extensions
const ALLOWED_EXTENSIONS = ['.jpg', '.jpeg', '.png', '.gif', '.bmp'];

/**
 * Processes all images in the input directory:
 * 1. Renames them sequentially.
 * 2. Compresses them using Jimp.
 * 3. Saves the processed files to the output directory.
 */
async function processBulkImages() {
    console.log(`Starting image processing from: ${INPUT_DIR}`);
    
    try {
        // 1. Ensure output directory exists and is empty
        await fs.ensureDir(OUTPUT_DIR);
        await fs.emptyDir(OUTPUT_DIR);
        console.log(`Output directory cleared: ${OUTPUT_DIR}`);

        // 2. Read all files in the input directory
        const files = await fs.readdir(INPUT_DIR);

        // Filter for allowed image files
        const imageFiles = files.filter(file => 
            ALLOWED_EXTENSIONS.includes(path.extname(file).toLowerCase())
        ).sort(); // Sort to ensure consistent numbering

        if (imageFiles.length === 0) {
            console.log("No images found in the 'bulk' folder. Exiting.");
            return;
        }

        let counter = 1;
        
        for (const file of imageFiles) {
            const inputPath = path.join(INPUT_DIR, file);
            const newFileName = `img_${counter}.jpg`; // Renaming to img_N.jpg
            const outputPath = path.join(OUTPUT_DIR, newFileName);

            console.log(`Processing ${file} -> ${newFileName}...`);

            try {
                // Read the image using Jimp
                const image = await Jimp.read(inputPath);

                // Compress, force JPEG format, and save
                await image
                    .quality(IMAGE_QUALITY) // Apply compression quality
                    .writeAsync(outputPath); 

                console.log(`Successfully saved: ${newFileName}`);
                counter++;
            } catch (error) {
                console.error(`Error processing file ${file}:`, error.message);
            }
        }

        console.log(`\n✅ All image processing complete. ${counter - 1} images saved to the 'output' folder.`);

    } catch (error) {
        console.error("A critical error occurred during bulk processing:", error.message);
    }
}

// Execute the main function
processBulkImages();