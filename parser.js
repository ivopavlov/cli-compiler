'use strict'

var thisIndex = 0
var thisTokens = null;

var getNextToken = () => thisTokens[thisIndex + 1];
var getPrevToken = () => thisTokens[thisIndex - 1];

var createNode = (t) => {
	switch (t.type) {
		case 'variable':
		var node = {
			type: 'variableDeclaration',
			kind: t.value,
			declarations: []
		}
		console.log(node);
		return node;
		break;
		default:

	}
}

var parseVariable = (tokens, current) => {
	var token = tokens[current];
	var declarations = [];
	declarations.push(create(tokens, current + 1))
	return {
		type: 'variableDeclaration',
		kind: t.value,
		declarations: []
	}
}

var parseToken = (tokens, current) => {
	var token = tokens[current];
	if (token.type === 'variable') {
		return parseVariable(tokens, current);
	}
	throw new TypeError(token.type);
}


// var current = {}

var ast = null;
module.exports = {
	parse: (tokens) => {
		if (tokens && tokens.length > 0) {
			ast = {
				type: 'program',
				body: []
			}
			thisTokens = tokens;
			var current = {};

			var current = 0;
			var node = null;
			while (current < tokens.length) {
				[current, node] = parseToken(tokens, current);
				ast.body.push(node);
			}
			return ast;

			// console.log(tokens);
			// console.log(ast);
			return ast;
		}
	}
}
