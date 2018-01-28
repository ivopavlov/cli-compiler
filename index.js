#!/usr/bin/env node
'use strict';
const program = require('commander');
const shell = require('shelljs');
const Tokenizer = require('./tokenizer.js');

var readFile = (file, cmd) => {
	// if options => cmd.optionName
	var catOutput = shell.cat(file);
	if (catOutput.stderr) {
		console.log(catOutput.stderr);
		return;
	}
	if (!catOutput.stdout) {
		console.log('No content available');
	}
	var tokens = Tokenizer.analyze(catOutput.stdout);
	console.log(tokens);
}

program
	.command('compile <file>')
	// .option('-o, --option', 'add option')
	.action(readFile)

program.parse(process.argv)
