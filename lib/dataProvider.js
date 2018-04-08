'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _regenerator = require('babel-runtime/regenerator');

var _regenerator2 = _interopRequireDefault(_regenerator);

var _slicedToArray2 = require('babel-runtime/helpers/slicedToArray');

var _slicedToArray3 = _interopRequireDefault(_slicedToArray2);

var _asyncToGenerator2 = require('babel-runtime/helpers/asyncToGenerator');

var _asyncToGenerator3 = _interopRequireDefault(_asyncToGenerator2);

var _classCallCheck2 = require('babel-runtime/helpers/classCallCheck');

var _classCallCheck3 = _interopRequireDefault(_classCallCheck2);

var _createClass2 = require('babel-runtime/helpers/createClass');

var _createClass3 = _interopRequireDefault(_createClass2);

var getTextFromUrl = function () {
  var _ref9 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(strReq) {
    return _regenerator2.default.wrap(function _callee5$(_context5) {
      while (1) {
        switch (_context5.prev = _context5.next) {
          case 0:
            if (!true) {
              _context5.next = 16;
              break;
            }

            _context5.prev = 1;
            _context5.next = 4;
            return (0, _nodeFetch2.default)(strReq);

          case 4:
            _context5.next = 6;
            return _context5.sent.text();

          case 6:
            return _context5.abrupt('return', _context5.sent);

          case 9:
            _context5.prev = 9;
            _context5.t0 = _context5['catch'](1);

            console.log(_context5.t0.message);
            _context5.next = 14;
            return new Promise(function (resolve) {
              return setTimeout(resolve, 500);
            });

          case 14:
            _context5.next = 0;
            break;

          case 16:
          case 'end':
            return _context5.stop();
        }
      }
    }, _callee5, this, [[1, 9]]);
  }));

  return function getTextFromUrl(_x) {
    return _ref9.apply(this, arguments);
  };
}();

var getLinesForParsing = function () {
  var _ref10 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee6(url, removeFirst) {
    var linesText, result;
    return _regenerator2.default.wrap(function _callee6$(_context6) {
      while (1) {
        switch (_context6.prev = _context6.next) {
          case 0:
            _context6.next = 2;
            return getTextFromUrl(url);

          case 2:
            linesText = _context6.sent;
            result = linesText.trim().split('\n');

            if (removeFirst) result = result.slice(1);
            return _context6.abrupt('return', result);

          case 6:
          case 'end':
            return _context6.stop();
        }
      }
    }, _callee6, this);
  }));

  return function getLinesForParsing(_x2, _x3) {
    return _ref10.apply(this, arguments);
  };
}();

var _polyline = require('@mapbox/polyline');

var _polyline2 = _interopRequireDefault(_polyline);

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

require('array-each-slice');

var _decodeTimes = require('./decodeTimes');

var _decodeTimes2 = _interopRequireDefault(_decodeTimes);

var _config = require('./config');

var _config2 = _interopRequireDefault(_config);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var DataProvider = function () {
  function DataProvider() {
    (0, _classCallCheck3.default)(this, DataProvider);
  }

  (0, _createClass3.default)(DataProvider, null, [{
    key: 'getStations',
    value: function () {
      var _ref = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee() {
        var lastUsedStationName;
        return _regenerator2.default.wrap(function _callee$(_context) {
          while (1) {
            switch (_context.prev = _context.next) {
              case 0:
                lastUsedStationName = void 0;
                _context.next = 3;
                return getLinesForParsing(_config2.default.stationsPath, true);

              case 3:
                _context.t0 = function (line) {
                  var _config$stationsRegex = _config2.default.stationsRegex.exec(line).slice(1),
                      _config$stationsRegex2 = (0, _slicedToArray3.default)(_config$stationsRegex, 4),
                      local_id = _config$stationsRegex2[0],
                      name = _config$stationsRegex2[1],
                      lng = _config$stationsRegex2[2],
                      lat = _config$stationsRegex2[3];

                  if (name.length !== 0) lastUsedStationName = name;
                  return {
                    local_id: parseInt(local_id),
                    name: lastUsedStationName,
                    lat: parseInt(lat) / 100000,
                    lng: parseInt(lng) / 100000
                  };
                };

                _context.t1 = localIdsComparator;
                return _context.abrupt('return', _context.sent.map(_context.t0).sort(_context.t1));

              case 6:
              case 'end':
                return _context.stop();
            }
          }
        }, _callee, this);
      }));

      function getStations() {
        return _ref.apply(this, arguments);
      }

      return getStations;
    }()
  }, {
    key: 'getTimes',
    value: function () {
      var _ref2 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee2() {
        return _regenerator2.default.wrap(function _callee2$(_context2) {
          while (1) {
            switch (_context2.prev = _context2.next) {
              case 0:
                _context2.next = 2;
                return getLinesForParsing(_config2.default.timesPath, false);

              case 2:
                _context2.t0 = function (encoded_line) {
                  var index = encoded_line.indexOf(",");
                  var way_id = parseInt(encoded_line.substr(0, index));
                  var decoded_data = (0, _decodeTimes2.default)(encoded_line.substr(index + 1));

                  var days_of_week_groups = Array.from(new Set(decoded_data.workdays));

                  var trips_by_days = Array.from(new Set(decoded_data.workdays)).map(function (element) {
                    return {
                      days_of_week: element.replace('7', '0').split('').map(function (item) {
                        return parseInt(item);
                      }).sort(),
                      tmp_days_of_week_str: element,
                      arrives: []
                    };
                  });

                  var jump_step = decoded_data.workdays.length;
                  for (var j = 0, m = decoded_data.times.length / jump_step; j < m; j++) {
                    var myMap = new Map();
                    for (var i = 0, str_days_of_week = decoded_data.workdays[0]; i < jump_step; str_days_of_week = decoded_data.workdays[++i]) {
                      var tmp = myMap.get(str_days_of_week);
                      if (!tmp) {
                        tmp = {
                          str_days_of_week: str_days_of_week,
                          arrives: []
                        };
                        myMap.set(str_days_of_week, tmp);
                      }
                      tmp.arrives.push(decoded_data.times[i + j * jump_step]);
                    }
                    var _iteratorNormalCompletion = true;
                    var _didIteratorError = false;
                    var _iteratorError = undefined;

                    try {
                      var _loop = function _loop() {
                        var _step$value = (0, _slicedToArray3.default)(_step.value, 2),
                            key = _step$value[0],
                            value = _step$value[1];

                        trips_by_days.find(function (item) {
                          return item.tmp_days_of_week_str === key;
                        }).arrives.push(value.arrives);
                      };

                      for (var _iterator = myMap[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                        _loop();
                      }
                    } catch (err) {
                      _didIteratorError = true;
                      _iteratorError = err;
                    } finally {
                      try {
                        if (!_iteratorNormalCompletion && _iterator.return) {
                          _iterator.return();
                        }
                      } finally {
                        if (_didIteratorError) {
                          throw _iteratorError;
                        }
                      }
                    }
                  }
                  trips_by_days.map(function (item) {
                    return delete item.tmp_days_of_week_str;
                  });

                  return {
                    way_id: way_id,
                    trips_by_days: trips_by_days
                  };
                };

                return _context2.abrupt('return', _context2.sent.forEach(_context2.t0));

              case 4:
              case 'end':
                return _context2.stop();
            }
          }
        }, _callee2, this);
      }));

      function getTimes() {
        return _ref2.apply(this, arguments);
      }

      return getTimes;
    }()
  }, {
    key: 'getRoutes',
    value: function () {
      var _ref3 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee3() {
        var lines, routes, lastRouteNumber, lastRouteType, currentRoute;
        return _regenerator2.default.wrap(function _callee3$(_context3) {
          while (1) {
            switch (_context3.prev = _context3.next) {
              case 0:
                _context3.next = 2;
                return getLinesForParsing(_config2.default.routesPath, true);

              case 2:
                lines = _context3.sent;
                routes = [];
                lastRouteNumber = void 0, lastRouteType = void 0, currentRoute = void 0;

                lines.forEach(function (line) {
                  var _config$routesRegex$e = _config2.default.routesRegex.exec(line).slice(1),
                      _config$routesRegex$e2 = (0, _slicedToArray3.default)(_config$routesRegex$e, 5),
                      number = _config$routesRegex$e2[0],
                      type = _config$routesRegex$e2[1],
                      way_name = _config$routesRegex$e2[2],
                      local_id = _config$routesRegex$e2[3],
                      stations_ids_list = _config$routesRegex$e2[4];

                  if (type.length === 0) type = lastRouteType;else {
                    if (type === 'trol') type = 'trolleybus';
                    lastRouteType = type;
                  }

                  if (number.length !== 0) {
                    if (currentRoute) routes.push(currentRoute);
                    currentRoute = {
                      route_type: type,
                      route_number: number,
                      route_name: way_name,
                      ways: []
                    };
                  }

                  currentRoute.ways.push({
                    local_id: parseInt(local_id),
                    way_name: way_name,
                    stations_ids_list: stations_ids_list.split(',').map(function (item) {
                      return parseInt(item);
                    }),
                    trips_by_days: []
                  });
                });
                if (currentRoute) routes.push(currentRoute);

                return _context3.abrupt('return', routes);

              case 8:
              case 'end':
                return _context3.stop();
            }
          }
        }, _callee3, this);
      }));

      function getRoutes() {
        return _ref3.apply(this, arguments);
      }

      return getRoutes;
    }()
  }, {
    key: 'getRoutesPolylines',
    value: function () {
      var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4() {
        return _regenerator2.default.wrap(function _callee4$(_context4) {
          while (1) {
            switch (_context4.prev = _context4.next) {
              case 0:
                _context4.next = 2;
                return getLinesForParsing(_config2.default.shapesPath, false);

              case 2:
                _context4.t0 = function (_ref5) {
                  var _ref6 = (0, _slicedToArray3.default)(_ref5, 2),
                      local_id = _ref6[0],
                      line = _ref6[1];

                  return {
                    local_id: parseInt(local_id),
                    polyline: _polyline2.default.decode(line).map(function (_ref7) {
                      var _ref8 = (0, _slicedToArray3.default)(_ref7, 2),
                          lat = _ref8[0],
                          lng = _ref8[1];

                      return { lat: lat, lng: lng };
                    })
                  };
                };

                _context4.t1 = localIdsComparator;
                return _context4.abrupt('return', _context4.sent.eachSlice(2).map(_context4.t0).sort(_context4.t1));

              case 5:
              case 'end':
                return _context4.stop();
            }
          }
        }, _callee4, this);
      }));

      function getRoutesPolylines() {
        return _ref4.apply(this, arguments);
      }

      return getRoutesPolylines;
    }()
  }]);
  return DataProvider;
}();

exports.default = DataProvider;


function localIdsComparator(a, b) {
  if (a.local_id > b.local_id) return 1;
  if (a.local_id < b.local_id) return -1;
  return 0;
}