function parser(tokens) {

	// Again we keep a `current` variable that we will use as a cursor.
	let current = 0;

	// But this time we're going to use recursion instead of a `while` loop. So we
	// define a `walk` function.
	function walk() {

		// Inside the walk function we start by grabbing the `current` token.
		let token = tokens[current];

		// We're going to split each type of token off into a different code path,
		// starting off with `number` tokens.
		//
		// We test to see if we have a `number` token.
		if (token.type === 'number') {

			// If we have one, we'll increment `current`.
			current++;

			// And we'll return a new AST node called `NumberLiteral` and setting its
			// value to the value of our token.
			return {
				type: 'NumberLiteral',
				value: token.value,
			};
		}

		// If we have a string we will do the same as number and create a
		// `StringLiteral` node.
		if (token.type === 'string') {
			current++;

			return {
				type: 'StringLiteral',
				value: token.value,
			};
		}

		// Next we're going to look for CallExpressions. We start this off when we
		// encounter an open parenthesis.
		if (
			token.type === 'paren' &&
			token.value === '('
		) {
			token = tokens[++current];
			let node = {
				type: 'CallExpression',
				name: token.value,
				params: [],
			};

			// We increment `current` *again* to skip the name token.
			token = tokens[++current];


			while ((token.type !== 'paren') || (token.type === 'paren' && token.value !== ')')) {
				node.params.push(walk());
				token = tokens[current];
			}
			current++;
			return node;
		}

		throw new TypeError(token.type);
	}

	let ast = {
		type: 'Program',
		body: [],
	};
	while (current < tokens.length) {
		ast.body.push(walk());
	}
	return ast;
}
