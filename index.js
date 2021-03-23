#!/usr/bin/env node

const inquirer = require('inquirer');
const { createVoicemailFile } = require('./utils');
const child = require('child_process').spawn;
const path = require('path');
const fs = require('fs');
const chalk = require('chalk');
const header = require('boxen');
const script = path.format({dir: __dirname, base: 'pager.js'});

console.log(chalk.magenta(
    header('Instagram Voicemail v1.0', {
        padding: 1,
        borderColor: 'magenta',
        borderStyle: 'classic'
    })
));

inquirer.prompt([
    {
        type: 'input',
        message: chalk.magenta('Please insert your Instagram username:'),
        name: 'username'
    },
    {
        type: 'password',
        message: chalk.magenta('Please insert your Instagram password:'),
        name: 'password'
    },
    {
        type: 'confirm',
        message: chalk.magenta('Do you want enable voicemail bot?'),
        name: 'enableBot'
    }
]).then( (answers) => {
    if( answers.enableBot ){
        createVoicemailFile();
    }
    child(process.execPath, [script], {
        cwd: __dirname,
        env: {
            IG_USERNAME: answers.username,
            IG_PASSWORD: answers.password,
            ENABLE_BOT: answers.enableBot,
            FORCE_COLOR: 3
        },
        stdio: 'inherit'
    });

});



