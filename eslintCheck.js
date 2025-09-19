// eslintCheck.js - Utility script to check ESLint errors
const { exec } = require("child_process");
const path = require("path");

// Define the file to check
const fileToCheck = path.join(__dirname, "src", "components", "Navbar.tsx");

console.log(`Checking ESLint errors in: ${fileToCheck}`);

exec(`npx eslint "${fileToCheck}" --format json`, (error, stdout, stderr) => {
  if (error) {
    try {
      const results = JSON.parse(stdout);
      console.log("\nESLint Results:");

      if (results.length === 0) {
        console.log("No ESLint errors found!");
        return;
      }

      results.forEach((result) => {
        if (result.messages.length === 0) {
          console.log(`No errors in ${result.filePath}`);
        } else {
          console.log(`\nFile: ${result.filePath}`);
          result.messages.forEach((msg) => {
            console.log(`Line ${msg.line}:${msg.column} - ${msg.message} (${msg.ruleId})`);
          });
        }
      });
    } catch (e) {
      console.error("Error parsing ESLint output:", e);
      console.log("Raw output:", stdout);
    }
  } else {
    console.log("No ESLint errors found!");
  }

  if (stderr) {
    console.error("Error:", stderr);
  }
});
