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
    type: "confirm",
    message: "Do you want to add a description?",
    name: "addDescription",
  },
  {
    type: "string",
    message: "Provide a description for your project:",
    name: "description",
    validate: mandatoryValidation,
    when: (answers) => {
      return answers["addDescription"] === true;
    },
    type: "string",
    message: "Do you want to add Table of Contents?:",
    name: "TableOfContents",
    validate: mandatoryValidation,
    when: (answers) => {
      return answers["addDescription"] === true;
    },
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
      console.log("answers:");
      console.log(answers);

      //generate markdown here
      // save to file also
      //let markdown = generateMarkdown({ title: "this is a test" });
      //writeToFile("README.md", markdown);
    })
    .catch((error) => {
      console.error("Error encountered: " + error);
    });
}

// function call to initialize program
init();
