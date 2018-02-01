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
    var _ref4 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee4(strReq) {
        var ok, response;
        return _regenerator2.default.wrap(function _callee4$(_context4) {
            while (1) {
                switch (_context4.prev = _context4.next) {
                    case 0:
                        ok = false;
                        response = null;

                    case 2:
                        if (ok) {
                            _context4.next = 17;
                            break;
                        }

                        _context4.prev = 3;
                        _context4.next = 6;
                        return (0, _nodeFetch2.default)(strReq);

                    case 6:
                        response = _context4.sent;

                        ok = true;
                        _context4.next = 15;
                        break;

                    case 10:
                        _context4.prev = 10;
                        _context4.t0 = _context4['catch'](3);

                        console.log(_context4.t0.message);
                        _context4.next = 15;
                        return new Promise(function (resolve) {
                            return setTimeout(resolve, 500);
                        });

                    case 15:
                        _context4.next = 2;
                        break;

                    case 17:
                        _context4.next = 19;
                        return response.text();

                    case 19:
                        return _context4.abrupt('return', _context4.sent);

                    case 20:
                    case 'end':
                        return _context4.stop();
                }
            }
        }, _callee4, this, [[3, 10]]);
    }));

    return function getTextFromUrl(_x) {
        return _ref4.apply(this, arguments);
    };
}();

var getLinesForParsing = function () {
    var _ref5 = (0, _asyncToGenerator3.default)( /*#__PURE__*/_regenerator2.default.mark(function _callee5(url, removeFirst) {
        var linesText, result;
        return _regenerator2.default.wrap(function _callee5$(_context5) {
            while (1) {
                switch (_context5.prev = _context5.next) {
                    case 0:
                        _context5.next = 2;
                        return getTextFromUrl(url);

                    case 2:
                        linesText = _context5.sent;
                        result = linesText.trim().split('\n');

                        if (removeFirst) result = result.slice(1);
                        return _context5.abrupt('return', result);

                    case 6:
                    case 'end':
                        return _context5.stop();
                }
            }
        }, _callee5, this);
    }));

    return function getLinesForParsing(_x2, _x3) {
        return _ref5.apply(this, arguments);
    };
}();

var _nodeFetch = require('node-fetch');

var _nodeFetch2 = _interopRequireDefault(_nodeFetch);

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
                var result, lines, _iteratorNormalCompletion, _didIteratorError, _iteratorError, _iterator, _step, line, _config$stationsRegex, _config$stationsRegex2, local_id, name, lng, lat;

                return _regenerator2.default.wrap(function _callee$(_context) {
                    while (1) {
                        switch (_context.prev = _context.next) {
                            case 0:
                                result = [];
                                _context.next = 3;
                                return getLinesForParsing(_config2.default.stationsPath, true);

                            case 3:
                                lines = _context.sent;
                                _iteratorNormalCompletion = true;
                                _didIteratorError = false;
                                _iteratorError = undefined;
                                _context.prev = 7;


                                for (_iterator = lines[Symbol.iterator](); !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
                                    line = _step.value;
                                    _config$stationsRegex = _config2.default.stationsRegex.exec(line).slice(1), _config$stationsRegex2 = (0, _slicedToArray3.default)(_config$stationsRegex, 4), local_id = _config$stationsRegex2[0], name = _config$stationsRegex2[1], lng = _config$stationsRegex2[2], lat = _config$stationsRegex2[3];

                                    result.push({
                                        local_id: parseInt(local_id),
                                        name: name,
                                        lat: parseInt(lat) / 100000,
                                        lng: parseInt(lng) / 100000
                                    });
                                }
                                _context.next = 15;
                                break;

                            case 11:
                                _context.prev = 11;
                                _context.t0 = _context['catch'](7);
                                _didIteratorError = true;
                                _iteratorError = _context.t0;

                            case 15:
                                _context.prev = 15;
                                _context.prev = 16;

                                if (!_iteratorNormalCompletion && _iterator.return) {
                                    _iterator.return();
                                }

                            case 18:
                                _context.prev = 18;

                                if (!_didIteratorError) {
                                    _context.next = 21;
                                    break;
                                }

                                throw _iteratorError;

                            case 21:
                                return _context.finish(18);

                            case 22:
                                return _context.finish(15);

                            case 23:
                                result.sort(localIdsComparator);
                                return _context.abrupt('return', result);

                            case 25:
                            case 'end':
                                return _context.stop();
                        }
                    }
                }, _callee, this, [[7, 11, 15, 23], [16,, 18, 22]]);
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
                var result, lines, _iteratorNormalCompletion2, _didIteratorError2, _iteratorError2, _iterator2, _step2, encoded_line, index, way_id, decoded_data, days_of_week_groups, trips_by_days, jump_step, j, m, myMap, i, str_days_of_week, tmp, _iteratorNormalCompletion3, _didIteratorError3, _iteratorError3, _loop, _iterator3, _step3;

                return _regenerator2.default.wrap(function _callee2$(_context2) {
                    while (1) {
                        switch (_context2.prev = _context2.next) {
                            case 0:
                                result = [];
                                _context2.next = 3;
                                return getLinesForParsing(_config2.default.timesPath, false);

                            case 3:
                                lines = _context2.sent;
                                _iteratorNormalCompletion2 = true;
                                _didIteratorError2 = false;
                                _iteratorError2 = undefined;
                                _context2.prev = 7;
                                _iterator2 = lines[Symbol.iterator]();

                            case 9:
                                if (_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done) {
                                    _context2.next = 49;
                                    break;
                                }

                                encoded_line = _step2.value;
                                index = encoded_line.indexOf(",");
                                way_id = parseInt(encoded_line.substr(0, index));
                                decoded_data = (0, _decodeTimes2.default)(encoded_line.substr(index + 1));
                                days_of_week_groups = Array.from(new Set(decoded_data.workdays));
                                trips_by_days = Array.from(new Set(decoded_data.workdays)).map(function (element) {
                                    return {
                                        days_of_week: element.replace('7', '0').split('').map(function (item) {
                                            return parseInt(item);
                                        }).sort(),
                                        tmp_days_of_week_str: element,
                                        arrives: []
                                    };
                                });
                                jump_step = decoded_data.workdays.length;
                                j = 0, m = decoded_data.times.length / jump_step;

                            case 18:
                                if (!(j < m)) {
                                    _context2.next = 44;
                                    break;
                                }

                                myMap = new Map();

                                for (i = 0, str_days_of_week = decoded_data.workdays[0]; i < jump_step; str_days_of_week = decoded_data.workdays[++i]) {
                                    tmp = myMap.get(str_days_of_week);

                                    if (!tmp) {
                                        tmp = {
                                            str_days_of_week: str_days_of_week,
                                            arrives: []
                                        };
                                        myMap.set(str_days_of_week, tmp);
                                    }
                                    tmp.arrives.push(decoded_data.times[i + j * jump_step]);
                                }
                                _iteratorNormalCompletion3 = true;
                                _didIteratorError3 = false;
                                _iteratorError3 = undefined;
                                _context2.prev = 24;

                                _loop = function _loop() {
                                    var _step3$value = (0, _slicedToArray3.default)(_step3.value, 2),
                                        key = _step3$value[0],
                                        value = _step3$value[1];

                                    trips_by_days.find(function (item) {
                                        return item.tmp_days_of_week_str === key;
                                    }).arrives.push(value.arrives);
                                };

                                for (_iterator3 = myMap[Symbol.iterator](); !(_iteratorNormalCompletion3 = (_step3 = _iterator3.next()).done); _iteratorNormalCompletion3 = true) {
                                    _loop();
                                }
                                _context2.next = 33;
                                break;

                            case 29:
                                _context2.prev = 29;
                                _context2.t0 = _context2['catch'](24);
                                _didIteratorError3 = true;
                                _iteratorError3 = _context2.t0;

                            case 33:
                                _context2.prev = 33;
                                _context2.prev = 34;

                                if (!_iteratorNormalCompletion3 && _iterator3.return) {
                                    _iterator3.return();
                                }

                            case 36:
                                _context2.prev = 36;

                                if (!_didIteratorError3) {
                                    _context2.next = 39;
                                    break;
                                }

                                throw _iteratorError3;

                            case 39:
                                return _context2.finish(36);

                            case 40:
                                return _context2.finish(33);

                            case 41:
                                j++;
                                _context2.next = 18;
                                break;

                            case 44:
                                trips_by_days.map(function (item) {
                                    return delete item.tmp_days_of_week_str;
                                });

                                result.push({
                                    way_id: way_id,
                                    trips_by_days: trips_by_days
                                });

                            case 46:
                                _iteratorNormalCompletion2 = true;
                                _context2.next = 9;
                                break;

                            case 49:
                                _context2.next = 55;
                                break;

                            case 51:
                                _context2.prev = 51;
                                _context2.t1 = _context2['catch'](7);
                                _didIteratorError2 = true;
                                _iteratorError2 = _context2.t1;

                            case 55:
                                _context2.prev = 55;
                                _context2.prev = 56;

                                if (!_iteratorNormalCompletion2 && _iterator2.return) {
                                    _iterator2.return();
                                }

                            case 58:
                                _context2.prev = 58;

                                if (!_didIteratorError2) {
                                    _context2.next = 61;
                                    break;
                                }

                                throw _iteratorError2;

                            case 61:
                                return _context2.finish(58);

                            case 62:
                                return _context2.finish(55);

                            case 63:
                                return _context2.abrupt('return', result);

                            case 64:
                            case 'end':
                                return _context2.stop();
                        }
                    }
                }, _callee2, this, [[7, 51, 55, 63], [24, 29, 33, 41], [34,, 36, 40], [56,, 58, 62]]);
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
                var lines, routes, lastRouteNumber, lastRouteType, currentRoute, _iteratorNormalCompletion4, _didIteratorError4, _iteratorError4, _iterator4, _step4, line, _config$routesRegex$e, _config$routesRegex$e2, number, type, way_name, local_id, stations_ids_list;

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
                                _iteratorNormalCompletion4 = true;
                                _didIteratorError4 = false;
                                _iteratorError4 = undefined;
                                _context3.prev = 8;

                                for (_iterator4 = lines[Symbol.iterator](); !(_iteratorNormalCompletion4 = (_step4 = _iterator4.next()).done); _iteratorNormalCompletion4 = true) {
                                    line = _step4.value;
                                    _config$routesRegex$e = _config2.default.routesRegex.exec(line).slice(1), _config$routesRegex$e2 = (0, _slicedToArray3.default)(_config$routesRegex$e, 5), number = _config$routesRegex$e2[0], type = _config$routesRegex$e2[1], way_name = _config$routesRegex$e2[2], local_id = _config$routesRegex$e2[3], stations_ids_list = _config$routesRegex$e2[4];


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
                                        }).sort(),
                                        //stations_names: null,
                                        trips_by_days: []
                                    });
                                }
                                _context3.next = 16;
                                break;

                            case 12:
                                _context3.prev = 12;
                                _context3.t0 = _context3['catch'](8);
                                _didIteratorError4 = true;
                                _iteratorError4 = _context3.t0;

                            case 16:
                                _context3.prev = 16;
                                _context3.prev = 17;

                                if (!_iteratorNormalCompletion4 && _iterator4.return) {
                                    _iterator4.return();
                                }

                            case 19:
                                _context3.prev = 19;

                                if (!_didIteratorError4) {
                                    _context3.next = 22;
                                    break;
                                }

                                throw _iteratorError4;

                            case 22:
                                return _context3.finish(19);

                            case 23:
                                return _context3.finish(16);

                            case 24:
                                if (currentRoute) routes.push(currentRoute);

                                //result.sort(localIdsComparator);
                                return _context3.abrupt('return', routes);

                            case 26:
                            case 'end':
                                return _context3.stop();
                        }
                    }
                }, _callee3, this, [[8, 12, 16, 24], [17,, 19, 23]]);
            }));

            function getRoutes() {
                return _ref3.apply(this, arguments);
            }

            return getRoutes;
        }()
    }]);
    return DataProvider;
}(); //import PolylineEncoder from '@mapbox/polyline';


exports.default = DataProvider;


function localIdsComparator(a, b) {
    if (a.local_id > b.local_id) return 1;
    if (a.local_id < b.local_id) return -1;
    return 0;
}