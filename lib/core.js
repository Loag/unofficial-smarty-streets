const request = require('request');

class Api {
  constructor(options) {
    this.auth_id = options.auth_id;
    this.auth_token = options.auth_token;
  }
  
  clean_address(input, callback) {
    let options = {
      type: 'auto-complete',
      path: 'https://us-autocomplete.api.smartystreets.com/suggest?',
      payload: {
        prefix: input.address,
        city_filter: input.city,
        state_filter: input.state,
      },
      auth_id: this.auth_id,
      auth_token: this.auth_token
    }
    // construct url
    postRequest(options, function(err, res) {
      if (!err) {
        callback(null, res.suggestions[0]);
      } else {
        callback(err);
      }
    });
  }

  batch_validate(input, callback) {
    let options = {
      type: 'validate',
      path: 'https://us-street.api.smartystreets.com/street-address?',
      payload: input, // array of addresses objects w/ city, state, street address
      auth_id: this.auth_id,
      auth_token = this.auth_token
    }
    postRequest(options, function(err, res) {
      if (!err) {
        callback(null, res);
      } else {
        callback(err);
      }
    });
  }
}

function constructHeaders(type) {
  if (type === 'auto-complete') {
    return {
      'Host': 'us-autocomplete.api.smartystreets.com'
    }
  } else {
    return {
      'Content-Type': 'application/json',
      'Host': 'us-autocomplete.api.smartystreets.com'
    }
  }
}

function constructPayload(options) {
  let url = `${options.path}${options.auth_id}${options.auth_token}`;
  let payload = JSON.stringify(options.payload);

  return {
    uri: url,
    headers: constructHeaders(options.type),
    method: 'POST',
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
 
function create (options) {
  return new Api(options)
}

module.exports = create;