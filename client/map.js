ymaps.ready(function () {
    var myMap = new ymaps.Map(
      "map",
      {
        center: [55.79683, 49.125189],
        zoom: 12,
        controls: [],
      },
      {
        suppressMapOpenBlock: true,
      }
    );
    myMap.geoObjects.add(createPlacemark(45,100,55.79683,49.125189));
    myMap.geoObjects.add(createPlacemark(4,100,55.78,49.16));
    myMap.geoObjects.add(createPlacemark(95,100,55.83, 49.08));
});

function createPlacemark(weight1, weight2, cordX, cordY){
    return new ymaps.Placemark(
        [cordX, cordY],
        {
          hintContent: "Адрес метки",
          data: [
            { weight: weight1, color: "#ff0000" },
            { weight: weight2-weight1, color: "#00ff00" },
          ],
          iconContent: weight2-weight1,
        },
        {
          iconLayout: "default#pieChart",
          iconPieChartRadius: 16,
          iconPieChartCoreRadius: 10,
        }
    );
}