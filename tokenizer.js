'use strict'

const WHITESPASE = /\s/;
const NUMBERS = /[0-9]/;
const LETTERS = /[a-z]/i;
const KEYWORDS = ['scanf', 'printf'];
const VARTYPES = ['int'];

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
				if (value.length > 1) {
					if (KEYWORDS.indexOf(value) != -1) {
						tokens.push({ type: 'keyword', value})
					} else if (VARTYPES.indexOf(value) != -1) {
						tokens.push({type: 'variable', value});
					}
				} else {
					tokens.push({ type: 'ident', value });
				}
				continue;
			}

			if (curChar === '(') {
				tokens.push({
					type: 'specialSymbol',
					name: 'lparen',
					value: '(',
				});
				pointer++;
				continue;
			}
			if (curChar === ')') {
				tokens.push({
					type: 'specialSymbol',
					name: 'rparen',
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
					type: 'specialSymbol',
					name: 'assign',
					value: '=',
				});
				pointer++;
				continue;
			}

			if (curChar == ';') {
				tokens.push({
					type: 'specialSymbol',
					name: 'semicolon',
					value: ';',
				});
				pointer++;
				continue;
			}

			if (curChar == '*') {
				tokens.push({
					type: 'specialSymbol',
					name: 'multiplication',
					value: '*',
				});
				pointer++;
				continue;
			}

			if (curChar == '+') {
				tokens.push({
					type: 'specialSymbol',
					name: 'add',
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
