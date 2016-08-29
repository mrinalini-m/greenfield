/*
JSON RESPONSE FORMAT
e_title STRING
e_time MILISECONDS/STRING?
e_url STRING
e_geoLocation TUPLE?
e_location: {
  geolocation: TUPLE,
  country: STRING,
  city: STRING,
  address: STRING,
  venue_name: STRING
},
e_description STRING
e_categories ARRAY of STRINGS
e_source STRING
e_sourceImage JPG/PNG?
*/

const url = require('url');
const meetup_api = require('./meetup_api');
const fb_api = require('./fb_api.js');
const utils = require('./utils');

var exports = module.exports = {};

//TODO: Pass in response object for error handling?
exports.getEvents = function(req, res, cb) {
	const urlObject = url.parse(req.url);
	//FIXME: Substring method for zip won't account for other queries. 
	const zip = urlObject.query.substring(4);

  //Get facebook events OR meetup events. Comment one or
  //the other to see results:

  //Index of all of the api calls to be handled. 
  let apiCalls = [meetup_api.getMeetUpEvents, fb_api.getFbEvents];

  utils.asyncMap(apiCalls, function(JSONarray){
    cb(utils.flatten(JSONarray));
  }, zip);
  
	//meetup_api.getMeetUpEvents(zip, cb);
  //fb_api.getFbEvents(zip, cb);
}

//For testing newly created APIs. 
exports.testApiCall = function(requestUrl, cb) {

}
