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

  var country = JSON.parse(event.body);
  console.log(country);
  repository.update(resources.RESOURCE_COUNTRY_UPDATE,  [country.Name, country.RegionCode, country.Deleted, country.PhoneCode, country.id], function (error, results) {

    if (error) {
      console.log("Error");
      callback(error, null);
    }

    console.log("OKKKKIIIIIIIIII");
    callback(null, { statusCode: 200, body: "" });

  });//*/

};