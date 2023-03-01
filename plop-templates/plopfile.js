const datavConponensGenerator = require('./datavComponents/prompt');

module.exports = function (plop) {
  plop.setGenerator('datavConponens', datavConponensGenerator);
};
