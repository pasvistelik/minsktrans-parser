import PolylineEncoder from '@mapbox/polyline';
import fetch from 'node-fetch';
import 'array-each-slice';
import decodeTimes from './decodeTimes';
import config from './config';


export default class DataProvider {
  static async getStations() {
    let lastUsedStationName;
    return (await getLinesForParsing(config.stationsPath, true))
      .map(line => {
        const [local_id, name, lng, lat] = config.stationsRegex.exec(line).slice(1);
        if (name.length !== 0) lastUsedStationName = name;
        return {
          local_id: parseInt(local_id),
          name: lastUsedStationName,
          lat: parseInt(lat) / 100000,
          lng: parseInt(lng) / 100000
        };
      })
      .sort(localIdsComparator);
  }

  static async getTimes() {
    return (await getLinesForParsing(config.timesPath, false))
      .forEach(encoded_line => {
        const index = encoded_line.indexOf(",");
        const way_id = parseInt(encoded_line.substr(0, index));
        const decoded_data= decodeTimes(encoded_line.substr(index + 1));

        const days_of_week_groups = Array.from(new Set(decoded_data.workdays));

        let trips_by_days = Array.from(new Set(decoded_data.workdays)).map(function(element) {
          return {
            days_of_week: element.replace('7','0').split('').map(item => parseInt(item)).sort(),
            tmp_days_of_week_str: element,
            arrives: []
          };
        });

        const jump_step = decoded_data.workdays.length;
        for (let j = 0, m = decoded_data.times.length / jump_step; j < m; j++) {
          let myMap = new Map();
          for (let i = 0, str_days_of_week = decoded_data.workdays[0]; i < jump_step; str_days_of_week = decoded_data.workdays[++i]) {
            let tmp = myMap.get(str_days_of_week);
            if (!tmp) {
              tmp = {
                str_days_of_week,
                arrives: []
              };
              myMap.set(str_days_of_week, tmp);
            }
            tmp.arrives.push(decoded_data.times[i + j * jump_step]);
          }
          for (let [key, value] of myMap) {
            trips_by_days.find(item => item.tmp_days_of_week_str === key).arrives.push(value.arrives);
          }
        }
        trips_by_days.map(item => delete item.tmp_days_of_week_str);

        return {
          way_id,
          trips_by_days
        };
      });
  }

  static async getRoutes() {
    const lines = await getLinesForParsing(config.routesPath, true);
    let routes = [];
    let lastRouteNumber, lastRouteType, currentRoute;
    lines.forEach(line => {
      let [number, type, way_name, local_id, stations_ids_list] = config.routesRegex.exec(line).slice(1);

      if (type.length === 0) type = lastRouteType;
      else {
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
        way_name,
        stations_ids_list: stations_ids_list.split(',').map(item => parseInt(item)),
        trips_by_days: []
      });
    });
    if (currentRoute) routes.push(currentRoute);

    return routes;
  }


  static async getRoutesPolylines() {
    return (await getLinesForParsing(config.shapesPath, false))
      .eachSlice(2)
      .map(([local_id, line]) => {
        return {
          local_id: parseInt(local_id),
          polyline: PolylineEncoder.decode(line).map(([lat, lng]) => {return {lat, lng}})
        }
      })
      .sort(localIdsComparator);
  }
}


async function getTextFromUrl(strReq) {
  while(true) {
    try {
      return await (await fetch(strReq)).text();
    }
    catch(e) {
      console.log(e.message);
      await new Promise(resolve => setTimeout(resolve, 500));
    }
  }
}

function localIdsComparator(a, b) {
  if (a.local_id > b.local_id) return 1;
  if (a.local_id < b.local_id) return -1;
  return 0;
}

async function getLinesForParsing(url, removeFirst) {
  let linesText = await getTextFromUrl(url);
  let result = linesText.trim().split('\n')
  if (removeFirst) result = result.slice(1);
  return result;
}
