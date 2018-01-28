'use strict'

const WHITESPASE = /\s/;
const NUMBERS = /[0-9]/;
const LETTERS = /[a-z]/i;

module.exports = {
	analyze: (text) => {
		var tokens = [];
		var pointer = 0;
		while (pointer < text.length) {
			var curChar = text[pointer];

			if (WHITESPASE.test(curChar)) {
				pointer++;
				continue;
			}

			if (NUMBERS.test(curChar)) {
				while (NUMBERS.test(curChar)) {
					value += curChar;
					curChar = text[++pointer];
				}
				tokens.push({ type: 'number', value });
				continue;
			}

			if (LETTERS.test(curChar)) {
				var value = '';
				while (LETTERS.test(curChar)) {
					value += curChar;
					curChar = text[++pointer];
				}
				tokens.push({ type: 'name', value });
				continue;
			}

			if (curChar === '(') {
				tokens.push({
					type: 'paren',
					value: '(',
				});
				pointer++;
				continue;
			}
			if (curChar === ')') {
				tokens.push({
					type: 'paren',
					value: ')',
				});
				pointer++;
				continue;
			}

			if (curChar === '"') {
				var value = '';
				curChar = text[++pointer];
				while (curChar !== '"') {
					value += curChar;
					curChar = text[++pointer];
				}
				curChar = text[++pointer];
				tokens.push({ type: 'string', value });
				continue;
			}

			if (curChar == '=') {
				tokens.push({
					type: 'operator',
					subtype: 'assign',
					value: '=',
				});
				pointer++;
				continue;
			}

			if (curChar == ';') {
				tokens.push({
					type: 'semicolon',
					value: ';',
				});
				pointer++;
				continue;
			}

			if (curChar == '*') {
				tokens.push({
					type: 'operator',
					subtype: 'multiplication',
					value: '*',
				});
				pointer++;
				continue;
			}

			if (curChar == '+') {
				tokens.push({
					type: 'operator',
					subtype: 'add',
					value: '+',
				});
				pointer++;
				continue;
			}
			
			throw new TypeError('Unknown character: ' + curChar);
		}
		return tokens;
	}
}
