module.exports = {
	type: 'program',
	body: [
		// int a;
		{
			type: 'variableDeclaration',
			kind: 'int',
			declarations: [
				{
					type: 'variableDeclarator',
					id: {
						type: 'identifier',
						name: 'a'
					},
					init: null
				}
			]
		},
		// a = 2;
		{
			type: 'expressionStatement',
			expression: {
				type: 'assignmentExpression',
				operator: '=',
				left: {
					type: 'identifier',
					name: 'a'
				},
				right: {
					type: 'literal',
					value: 2
				}
			}
		},
		// int a = 10;
		{
			type: 'variableDeclaration',
			kind: 'int',
			declarations: [
				{
					type: 'variableDeclarator',
					id: {
						type: 'identifier',
						name: 'a'
					},
					init: {
						type: 'literal',
						value: 10
					}
				}
			]
		},
		// int b = a;
		{
			type: 'variableDeclaration',
			kind: 'int',
			declarations: [
				{
					type: 'variableDeclarator',
					id: {
						type: 'identifier',
						name: 'b'
					},
					init: {
						type: 'identifier',
						name: 'a'
					}
				}
			]
		},
		// int c = 1 + 5;
		{
			type: 'variableDeclaration',
			kind: 'int',
			declarations: [
				{
					type: 'variableDeclarator',
					id: {
						type: 'identifier',
						name: 'c'
					},
					init: {
						type: 'binaryExpression',
						operator: '+',
						left: {
							type: 'literal',
							value: 1
						},
						right: {
							type: 'literal',
							value: 5
						}
					}
				}
			]
		},
		// int d = a + b + c
		{
			type: 'variableDeclaration',
			kind: 'int',
			declarations: [
				{
					type: 'variableDeclarator',
					id: {
						type: 'identifier',
						name: 'd'
					},
					init: {
						type: 'binaryExpression',
						operator: '+',
						left: {
							type: 'identifier',
							name: 'a'
						},
						right: {
							type: 'binaryExpression',
							operator: '*',
							left: {
								type: 'identifier',
								name: 'b'
							},
							right: {
								type: 'identifier',
								name: 'c'
							}
						}
					}
				}
			]
		},
		// printf(a)
		{
			type: 'expressionStatement',
			expression: {
				type: 'callExpression',
				callee: {
					type: 'memberExpression',
					object: {
						type: 'identifier',
						name: 'printf'
					},
					arguments: [
						{
							type: 'identifier',
							name: 'a'
						}
					]
				}
			}
		}
	]
}
