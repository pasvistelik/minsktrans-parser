import DataProvider from '../lib/dataProvider';
import JsonFile from 'jsonfile';

(async function() {
    const stations = await DataProvider.getStations();
    const routes = await DataProvider.getRoutes();
    const times = await DataProvider.getTimes();
    const routesPolylines = await DataProvider.getRoutesPolylines();

    ['stations', 'routes', 'times', 'routesPolylines'].forEach(objName => JsonFile.writeFileSync('./json/' + objName + '.json', eval(objName)))
})();
