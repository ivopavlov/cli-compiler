'use strict'

var handle = () => {

}

var ast = null;
module.exports = {
	parse: (tokens) => {
		if (tokens && tokens.length > 0) {
			ast = {
				type: 'program',
				body: []
			}
			var pointer = 0;
			console.log(tokens);
			return ast;
		}
	}
}
