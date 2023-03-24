// json-files.js

const express = require('express');
const fs = require('fs');
const path = require('path');

const router = express.Router();

router.get('/:folderPath', (req, res) => {
  const folderPath = req.params.folderPath;
  const pageFiles = [];
  const templateFiles = [];
  const recFiles = [];
  const frmFiles = [];

  console.log(folderPath)
  // Recursively read all JSON files in the specified directory and its subdirectories
  const readJsonFiles = (dir) => {
    fs.readdirSync(dir).forEach(file => {
      const filePath = path.join(dir, file);

      // Check if file is a directory
      if (fs.statSync(filePath).isDirectory()) {
        // Recursively read JSON files in subdirectory
        readJsonFiles(filePath);
      } else {
        // Check if file is a JSON file with specific suffixes
        const fileExtension = path.extname(file);
        if (fileExtension === '.json') {
          if (file.endsWith('.page.json')) {
            try {
              // Read the file contents and parse as JSON
              const fileContent = fs.readFileSync(filePath);
              const jsonContent = JSON.parse(fileContent);
              // Push JSON content into the pageFiles array
              pageFiles.push(jsonContent);
            } catch (error) {
              console.error(`Error reading JSON file: ${filePath}`, error);
            }
          } else if (file.endsWith('.template.json')) {
            try {
              // Read the file contents and parse as JSON
              const fileContent = fs.readFileSync(filePath);
              const jsonContent = JSON.parse(fileContent);
              // Push JSON content into the templateFiles array
              templateFiles.push(jsonContent);
            } catch (error) {
              console.error(`Error reading JSON file: ${filePath}`, error);
            }
          } else if (file.endsWith('.rec.json')) {
            try {
              // Read the file contents and parse as JSON
              const fileContent = fs.readFileSync(filePath);
              const jsonContent = JSON.parse(fileContent);
              // Push JSON content into the recFiles array
              recFiles.push(jsonContent);
            } catch (error) {
              console.error(`Error reading JSON file: ${filePath}`, error);
            }
          } else if (file.endsWith('.frm.json')) {
            try {
              // Read the file contents and parse as JSON
              const fileContent = fs.readFileSync(filePath);
              const jsonContent = JSON.parse(fileContent);
              // Push JSON content into the frmFiles array
              frmFiles.push(jsonContent);
            } catch (error) {
              console.error(`Error reading JSON file: ${filePath}`, error);
            }
          }
        }
      }
    });
  };

  readJsonFiles(folderPath);

  // Send the JSON objects as a response
  res.json({
    pageFiles,
    templateFiles,
    recFiles,
    frmFiles
  });
});

module.exports = router;
