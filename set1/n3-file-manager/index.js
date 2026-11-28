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

// Deletes an existing file
function deleteFile(fileName) {
    const filePath = getFilePath(fileName);

    if (!fs.existsSync(filePath)) {
        throw new Error(`File not found: ${fileName}`);
    }

    fs.unlinkSync(filePath);
    console.log(`File deleted successfully: ${fileName}`);
}

// Displays all files and their details
function listFiles() {
    const fileNames = fs.readdirSync(FILES_DIR).filter(fileName => {
        const filePath = path.join(FILES_DIR, fileName);
        return fs.statSync(filePath).isFile();
    });

    if (fileNames.length === 0) {
        console.log("No files found.");
        return;
    }

    fileNames.forEach(fileName => {
        const filePath = path.join(FILES_DIR, fileName);
        const content = fs.readFileSync(filePath, "utf8");

        console.log("\n------------------------------");
        console.log(`Full path: ${filePath}`);
        console.log(`File name: ${path.basename(filePath)}`);
        console.log(`Extension: ${path.extname(filePath)}`);
        console.log(`Contents:\n${content}`);
    });

    console.log("\n------------------------------");
}

// Read command-line arguments
const [command, fileName, ...contentParts] = process.argv.slice(2);
const content = contentParts.join(" ");

// Execute the selected file operation
try {
    switch (command) {
        case "create":
            if (!fileName || contentParts.length === 0) {
                throw new Error('Usage: node index.js create <filename> "<content>"');
            }
            createFile(fileName, content);
            break;

        case "read":
            if (!fileName) {
                throw new Error("Please provide a file name.");
            }
            readFile(fileName);
            break;

        case "update":
            if (!fileName || contentParts.length === 0) {
                throw new Error('Usage: node index.js update <filename> "<text>"');
            }
            updateFile(fileName, content);
            break;

        case "delete":
            if (!fileName) {
                throw new Error("Please provide a file name.");
            }
            deleteFile(fileName);
            break;

        case "list":
            listFiles();
            break;

        default:
            console.log("Unknown command.");
            console.log("Available commands: create, read, update, delete, list");
            console.log('Example: node index.js create notes.txt "Hello world"');
            process.exitCode = 1;
    }
} catch (error) {
    console.log(`Error: ${error.message}`);
    process.exitCode = 1;
}