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
  var updatedObject = JSON.parse(event.body);
  console.log(updatedObject);
  console.log("event.pathParameters.id = " + event.pathParameters.id);

  var params = [];
  try {
    params = getParametresValues(updatedObject, resource);
  } catch (ex) {
    console.log(ex);
    return callback(null, { statusCode: 400, body: JSON.stringify("Bad Parameters") })
  }
  
  params.push(event.pathParameters.id)
  repository.update(resource, params, function (error, results) {

    if (error) {
      console.log("Error");
      return callback(error, null);
    }

    var response = { statusCode: 404, body: JSON.stringify("Not Found") };
    if (results > 0) {
      response.statusCode = 200;
      response.body = JSON.stringify(results);
    }

    console.log("OKKKKIIIIIIIIII");
    console.log(results);
    callback(null, response);

  });//*/

};

/**
 * Retorna la query asignada al: HTTPMethod:/recurso
 * @param {*} resource 
 */
var getParametresValues = function (updatedObject, resource) {
  var sql = resources[resource];//"PUT:/country/{id}"
  console.log(JSON.stringify(sql));

  var arr = sql.split(/ set /i);//sql.split(" set ");
  console.log(JSON.stringify(arr));

  arr = arr[1].split(/ where /i); //arr[1].split(" where ");
  console.log(JSON.stringify(arr));

  var temp = arr[0].replace(/\s/g, '') + ",";
  console.log(JSON.stringify(temp));

  arr = temp.split("=?,");
  console.log(JSON.stringify(arr));

  var parameters = [];
  for (var i = 0; i < arr.length; i++) {
    if (arr[i]) {
      if (typeof updatedObject[arr[i]] === 'undefined')
        throw Error("Object recived has invalid propeties");

      parameters.push(updatedObject[arr[i]]);
    }

  }
  console.log(parameters);
  return parameters;
};



