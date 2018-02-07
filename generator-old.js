'use strict'

var sectionText = [];
var sectionData = [];
var sectionBss = [];
var _start = [];
var declaredVars = [];
module.exports = {
	generate: (ast) => {
		if (ast.type == 'program') {
			// console.log(ast.body);
			if (ast.body && ast.body.length > 0) {
				for (var b of ast.body) {
					switch (b.type) {
						case 'varDeclaration':
							var directive = 'db';
							if (b.varDeclarator) {
								var data = b.varDeclarator;
								if (typeof data.value == 'object') {
									if (data.value.type == 'expressionStatement') {
										if (data.value.ident == 'scanf') {
											sectionBss.push(
												`${data.ident} resb 5\n`
											);
											declaredVars.push(data.ident);
											_start.push(
												`mov eax, 3`,
												`mov ebx, 2`,
												`mov ecx, ${data.ident}`,
												`mov edx, 5`,
												`int 80h\n`
											);
										}
									}
								} else {
									sectionData.push(
										`${data.ident} ${directive} "${data.value}", 0xA`,
										`len${data.ident} equ $ - ${data.ident}`
									);
								}
							}
							break;
						case 'expressionStatement':
							if (sectionText.indexOf('global _start\n') < 0) {
								sectionText.push('global _start\n');
							}
							switch (b.ident) {
								case 'printf':
									if (b.arguments) {
										if (b.arguments.identifier) {
											var ident = b.arguments.identifier;
											var size = `len${ident.name}`;
											if (declaredVars.indexOf(ident.name) != -1) {
												size = 5;
											}
											_start.push(
												'mov eax, 4',
												'mov ebx, 1',
												`mov ecx, ${ident.name}`,
												`mov edx, ${size}`,
												'int 80h\n'
											);
										}
									}
									break;
								default:
									console.log('Unsupported expression: ', b.ident);
							}
							break;
						default:
							console.log('Unsupported type: ', b.type);
					}
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
			} else {
				console.log('Program does not have a body');
			}
		}
	}
}
