'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _express = require('express');

var _express2 = _interopRequireDefault(_express);

var _bodyParser = require('body-parser');

var _bodyParser2 = _interopRequireDefault(_bodyParser);

var _rides = require('./routes/rides');

var _rides2 = _interopRequireDefault(_rides);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 5008;
var app = (0, _express2.default)();

app.use(_bodyParser2.default.json());
app.use('/rides', _rides2.default);

// error handler
app.use(function (err, req, res, next) {
  res.status(err.status || 500);
  res.json({
    err: err.message,
    error: req.app.get('env') === 'development' ? err : {}
  });
});

app.listen(port, function () {
  console.log('Listening on port ' + port + '.');
});

exports.default = app;
//# sourceMappingURL=app.js.map