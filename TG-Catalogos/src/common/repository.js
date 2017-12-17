var mysql = require('mysql');
var config = require('../../config.json');
var resources = require('../../resources.json');
//var func = require('./func.js')

var pool = mysql.createPool({
  host: config.host,
  user: config.user,
  password: config.password,
  database: config.database
});


/**
 * Retorna la query asignada al: HTTPMethod:/recurso
 * @param {*} resource 
 */
var getSqlQuery = function (resource) 
{
  var sql = resources[resource];
  if(sql == null)
  {
    console.log("SQL query no encontrada para recurso: " + resource);
    throw Error("SQL query no encontrada para recurso: " + resource);
  }
  return sql;
};

exports.getAll = function (resource, nestingOptions, callback) {

  var sql = getSqlQuery(resource);
  console.log("SQL = " + sql);
  dbData(sql, [], true, function (error, result) {

    if (error)
      callback(error, null);
    else {
      callback(null, result);
    }

  });
};

exports.getById = function (resource, id, nestingOptions, callback) {

  var sql = getSqlQuery(resource);
  console.log("SQL = " + sql);
  dbData(sql, [id], false, function (error, result) {

    if (error)
      callback(error, null);
    else {
      callback(null, result);
    }

  });
};

var dbData = function getData(sql, parameters, all, callback) {

  pool.getConnection(function (err, connection) {
    console.log("Inside....");

    if (err) {
      console.log("Error = " + JSON.stringify(err));
      callback(err, null);
    }

    console.log("CONNECTEDDDD");


    //var options = { sql, nestTables: true }

    // Use the connection
    connection.query(sql, parameters, function (error, results, fields) {
      // And done with the connection.
      connection.release();

      // Handle error after the release.
      if (error) {
        console.log("ERROR");
        callback(error, null);
      }
      else {
        //var nestedRows = func.convertToNested(results, nestingOptions);
        if (all)
          callback(null, results);
        else
          callback(null, results[0]);
      }

      // Don't use the connection here, it has been returned to the pool.
    });

  });
}



exports.update = function (resource, parameters, callback) {

  pool.getConnection(function (err, connection) {
    console.log("Inside....");

    if (err) {
      console.log("Error = " + JSON.stringify(err));
      callback(err, null);
    }

    console.log("CONNECTEDDDD");

    var sql = getSqlQuery(resource);
    console.log(sql);
    console.log(parameters);

    // Use the connection
    connection.query(sql, parameters, function (error, results, fields) {
      // And done with the connection.
      connection.release();

      // Handle error after the release.
      if (error) {
        console.log("ERROR");
        callback(error, null);
      }
      else {
        //var nestedRows = func.convertToNested(results, nestingOptions);
        callback(null, results.affectedRows);
      }

      // Don't use the connection here, it has been returned to the pool.
    });

  });

};

