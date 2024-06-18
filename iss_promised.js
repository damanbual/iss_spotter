
const needle = require('needle');

/*
 * Requests user's IP address from https://www.ipify.org/
 * Input: None
 * Returns: Promise of request for IP data, returned as JSON string
 */


const fetchMyIP = function() {
  return needle('get', 'https://api.ipify.org?format=json')
    .then((response) => {
      const body = response.body;
      const ip = body.ip;
      return ip;
    });
};

/* 
 * Makes a request to ipwho.is using the provided IP address to get its geographical information (latitude/longitude)
 * Input: IP address as a string
 * Returns: Promise of request for lat/lon
 */

const fetchCoordsByIP = function(ip) {
  return needle('get', `http://ipwho.is/${ip}`)
    .then((response) => {
      const body = response.body;
      const latitude = body.latitude;
      const longitude = body.longitude;
      return { latitude, longitude };
    });
};

/*
 * Requests data from https://iss-flyover.herokuapp.com using provided lat/long data
 * Input: Body containing geo data response from ipwho.is
 * Returns: Promise of request for fly over data, returned as JSON string
 */

const fetchISSFlyOverTimes = function(coords) {
  const latitude = coords.latitude;
  const longitude = coords.longitude;
  const url = `https://iss-flyover.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`;
  return needle('get', url)
    .then((response) => {
      const body = response.body;
      const passtimes = body.response;
      return passtimes;
    });
};

/* 
 * Input: None
 * Returns: Promise for fly over data for user's location
 */

const nextISSTimesForMyLocation = function() {
  return fetchMyIP()
    .then(ip => fetchCoordsByIP(ip))
    .then(coords => fetchISSFlyOverTimes(coords))
    .then(passtimes => passtimes);
};

module.exports = { fetchMyIP, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };