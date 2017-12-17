'use strict';

var repository = require('../common/repository.js');
var resources = require('../../resources.json');

/**
 * Update Country By Id
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
module.exports.update = (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false;

  var resource = event.httpMethod + ":" + event.resource;
  console.log(resource);
  var country = JSON.parse(event.body);
  console.log(country);
  console.log("event.pathParameters.id = " + event.pathParameters.id);
  repository.update(resource,  [country.Name, country.RegionCode, country.Deleted, country.PhoneCode, event.pathParameters.id], function (error, results) {

    if (error) {
      console.log("Error");
      callback(error, null);
    }

    var response = { statusCode: 404, body: JSON.stringify("Not Found") };
    if (results > 0) {
      response.statusCode = 200;
      response.body = JSON.stringify(results);
    }

    console.log("OKKKKIIIIIIIIII");
    callback(null, response);

  });//*/

};