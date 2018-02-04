'use strict'

var ast = null;
module.exports = {
	parse: (tokens) => {
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
						ast.body[pointer].type = 'varDeclaration';
						ast.body[pointer].kind = t.kind;
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
