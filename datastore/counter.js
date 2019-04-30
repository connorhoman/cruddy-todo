const fs = require('fs');
const path = require('path');
const sprintf = require('sprintf-js').sprintf;

var counter = 0;

// Private helper functions ////////////////////////////////////////////////////

// Zero padded numbers can only be represented as strings.
// If you don't know what a zero-padded number is, read the
// Wikipedia entry on Leading Zeros and check out some of code links:
// https://www.google.com/search?q=what+is+a+zero+padded+number%3F

const zeroPaddedNumber = (num) => {
  return sprintf('%05d', num);
};

const readCounter = (callback) => {
  fs.readFile(exports.counterFile, (err, fileData) => {
    if (err) {
      callback(null, 0); //writeFile(0, cb)
    } else {
      callback(null, Number(fileData)); //writeFile(num, cb)
    }
  });
};

const writeCounter = (count, callback) => {  //0. writeCounter (counter, (err, ) => {})
  var counterString = zeroPaddedNumber(count);
  fs.writeFile(exports.counterFile, counterString, (err) => {
    if (err) {
      throw ('error writing counter');
    } else {
      callback(null, counterString);
    }
  });
};

// Public API - Fix this function //////////////////////////////////////////////

// exports.getNextUniqueId = () => {
//   counter = counter + 1;
//   return zeroPaddedNumber(counter);
// };

exports.getNextUniqueId = (callback) => {
  readCounter((err, id) => {
    if (err) {
      throw 'error!!';
    } else {
      writeCounter(id + 1, (err, num) => {
        if (err) {
          throw 'error!!!';
        } else {
          callback(err, num);
        }
      })
    }
  })
}

// exports.getNextUniqueId = (callback) => {
//       readCounter((err, id) => {
//         if (err) {
//           throw 'error!!';
//         } else {
//           callback(writeCounter(id, (err, num) => {
//             if (err) {
//               throw 'error!!!';
//             } else {
//               return num;
//             }
//           }))
//         }
//       })
//     }
// };





// Configuration -- DO NOT MODIFY //////////////////////////////////////////////

exports.counterFile = path.join(__dirname, 'counter.txt');
