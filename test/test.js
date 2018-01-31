import PolylineEncoder from '@mapbox/polyline';

import DataProvider from '../lib/dataProvider';


(async function() {
    let stations = await DataProvider.getStations();
    let routes = await DataProvider.getRoutes();
    let times = await DataProvider.getTimes();

    //console.log(times[0].times);
    //console.log(JSON.stringify(times.slice(0,10)));
})();


// так можно декодировать линии маршрутов отсюда: http://www.minsktrans.by/city/minsk/shapes.txt
let encodedText = "undhIievfDq@Ok@KWn@OhBiD~DHyE_BKsCMeEMkBWkCAs@o@gCgDLkEAn@Nkf@HuEL}DJcCPeDbAwLl@}D\aCn@aCfAuE^}Ax@eD`DyMdAiEnAaFtAwFvBkI|A{GhA}D`AoDnAuExAiEnFcN|@aCjAyCpBmF|@mChGoOdIeTpBsDhBqE`EyGfJ{NtGkIhQyV`@sAbByBjDyH`Ji`@jDuOpA_FhCiE|TqUpQoQFa@|AqArEoClCoEfKeOr@|AdX~n@|@SlI_MvJlEn@xApBR]nG";
let line = PolylineEncoder.decode(encodedText);
//console.log(line);
