'use strict';

var repository = require('../common/repository.js');
var resources = require('../../resources.json');


/**
 * County Get By Id
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
module.exports.getById = (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false;

  var resource = event.httpMethod + ":" + event.resource;
  console.log(resource);
  console.log("event.pathParameters.id = " + event.pathParameters.id);
  repository.getById(resource, event.pathParameters.id, null, function (error, results) {

    if (error) {
      console.log("Error");
      return callback(error, null);
    }

    console.log("OKKKKIIIIIIIIII");
    var response = { statusCode: 404, body: JSON.stringify("Not Found") };
    if (results != null) {
      response.statusCode = 200;
      response.body = JSON.stringify(results);
    }

    callback(null, response);
  });

};

