// Full Name: Kate Diane Inoue
// Section: IV-BSIT B
// Activity: Set 1 - N3: File Manager with fs and path
// Date: November 28, 2026

// Import built-in modules
const fs = require("fs");
const path = require("path");

// Set the storage folder
const FILES_DIR = path.join(__dirname, "files");

// Ensure the files folder exists
fs.mkdirSync(FILES_DIR, { recursive: true });

// Validate and build file paths
function getFilePath(fileName) {
    if (
        !fileName ||
        path.basename(fileName) !== fileName ||
        fileName === "." ||
        fileName === ".."
    ) {
        throw new Error("Please enter a valid file name.");
    }

    return path.join(FILES_DIR, fileName);
}

// Creates a new text file
function createFile(fileName, content) {
    const filePath = getFilePath(fileName);

    if (!content.trim()) {
        throw new Error("Please provide file content.");
    }

    if (fs.existsSync(filePath)) {
        throw new Error("File already exists.");
    }

    fs.writeFileSync(filePath, content);
    console.log(`File created successfully: ${fileName}`);
}

// Reads and displays file contents
function readFile(fileName) {
    const filePath = getFilePath(fileName);

    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${fileName}`);
    }

    const content = fs.readFileSync(filePath, "utf8");
    console.log(`Contents of ${fileName}:\n${content}`);
}

// Appends content to an existing file
function updateFile(fileName, content) {
    const filePath = getFilePath(fileName);

    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${fileName}`);
    }

    if (!content.trim()) {
        throw new Error("Please provide text to append.");
    }

    fs.appendFileSync(filePath, `\n${content}`);
    console.log(`File updated successfully: ${fileName}`);
}