function getLicense(license) {
  if (license == "MIT") {
    return "[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)";
  } else if (license == "Apache") {
    return "[![License](https://img.shields.io/badge/License-Apache_2.0-blue.svg)](https://opensource.org/licenses/Apache-2.0)";
  } else {
    return "";
  }
}

// function to generate markdown for README
function generateMarkdown(data) {
  let result = "";

  const blankLine = "\r\n\r\n";

  let tableOfContents = [];

  if (data.license) {
    result = getLicense(data.license);
  }

  result = `${result}${blankLine}# ${data.title}`;

  //  ${blankLine} is a new line
  if (data.description) {
    result = `${result}${blankLine}## Description${blankLine}${data.description}`;
  }

  if (data.tableOfContents === true) {
    result = `${result}${blankLine}#### Table of Contents${blankLine}_TOC_`; // to replace later
  }

  if (data.installation) {
    result = `${result}${blankLine}## Installation${blankLine}${data.installation}${blankLine}`;
    tableOfContents.push(`1. [Installation](#installation)  ${blankLine}`);
  }

  if (data.usage) {
    result = `${result}${blankLine}## Usage${blankLine}${data.usage}${blankLine}`;
    tableOfContents.push(`1. [Usage](#usage)  ${blankLine}`);
  }

  if (data.license) {
    result = `${result}${blankLine}## License${blankLine}${data.license} License`;
    tableOfContents.push(`1. [License](#license)  ${blankLine}`);
  }

  if (data.contribution) {
    result = `${result}${blankLine}## Contribution${blankLine}${data.contribution}`;
    tableOfContents.push(`1. [Contribution](#contribution)  ${blankLine}`);
  }

  if (data.tests) {
    result = `${result}${blankLine}## Tests${blankLine}${data.tests}`;
    tableOfContents.push(`1. [Tests](#tests)  ${blankLine}`);
  }

  if (data.username || data.email) {
    tableOfContents.push(`1. [Questions](#questions)  ${blankLine}`);
    result = `${result}${blankLine}## Questions`;
    if (data.username) {
      result = `${result}${blankLine}[Profile](https://github.com/${data.username})${blankLine}`;
    }
    if (data.email) {
      result = `${result}${blankLine}For any questions, contact [via email](mailto:${data.email}) `;
    }

    if (data.tableOfContents === true) {
      let tocData = "";
      for (let i = 0; i < tableOfContents.length; i++) {
        tocData = `${tocData}${tableOfContents[i]}${blankLine}`;
      }
      console.log("replacing toc");
      result = result.replace("_TOC_", tocData);
    }
  }

  return result;
}

module.exports = generateMarkdown;
