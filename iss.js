const request = require('request');

const fetchMyIP = function(callback) {

  request('https://api.ipify.org?format=json', (error, response, body) => {
    //console.log(body) -> body = {"ip":"204.83.43.237"}
    IP = JSON.parse(body).ip;
    //console.log(IPobj);
    if (error) {
      callback(error, null);
      return;
    }
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
    callback(null, IP);
  });
};

let IP = '';

const fetchCoordsByIP = (ip, callback) => {

  request(`https://api.freegeoip.app/json/${ip}?apikey=60de1920-53d8-11ec-9903-85569968588e`, (error, response, body) => {

    if (error) {
      callback(error, null);
      return;
    }
  
    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }
  
    const data = {
      latitude: JSON.parse(body).latitude,
      longitude: JSON.parse(body).longitude
    };
  
    callback(null, data);
  });

};


const fetchISSFlyOverTimes = function(coords, callback) {
  
  request(`https://iss-pass.herokuapp.com/json/?lat=${coords.latitude}&lon=${coords.longitude}`, (error, response, body) => {
    if (error) {
      callback(error, null);
      return;
    }

    if (response.statusCode !== 200) {
      const msg = `Status Code ${response.statusCode} when fetching coordinates for IP. Response: ${body}`;
      callback(Error(msg), null);
      return;
    }

    const passes = JSON.parse(body).response;
    callback(null, passes);
  });

};

const nextISSTimesForMyLocation = function(callback) {
  fetchMyIP((error, ip) => {
    if (error) {
      callback(error,null);
      return;
    }
    fetchCoordsByIP(ip, (error, data) => {
      if (error) {
        callback(error,null);
        return;
      }
      fetchISSFlyOverTimes(data, (error, passTimes) => {
        if (error) {
          callback(error,null);
          return;
        }
        callback(null, passTimes);

      })
    })
  })
}


module.exports = { fetchMyIP, fetchCoordsByIP, IP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };
