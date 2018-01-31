//import PolylineEncoder from '@mapbox/polyline';
import fetch from 'node-fetch';

import decodeTimes from './decodeTimes';
import config from './config';


class DataProvider {
    static async getStations() {
        let result = [];
        const lines = await getLinesForParsing(config.stationsPath, true);

        for (const line of lines) {
            const [local_id, name, lng, lat] = config.stationsRegex.exec(line).slice(1);
            result.push({
                local_id: parseInt(local_id), 
                name, 
                lat: parseInt(lat) / 100000, 
                lng: parseInt(lng) / 100000
            });
        }
        result.sort(localIdsComparator);
        return result;
    }

    static async getTimes() {
        let result = [];
        const lines = await getLinesForParsing(config.timesPath, false);

        for (const encoded_line of lines) {
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

            result.push({
                way_id,
                trips_by_days
            });
        }
        return result;
    }

    static async getRoutes() {
        const lines = await getLinesForParsing(config.routesPath, true);
        let routes = [];
        let lastRouteNumber, lastRouteType, currentRoute;
        for (const line of lines) {
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
                stations_ids_list,
                //stations_names: null,
                trips_by_days: []
            });
        }
        if (currentRoute) routes.push(currentRoute);

        //result.sort(localIdsComparator);
        return routes;
    }
}
export default DataProvider;



async function getTextFromUrl(strReq) {
    let ok = false;
    var response = null;
    while(!ok) {
        try {
            response = await fetch(strReq);
            ok = true;
        }
        catch(e) {
            console.log(e.message);
            await new Promise(resolve => setTimeout(resolve, 500));
        }
    }
    return await response.text();
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