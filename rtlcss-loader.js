var rtlcss = require('rtlcss');
// Identity loader
module.exports = function(source) {
  return rtlcss.process(source);
};
