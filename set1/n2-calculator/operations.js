// Full Name: Kate Diane Inoue
// Section: IV-BSIT B
// Activity: Set 1 - N2: Modular Calculator
// Date: November 28, 2026

// Adds two numbers
function add(a, b) {
    return a + b;
}

// Subtracts the second number from the first
function subtract(a, b) {
    return a - b;
}

// Multiplies two numbers
function multiply(a, b) {
    return a * b;
}

// Divides two numbers and prevents division by zero
function divide(a, b) {
    if (b === 0) {
        throw new Error("Cannot divide by zero.");
    }

    return a / b;
}

// Calculates the average of the given numbers
function average(...numbers) {
    if (numbers.length === 0) {
        throw new Error("Please provide at least one number.");
    }

    const total = numbers.reduce((sum, number) => sum + number, 0);
    return total / numbers.length;
}

// Exports all operations for use in other files
module.exports = {
    add,
    subtract,
    multiply,
    divide,
    average
};