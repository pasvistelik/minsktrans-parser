# minsktrans-parser
Минсктранс - Парсер остановок, маршрутов и расписания.
## Usage example:
```js
import DataProvider from 'minsktrans-parser';

let stations = await DataProvider.getStations();
let routes = await DataProvider.getRoutes();
let times = await DataProvider.getTimes();
let routesPolylines = await DataProvider.getRoutesPolylines();
```
