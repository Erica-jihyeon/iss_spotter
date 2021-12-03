const { fetchMyIP } = require('./iss');
const { fetchCoordsByIP } = require('./iss');
const { IP } = require('./iss');
const { fetchISSFlyOverTimes } = require('./iss');
const { nextISSTimesForMyLocation } = require('./iss')

// fetchMyIP((error, ip) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log('It worked! Return IP: ', ip);
// });

// fetchCoordsByIP(IP, (error, data) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }
//   console.log("It worked! Returned coordinates: ", data);
// })


//{ latitude: 52.157, longitude: -106.5614 }
// fetchISSFlyOverTimes({ latitude: 52.157, longitude: -106.5614 }, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!", error);
//     return;
//   }

//   console.log("It worked! Returned flyover times: ", passTimes);
// });

const printPassTimes = function(passTimes) {
  for (const pass of passTimes) {
    // const datetime = new Date(0);
    // datetime.setUTCSeconds(pass.risetime);
    let datetime = new Date(pass.risetime * 1000).toString();
    const duration = pass.duration;
    console.log(`Next pass at ${datetime} for ${duration} seconds!`)
  }

}

nextISSTimesForMyLocation((error, passTimes) => {
  if (error) {
    return console.log("It didn't work!", error);
  }
  printPassTimes(passTimes);
});
