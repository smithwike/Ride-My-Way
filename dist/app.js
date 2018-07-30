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

var _auth = require('./routes/auth');

var _auth2 = _interopRequireDefault(_auth);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var port = process.env.PORT || 5008;
var app = (0, _express2.default)();
app.use(_bodyParser2.default.json());
app.use('/api/v1/rides', _rides2.default);
app.use('/api/v1/auth', _auth2.default);

app.listen(port, function () {
  console.log('Listening on port ' + port + '.');
});

exports.default = app;
//# sourceMappingURL=app.js.map