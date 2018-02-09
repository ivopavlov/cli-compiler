module.exports = {
	type: 'program',
	body: [
		// int f = scanf()
		{
			type: 'variableDeclaration',
			kind: 'int',
			declarations: [
				{
					type: 'variableDeclarator',
					id: {
						type: 'identifier',
						name: 'f'
					},
					init: {
						type: 'callExpression',
						callee: {
							type: 'memberExpression',
							object: {
								type: 'itentifier',
								name: 'scanf'
							},
							arguments: null
						}
					}
				}
			]
		},
		// printf(c);
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
							name: 'f'
						}
					]
				}
			}
		}
	]
}
