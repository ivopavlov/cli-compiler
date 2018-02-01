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
		return;
	}
	var tokens = Tokenizer.analyze(catOutput.stdout);
	var ast = null;
	if (tokens && tokens.length > 0) {
		ast = Parser.parse(tokens);
	} else {
		console.log('Tokenizer output failed');
		return;
	}
	console.log(tokens);
}

program
	.command('compile <file>')
	// .option('-o, --option', 'add option')
	.action(readFile)

program.parse(process.argv)
