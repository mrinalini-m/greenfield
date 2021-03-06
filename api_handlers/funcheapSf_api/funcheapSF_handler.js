const fs = require('fs');
const scrape = require('./scrape');

module.exports = {};

//Underscore parameter here is 'zip' in other handlers.
module.exports.getSfEvents = function(_, cb) {
	fs.readdir(__dirname + '/datesJSON', (err, data) => {
		if (err) throw err;
		parseDatesJSON(data, cb);
	});
};

function parseDatesJSON(array, cb, result = []) {
	//Base case. 
	if (!array.length) {
		cb(result);
		return; 
	}
	let currentFile = array.shift();
	fs.readFile(__dirname + '/datesJSON/' + currentFile, (err, data) => {
		if (err) throw err;
		let json = JSON.parse(data);
		result.push(...json);
		parseDatesJSON(array, cb, result);
	});
};