'use strict';

Object.defineProperty(exports, "__esModule", {
    value: true
});
var config = {
    minsktransRepository: 'http://www.minsktrans.by/city/minsk/',

    /*
        RouteNum; // number
        Authority;
        City;
        Transport; // type : bus, trol, tram, metro
        Operator;
        ValidityPeriods;
        SpecialDates;
        RouteTag;
        RouteType;
        Commercial;
        RouteName; // name || way_name
        Weekdays;
        RouteID; // local_id
        Entry;
        RouteStops; // stations_ids_list
        Pikas2012.11.19;
        Datestart
    */
    routesRegex: /(.*?);.*?;.*?;(.*?);.*?;.*?;.*?;.*?;.*?;.*?;(.*?);.*?;(.*?);.*?;(.*?);.*?;/,
    routesPath: 'http://www.minsktrans.by/city/minsk/routes.txt',

    /*
        ID;
        City;
        Area;
        Street;
        Name;
        Info;
        Lng;
        Lat;
        Stops;
        StopNum;
        Pikas2012.11.19
    */
    stationsRegex: /(.*?);.*?;.*?;.*?;(.*?);.*?;(.*?);(.*?);.*?;/,
    stationsPath: 'http://www.minsktrans.by/city/minsk/stops.txt',

    shapesPath: 'http://www.minsktrans.by/city/minsk/shapes.txt',
    timesPath: 'http://www.minsktrans.by/city/minsk/times.txt'
};
exports.default = config;