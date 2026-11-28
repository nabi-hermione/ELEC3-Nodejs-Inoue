// Full Name: Kate Diane Inoue
// Section: IV-BSIT B
// Activity: Set 1 - N2: Modular Calculator
// Date: November 28, 2026

// Import custom modules
const operations = require("./operations");
const formatResult = require("./formatter");

// Import built-in path module
const path = require("path");

// Read operation and numbers from command-line arguments
const [operation, ...values] = process.argv.slice(2);

// Display usage instructions
function showUsage() {
    const fileName = path.basename(__filename);

    console.log(`Usage: node ${fileName} <operation> <numbers>`);
    console.log("Available operations: add, subtract, multiply, divide, average");
}

// Check if the operation is valid
const validOperations = ["add", "subtract", "multiply", "divide", "average"];

if (!operation || !validOperations.includes(operation.toLowerCase())) {
    console.log("Error: Unknown operation.");
    showUsage();
    process.exitCode = 1;
} else if (values.length === 0) {
    console.log("Error: Please provide numbers.");
    showUsage();
    process.exitCode = 1;
} else {
    // Convert command-line arguments into numbers
    const numbers = values.map(Number);

    // Validate numeric inputs
    if (numbers.some(number => !Number.isFinite(number))) {
        console.log("Error: Please enter valid numbers only.");
        process.exitCode = 1;
    } else if (operation.toLowerCase() !== "average" && numbers.length !== 2) {
        console.log("Error: This operation requires exactly two numbers.");
        process.exitCode = 1;
    } else {
        try {
            // Perform the selected operation
            const selectedOperation = operation.toLowerCase();
            const result = operations[selectedOperation](...numbers);

            // Format the calculation result
            const symbols = {
                add: "+",
                subtract: "-",
                multiply: "*",
                divide: "/"
            };

            const expression = selectedOperation === "average"
                ? `average(${numbers.join(", ")})`
                : `${numbers[0]} ${symbols[selectedOperation]} ${numbers[1]}`;

            console.log(formatResult(expression, result));

        } catch (error) {
            console.log(`Error: ${error.message}`);
            process.exitCode = 1;
        }
    }
}