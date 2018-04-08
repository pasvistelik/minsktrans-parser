import DataProvider from '../lib/dataProvider';

(async function() {
    let stations = await DataProvider.getStations();
    let routes = await DataProvider.getRoutes();
    let times = await DataProvider.getTimes();

    let routesPolylines = await DataProvider.getRoutesPolylines();
})();
