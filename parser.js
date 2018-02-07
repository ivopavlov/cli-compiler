'use strict'

function readValue(tokenReader) {
	switch (t.type) {
	case "ident":
		return {
			"type": "Identifier",
			"name": t.name,
			"type": t.type,
		}
	case "number":
		return {
			"type": "Literal",
			"value": t.value,
		}
	default:
		throw "Unexpected token " + JSON.stringify(t)
	}
}

function handle(tokenReader) {
	var left = readValue(tokenReader)

	var t = tokenReader.current()
	switch (t.type) {
		case "ident":
			var left = {
				"type": "Identifier",
				"name": "a",
			}
		case 'specialSymbol':
			switch (t.name) {
				case 'add':
				case 'sub':
				case 'mul':
				case 'div':
					var right = handle(tokenReader)
					return {
						type: "BinaryExpression",
						left: left,
						right: right,
						operator: t.name,
					}
					break;

				case 'rparen':
					if (ast.body[pointer].type == 'expressionStatement') {
						// continue reading statement
					}
					break;
				default:
					console.log('Unsupported specialSymbol:', t.name);
			}
			break;
		default:

	}
}

var TokenReader(tokens) {
	var i = 0;
	return {
		next: function () {
			i++;
			return tokens[i]
		},
		current: function() {
			return tokens[i]
		},
		reverse: function() {
			i--;
		}
	}
}

var ast = null;
module.exports = {
	parse: (tokens) => {

		var tokenReader = new TokenReader(tokens)

		if (tokens && tokens.length > 0) {
			ast = {
				type: 'program',
				body: []
			}
			var pointer = 0;
			for (var t of tokens) {
				if (!ast.body[pointer]) {
					ast.body[pointer] = {}
				}
				switch (t.type) {
					case 'variable':
						ast.body[pointer] = {
							"type": "VariableDeclarator",
							"id": {
								"type": "Identifier",
								"name": "a",
							},
							init: handle(tokenReader),
						}
						break;
					case 'ident':
						if (ast.body[pointer].type == 'varDeclaration') {
							if (!ast.body[pointer].varDeclarator) {
								ast.body[pointer].varDeclarator = {};
							}
							ast.body[pointer].varDeclarator.ident = t.value;
						} else if (ast.body[pointer].type == 'expressionStatement') {
							ast.body[pointer].arguments = {
								identifier: {
									name: t.value
								}
							};
						}
						break;
					case 'specialSymbol':
						switch (t.name) {
							case 'assign':
								if (ast.body[pointer].type == 'varDeclaration') {
									// continue with declaration
								}
								break;
							case 'semicolon':
								pointer++;
								break;
							case 'lparen':
								if (ast.body[pointer].type == 'expressionStatement') {
									ast.body[pointer].arguments = {};
								}
								break;
							case 'rparen':
								if (ast.body[pointer].type == 'expressionStatement') {
									// continue reading statement
								}
								break;
							default:
								console.log('Unsupported specialSymbol:', t.name);
						}
						break;
					case 'number':
						if (ast.body[pointer].type == 'varDeclaration') {
							ast.body[pointer].varDeclarator.value = t.value;
						}
						break;
					case 'keyword':
						if (!ast.body[pointer].type) {
							ast.body[pointer].type = 'expressionStatement';
							ast.body[pointer].ident = t.value;
						} else if (ast.body[pointer].type == 'varDeclaration') {
							// console.log(ast.body[pointer]);
							ast.body[pointer].varDeclarator.value = {
								type: 'expressionStatement',
								ident: t.value
							};
						}
						break;
					default:
						console.log('Unsupported token:', t);
				}
			}
			// console.log(tokens);
			return ast;
		}
	}
}
