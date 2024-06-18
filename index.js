
const { fetchISSFlyOverTimes } = require('./iss');

// Comment out test code after verification
// fetchISSFlyOverTimes({ latitude: '49.27670', longitude: '-123.13000' }, (error, passTimes) => {
//   if (error) {
//     console.log("It didn't work!" , error);
//     return;
//   }
//
//   console.log('It worked! Returned flyover times:' , passTimes);
// });
