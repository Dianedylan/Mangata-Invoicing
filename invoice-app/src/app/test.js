

// Create a new Date object for the current date
const currentDate = new Date();

// Add 30 days to the current date
currentDate.setDate(currentDate.getDate() + 30);

// Ensure the date is in the correct 30-day format
if (currentDate.getDate() !== 3) {
  // Adjust the date to the last day of the current month
  currentDate.setMonth(currentDate.getMonth() + 1, 0);
}

// Format the date as a string in the "YYYY-MM-DD" format
const formattedDate = currentDate.toISOString().slice(0, 10);

console.log(formattedDate);

