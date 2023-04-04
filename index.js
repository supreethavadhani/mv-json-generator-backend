const express = require('express');
const fs = require('fs');
const path = require('path');
const {Configuration, OpenAIApi} = require("openai")

const config = new Configuration( {
  apiKey: process.env.OPENAI_API_KEY
})

const x = {
  "name": "students",
  "nameInDb": "students",
  "operations": ["Create", "Filter"],
  "fields": [
    {
      "name": "studentId",
      "dbColumnName": "student_id",
      "dataType": "id",
      "fieldType": "generatedPrimaryKey",
      "listName": null
    },
    {
      "name": "firstName",
      "dbColumnName": "first_name",
      "dataType": "name",
      "fieldType": "requiredData",
      "listName": null
    },
    {
      "name": "lastName",
      "dbColumnName": "last_name",
      "dataType": "name",
      "fieldType": "requiredData",
      "listName": null
    },
    {
      "name": "gender",
      "dbColumnName": "gender",
      "dataType": "gender",
      "fieldType": "requiredData",
      "listName": "gender"
    }
  ]
}

const openai = new OpenAIApi(config)
const app = express();

app.use((req, res, next) => {
  res.setHeader('Access-Control-Allow-Origin', 'http://localhost:4200');
  res.setHeader('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type, Authorization');
  next();
});

app.get('/json-files', (req, res) => {
  const folderPath = req.query.folderPath;
  if (!folderPath) {
    res.status(400).send('Missing folderPath query parameter');
    return;
  }

  const allowedSuffixes = ['page', 'template', 'rec', 'frm'];
  const jsonObjectsBySuffix = {
    form: [],
    page: [],
    template: [],
    record: [],
    application: []
  };

  const readJSONFiles = (folderPath) => {
    fs.readdirSync(folderPath).forEach((file) => {
      const filePath = path.join(folderPath, file);
      if (fs.statSync(filePath).isDirectory()) {
        readJSONFiles(filePath);
      } else {
        if (path.basename(file) === "application.json") {
          const fileContents = fs.readFileSync(filePath, 'utf8');
          const jsonObject = JSON.parse(fileContents);
          jsonObjectsBySuffix.application.push(jsonObject);
        }
        const suffix = path.basename(file).split('.')[1];
        if (allowedSuffixes.includes(suffix)) {
          const fileContents = fs.readFileSync(filePath, 'utf8');
          const jsonObject = JSON.parse(fileContents);
          if (suffix === 'frm') {
            jsonObjectsBySuffix.form.push(jsonObject);
          } else if (suffix === 'page') {
            jsonObjectsBySuffix.page.push(jsonObject);
          } else if (suffix === 'template') {
            jsonObjectsBySuffix.template.push(jsonObject);
          } else if (suffix === 'rec') {
            jsonObjectsBySuffix.record.push(jsonObject);
          } 
        }
      }
    });
  };

  readJSONFiles(folderPath);

  res.json(jsonObjectsBySuffix);
});


app.get('/download-files', (req, res) => {
  const {
    fileName,
    fileContent,
    folderName
  } = req.query;

  // Create the folder if it doesn't exist
  if (!fs.existsSync(folderName)) {
    fs.mkdirSync(folderName);
  }

  // Create the file path
  const filePath = path.join(folderName, `${fileName}.json`);

  // Write the file
  fs.writeFile(filePath, fileContent, (err) => {
    if (err) {
      console.error(err);
      res.status(500).send('Error writing file');
    } else {
      res.download(filePath);
    }
  });
});

const runPrompt = async () => {
  const messages = [{"role": "user","content":" Now give me a metadev-record for employees with fields first name and last name. Only respond with code as plain text without code block syntax around it. "}] ;
  const response = await openai.createChatCompletion({
    model:"davinci:ft-personal-2023-03-25-23-38-48",
    messages:messages,
    max_tokens:2048,
    temperature: 1
  });
  console.log(response.data.choices[0])
}

console.log(process.env.OPENAI_API_KEY)
runPrompt();

const port = process.env.PORT || 3000;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});