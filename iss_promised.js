const request = require('request-promise-native');


const fetchMyIp = () => {
  //request() return promise object -> fetchMyIp equal to promise object
  return request('https://api.ipify.org?format=json');
}

const fetchCoordsByIP = function(body) {
  const ip = JSON.parse(body).ip;
  return request(`https://api.freegeoip.app/json/${ip}?apikey=60de1920-53d8-11ec-9903-85569968588e`);
};

const fetchISSFlyOverTimes = function(body) {
  const { latitude, longitude } = JSON.parse(body);
  return request(`https://iss-pass.herokuapp.com/json/?lat=${latitude}&lon=${longitude}`)
}

const nextISSTimesForMyLocation = function() {
  return fetchMyIp()
    .then(fetchCoordsByIP)
    .then(fetchISSFlyOverTimes)
    .then((data) => {
      const { response } = JSON.parse(data);
      return response;
    })
}

module.exports = { fetchMyIp, fetchCoordsByIP, fetchISSFlyOverTimes, nextISSTimesForMyLocation };