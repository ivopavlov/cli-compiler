#!/usr/bin/env node
'use strict';
const program = require('commander');
const shell = require('shelljs');
const fs = require('fs');

const Tokenizer = require('./tokenizer.js');
const Parser = require('./parser.js');
const Generator = require('./generator.js');

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
	var code = null;
	if (tokens && tokens.length > 0) {
		ast = Parser.parse(tokens);

		if (ast) {
			var { sectionText, _start, sectionData, sectionBss } = Generator.generate(ast);
			fs.writeFile('./outputfiles/program.asm', writeString(sectionText, _start, sectionData, sectionBss), (err) => {
				if (err) throw err;
				console.log("The file was succesfully saved!");
				console.log('Use nasm -f elf ../outputfiles/program.asm && ld -m elf_i386 -s -o program ../outputfiles/program.o to build');
			})
		} else {
			console.log('Parser output failed');
		}
	} else {
		console.log('Tokenizer output failed');
		return;
	}
}

var writeString = (sectionText, _start, sectionData, sectionBss) => {
	var string = '';
	string += 'section .bss\n';
	string += sectionBss.join('\n');
	string += 'section .text\n';
	string += sectionText.join('\n');
	string += '_start:\n';
	string += _start.join('\n');
	if (sectionData.length > 0) {
		string += 'section .data\n';
		string += sectionData.join('\n');
	}

	return string;
}

program
	.command('compile <file>')
	// .option('-o, --option', 'add option')
	.action(readFile)

program.parse(process.argv)
