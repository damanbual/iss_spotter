// iss.js
const needle = require('needle');

const fetchMyIP = function(callback) {
  needle.get('https://api.ipify.org?format=json', (error, response) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${response.body}`;
      callback(Error(msg), null);
      return;
    }

    const ip = response.body.ip;
    callback(null, ip);
  });
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

const fetchISSFlyOverTimes = function(coords, callback) {
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`;
  
  needle.get(url, (error, response) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching ISS pass times. Response: ${response.body}`;
      callback(Error(msg), null);
      return;
    }

    const passes = response.body.response;
    callback(null, passes);
  });
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes };