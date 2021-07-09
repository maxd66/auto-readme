// TODO: Include packages needed for this application
const inquirer = require('inquirer');
const fs = require('fs');
const generateMarkdown = require('./utils/generateMarkdown');
// TODO: Create an array of questions for user input
const questions = ['What would you like the description to say?', 'What would you like the installation instructions to say?', 'What would you like the usage information?', 'What would you like the contribution guidelines to say?', 'What would you like the test instructions to say?'];

let includeDescription = true;
let includeInstallation = true;
let includeUsage = true;
let includeContribution = true;
let includeTest = true;

function writeToFile(fileName, data) {
    let completeResponse = `# ${data.title}
${data.username}, ${data.email}\n\n`; 

    const chosenLicense = generateMarkdown(data.license)
    completeResponse += `${chosenLicense}\n\n`;
    if (includeDescription) {
        completeResponse += `## Description
${data.description}\n\n`
    }
    if (includeInstallation) {
        completeResponse += `## Installation
${data.installation}\n\n`
    }
    if (includeUsage) {
        completeResponse += `## Usage
${data.usage}\n\n`
    }
    if (includeContribution) {
        completeResponse += `## Contribution
${data.contribution}\n\n`
    }
    if (includeTest) {
        completeResponse += `## Test
${data.test}\n\n`
    }
    completeResponse += `## License
This project is under the ${data.license}`

    fs.writeFile(fileName, completeResponse, (err) => err ? console.log(err) : console.log('Success!'))
}


// TODO: Create a function to initialize app
function init() {
    inquirer
    .prompt([
        {
            type: 'input',
            message: 'Enter the README title',
            name: 'title'
        },
        {
            type: 'input',
            message: questions[0],
            name: 'description'
        },
        {
            type: 'input',
            message: questions[1],
            name: 'installation',
        },
        {
            type: 'input',
            message: questions[2],
            name: 'usage',
        },
        {
            type: 'input',
            message: questions[3],
            name: 'contribution',
        },
        {
            type: 'input',
            message: questions[4],
            name: 'test',
        },
        {
            type: 'list',
            message: "Choose a licensing badge",
            name: 'license',
            choices: ['MIT', 'GNU GPLv3', 'Mozilla Public License 2.0', 'Unlicense', 'Apache License 2.0']
        },
        {
            type: 'input',
            message: 'Please enter your GitHub username',
            name: 'username'
        },
        {
            type: 'input',
            message: 'Please enter your email',
            name: 'email'
        }
    ])
    .then((answers) => {
        // Turnoury for each user input to check if it should be included
        answers.description ? console.log('including description...') : includeDescription = false;
        answers.installation ? console.log('including installation...') : includeInstallation = false;
        answers.usage ? console.log('including usage...') : includeUsage = false;
        answers.contribution ? console.log('including contribution...') : includeContribution = false;
        answers.test ? console.log('including test...') : includeTest = false;
        // Adds opening line to readme based on git user name and email
        writeToFile(`${answers.title}.md`, answers);
    })

}

// Function call to initialize app
init();
