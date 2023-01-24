const fs = require("fs");
const path = require("path");
const inquirer = require("inquirer");
const generateMarkdown = require("./utils/generateMarkdown");

const mandatoryValidation = (userInput, answers) => {
  if (userInput == null || userInput.trim().length == 0) {
    return "Input is mandatory";
  }

  return true;
};

// array of questions for user
const questions = [
  {
    type: "string",
    message: "Enter your project's title:",
    name: "title",
    validate: mandatoryValidation,
  },
  {
    type: "string",
    message: "Provide a description for your project:",
    name: "description",
  },
  {
    type: "confirm",
    message: "Do you want to add Table of Contents?:",
    name: "tableOfContents",
  },
  {
    type: "string",
    message: "Provide any installation instructions for your project:",
    name: "installation",
  },
  {
    type: "string",
    message: "Provide any usage information for your project:",
    name: "usage",
  },
  {
    type: "string",
    message: "Provide any contribution instructions for your project:",
    name: "contribution",
  },
  {
    type: "string",
    message: "Provide any testing instructions for your project:",
    name: "tests",
  },
  {
    type: "list",
    message: "Provide your project's license (default MIT):",
    name: "license",
    choices: ["MIT", "Apache"],
    default: "MIT",
  },
  {
    type: "string",
    message: "Enter your github username to show in a questions section:",
    name: "username",
  },
  {
    type: "string",
    message: "Enter your email address to show in a questions section:",
    name: "email",
  },
];

// function to write README file
function writeToFile(fileName, data) {
  fs.writeFileSync(fileName, data);
}

// function to initialize program
function init() {
  inquirer
    .prompt(questions)
    .then((answers) => {
      //console.log("answers:");
      //console.log(answers);

      //generate markdown here
      // save to file also
      let markdown = generateMarkdown(answers);
      writeToFile("README.md", markdown);
    })
    .catch((error) => {
      console.error("Error encountered: " + error);
    });
}

// function call to initialize program
init();
