'use strict'

var sectionText = [];
var sectionData = [];
var sectionBss = [];
var _start = [];
var declaredVars = [];

var handle = (a) => {
	switch (a.type) {
		case 'variableDeclaration':
			if (a.declarations) {
				for (var d of a.declarations) {
					if (d.type == 'variableDeclarator') {
						if (d.init == null) {
							if (d.id.type == 'identifier') {
								sectionBss.push(
									`${d.id.name} resb 5`
								);
							}
						} else {
							if (d.init.type == 'literal') {
								var directive = 'db';
								sectionData.push(
									`${d.id.name} ${directive} "${d.init.value}", 0xA`,
									`len${d.id.name} equ $ - ${d.id.name}`
								);
							} else if (d.init.type == 'identifier') {
								// do something
							}
						}
					}
				}
			}
			break;
		default:

	}
}

module.exports = {
	generate: (ast) => {
		if (ast.type == 'program') {
			// console.log(ast.body);
			if (ast.body && ast.body.length > 0) {
				for (var b of ast.body) {
					handle(b);
				}
			}
		}
	}
}
