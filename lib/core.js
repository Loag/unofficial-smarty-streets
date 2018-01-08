const request = require('request');

class Api {
  constructor(options) {
    this.key = options.key;

  }
  
}

function constructHeaders(options) {
  if (options.authType === 'app') {
    return {
      "Authorization":"App "+options.key,
      "Content-Type":"application/json",
      "Accept":"application/json"
    }
  } else {
    // new Buffer(options.user+":"+options.password)
    let authString = (new Buffer(options.key)).toString('base64');
    return {
      "Authorization":"Basic "+authString,
      "Content-Type":"application/json",
      "Accept":"application/json"
    } 
  }
}

function constructPayload(options) {
  let payload = JSON.stringify(options.payload);
  return {
    uri: options.path,
    headers: constructHeaders({authType: options.headerType, key: options.key}),
    method: options.reqType,
    json: payload
  };
}

function postRequest(input, callback) {
  request.post(constructPayload(input), function(err, res, body) {
    if (!err && res.statusCode === 200) {
      callback(null, JSON.parse(body));
    } else {
      callback(err);
    }
  });
}

function getRequest(input, callback) {
  request.get(constructPayload(input), function(err, res, body) {
    if (!err && res.statusCode === 200) {
      callback(null, JSON.parse(body));
    } else {
      callback(err); 
    }
  });
}
 
function create (options) {
  return new Api(options)
}

module.exports = create;