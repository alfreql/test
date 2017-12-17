'use strict';

var repository = require('../common/repository.js');
var resources = require('../../resources.json');

/**
 * County Get All
 * @param {*} event 
 * @param {*} context 
 * @param {*} callback 
 */
module.exports.getAll = (event, context, callback) => {

  context.callbackWaitsForEmptyEventLoop = false;

  var resource = event.httpMethod + ":" + event.resource;
  console.log(resource);

  repository.getAll(resource, null, function (error, results) {

    if (error) {
      console.log("Eroor");
      callback(error, null);
    }

    console.log("OKKKKIIIIIIIIII");
    callback(null, { statusCode: 200, body: JSON.stringify(results) });
  });

};
