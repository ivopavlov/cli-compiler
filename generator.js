'use strict'

var sectionText = [];
var sectionData = [];
var sectionBss = [];
var _start = [];
var declaredVars = {};

var handle = (a, prop) => {
	switch (a.type) {
		case 'variableDeclaration':
			if (a.declarations) {
				for (var d of a.declarations) {
					if (d.type == 'variableDeclarator') {
						if (d.init == null) {
							if (d.id.type == 'identifier') {
								declaredVars[`${d.id.name}`] = {
									value: null,
									size: 1
								}
								sectionBss.push(
									`${d.id.name} resb ${declaredVars[d.id.name].size}\n`
								);
							}
						} else {
							if (d.init.type == 'literal') {
								var directive = 'db';
								sectionData.push(
									`${d.id.name} ${directive} "${d.init.value}", 0xA`,
									`len${d.id.name} equ $ - ${d.id.name}`
								);
								declaredVars[`${d.id.name}`] = {
									value: d.init.value,
									size: d.init.value.length
								}
							} else if (d.init.type == 'identifier') {
								sectionBss.push(
									`${d.id.name} resb ${declaredVars[d.init.name].size}\n`
								);
								_start.push(
									`mov eax, [${d.init.name}]`,
									`mov [${d.id.name}], eax\n`
								);
							} else if (d.init.type == 'binaryExpression') {
								sectionBss.push(
									`${d.id.name} resb 1\n`
								);
								declaredVars[`${d.id.name}`] = {
									value: null,
									size: 1
								}
								handle(d.init, prop);
								_start.push(
									`mov [${d.id.name}], eax\n`
								);
							} else if (d.init.type == 'callExpression') {
								sectionBss.push(
									`${d.id.name} resb 1\n`
								);
								declaredVars[`${d.id.name}`] = {
									value: null,
									size: 1
								}
								handle(d.init, d.id.name);
							}
						}
					}
				}
			}
			break;
		case 'expressionStatement':
			if (sectionText.indexOf('global _start\n') < 0) {
				sectionText.push('global _start\n');
			}
			var e = a.expression;
			if (e.type == 'callExpression') {
				if (e.callee.type == 'memberExpression') {
					if (e.callee.object.name == 'printf') {
						if (e.callee.arguments.length > 0) {
							if (e.callee.arguments.length == 1) {
								var arg = e.callee.arguments[0];
								_start.push(
									'mov eax, 4',
									'mov ebx, 1',
									`mov ecx, ${arg.name}`,
									`mov edx, ${declaredVars[arg.name].size}`,
									'int 80h\n'
								);
							}
						} else {
							throw new TypeError('printf exprects an argument');
						}
					}
				}
			} else if (e.type == 'assignmentExpression') {
				if (e.left && e.right) {
					// handle left
					if (e.left.type == 'identifier') {
						// continue assignment
					}
					// handle right
					if (e.right.type == 'literal') {
						_start.push(
							`mov eax, "${e.right.value}"`,
							`mov [${e.left.name}], eax\n`
						);
						declaredVars[`${e.left.name}`].value = e.right.value;
						declaredVars[`${e.left.name}`].size = e.right.value.toString().length;
					} else if (e.right.type == 'identifier') {
						_start.push(
							`mov eax, [${e.right.name}]`,
							`mov [${e.left.name}], eax\n`
						);
						declaredVars[`${e.left.name}`].value = declaredVars[`${e.right.name}`].value;
						declaredVars[`${e.left.name}`].size = declaredVars[`${e.right.name}`].size;
					}
				} else {
					throw new TypeError('assignment exprects left and right arguments');
				}
			}
			break;
		case 'binaryExpression':
			if (a.left && a.right) {
				var l = a.left;
				var r = a.right;
				if (l.type == 'literal') {
					_start.push(
						`mov eax, '${l.value}'`,
						`sub eax, '0'\n`
					);
				} else if (l.type == 'identifier') {
					_start.push(
						`mov eax, [${l.name}]`,
						`sub eax, '0'\n`
					);
				} else if (l.type == 'binaryExpression') {
					handle(l, null);
				}
				if (r.type == 'literal') {
					_start.push(
						`mov ebx, '${r.value}'`,
						`sub ebx, '0'\n`
					);
				} else if (r.type == 'identifier') {
					_start.push(
						`mov ebx, [${r.name}]`,
						`sub ebx, '0'\n`
					);
				} else if (r.type == 'binaryExpression') {
					handle(r, null);
				}
				switch (a.operator) {
					case '+':
						_start.push(
							`add eax, ebx`,
							`add eax, '0'`
						);
						break;
					default:

				}
			}
			break;
		case 'callExpression':
			if (a.callee.type == 'memberExpression') {
				if (a.callee.object.name == 'scanf') {
					if (a.callee.arguments == null) {
						_start.push(
							`mov eax, 3`,
							`mov ebx, 2`,
							`mov ecx, ${prop}`,
							`mov edx, 1`,
							`int 80h\n`
						);
					} else {
						throw new TypeError('scanf does not expect arguments');
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
					handle(b, null);
				}

				// Call exit
				_start.push(
					'mov eax,1',
					`mov ebx, 0`,
					'int 80h\n'
				);

				return {
					sectionText,
					_start,
					sectionData,
					sectionBss
				}
			}
		}
	}
}
