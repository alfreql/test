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

  repository.getAll(resources.RESOURCE_COUNTRY_ALL, null, function (error, results) {

    if (error) {
      console.log("Eroor");
      callback(error, null);
    }

    console.log("OKKKKIIIIIIIIII");
    var response = { statusCode: 404, body: "Not Found" };
    if (results != null && results.length > 0) {
      response.statusCode = 200;
      response.body = JSON.stringify(results);
    }

    console.log("call callback");
    callback(null, response);
  });

};
