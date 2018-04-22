# minsktrans-parser
Минсктранс - Парсер остановок, маршрутов и расписания.
## Usage example:

```sh
npm i minsktrans-parser
```

```js
import DataProvider from 'minsktrans-parser';

const stations = await DataProvider.getStations();
const routes = await DataProvider.getRoutes();
const times = await DataProvider.getTimes();
const routesPolylines = await DataProvider.getRoutesPolylines();
```

You also can run ``` npm run save_json ``` to save this objects as *.json files.

## Results examples
### Stations object
```js
[
  {
    local_id: 14340,
    name: "Филимонова",
    lat: 53.92889,
    lng: 27.63977
  },
  ...
]
```
### Routes object
```js
[
  {
    route_type: "bus",
    route_number: "1",
    route_name: "ДС Веснянка - Вокзал",
    ways: [
      {
        local_id: 214500,
        way_name: "ДС Веснянка - Вокзал",
        stations_ids_list: [15846, 54756, 54757, ...],
        trips_by_days: []
      },
      ...
    ]
  },
  ...
]
```
### Times object
```js
[
  {
    way_id: 214500,
    trips_by_days: [
      {
        days_of_week: [0,6],
        arrives: [
          [340,355,370,385,400,412,...], // times in minutes for first station of way
          ...
        ]
      },
      ...
    ]
  },
  ...
]
```
### Ways polylines object
```js
[
  {
    local_id: 52524,
    polyline:
    [
      {lat: 53.90686,lng: 27.43751},
      {lat: 53.90632,lng: 27.44737},
      ...
    ]
  },
  ...
]
```
