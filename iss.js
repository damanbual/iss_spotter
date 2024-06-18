// iss.js
const needle = require('needle');

const fetchMyIP = function(callback) {
  // Existing function
};

const fetchCoordsByIP = function(ip, callback) {
  const url = `http://ipwho.is/${ip}`;
  
  needle.get(url, (error, response) => {
    if (error) {
      callback(error, null);
      return;
    }

    const body = response.body;
    if (!body.success) {
      const message = `Success status was ${body.success}. Server message says: ${body.message} when fetching for IP ${body.ip}`;
      callback(Error(message), null);
      return;
    }

    const { latitude, longitude } = body;
    callback(null, { latitude, longitude });
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP };