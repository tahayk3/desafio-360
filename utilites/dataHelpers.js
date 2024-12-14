function isValidInteger(value) {
    return /^\d+$/.test(value); // Check if the string consists of only digits
  }
  
function convertToInt(value) {
    if (isValidInteger(value)) {
      return parseInt(value);
    } else {
      // Handle invalid input (e.g., throw an error)
      throw new Error("Invalid integer value"); 
    }
}

module.exports = { convertToInt };