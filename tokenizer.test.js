const chai = require('chai');

const Tokenizer = require('./tokenizer.js');

describe('Tokenizer', () => {
	const expect = chai.expect;

	it('Handle empty string', () => {
		let result = Tokenizer.analyze('');
		expect(result).to.be.eql([]);
	});

	it('Handle "int A = 5;"', () => {
		let result = Tokenizer.analyze('int A = 5;');
		expect(result).to.be.eql([{
			kind: "numeric",
			type: "variable",
			value: "int",
		}, {
			type: "ident",
			value: "A",
		}, {
			name: "assign",
			type: "specialSymbol",
			value: "=",
		}, {
			type: "number",
			value: "5",
		}, {
			name: "semicolon",
			type: "specialSymbol",
			value: ";",
		}]);
	});

	it('Handle "printf(A);"', () => {
		let result = Tokenizer.analyze('printf(A);');
		expect(result).to.be.eql([{
			type: "keyword",
			value: "printf",
		}, {
			name: "lparen",
			type: "specialSymbol",
			value: "(",
		}, {
			type: "ident",
			value: "A",
		}, {
			name: "rparen",
			type: "specialSymbol",
			value: ")",
		}, {
			name: "semicolon",
			type: "specialSymbol",
			value: ";",
		}]);
	});
});
