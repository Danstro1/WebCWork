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
    myMap.geoObjects.add(createPlacemark(45,100,55.79683,49.125189, 'Площадь Свободы'));
    myMap.geoObjects.add(createPlacemark(4,100,55.78,49.16, 'Другая стоянка 1'));
    myMap.geoObjects.add(createPlacemark(95,100,55.83, 49.08, 'Другая стоянка 2'));
});

function createPlacemark(weight1, weight2, cordX, cordY, parkingName){
    var placemark = new ymaps.Placemark(
        [cordX, cordY],
        {
          hintContent: parkingName,
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

    placemark.events.add('click', function () {
      document.querySelector('.parking-selection[name="parking"]').value = parkingName;
    });

    return placemark;
}

const btn = document.createElement('button');
document.querySelector('.confirm-btn').addEventListener('click', e => {
  e.preventDefault();
  document.querySelector('.confirm-btn').classList.add('d-none');
  document.querySelectorAll('.select').forEach(elem => elem.classList.add('d-none'));
  btn.innerText = 'Получить машину';
  btn.classList.add('delete-btn');
  document.querySelector('.main').appendChild(btn);
});

btn.addEventListener('click', () => {
  btn.remove();
  document.querySelector('.confirm-btn').classList.remove('d-none');
  document.querySelectorAll('.select').forEach(elem => elem.classList.remove('d-none'));
});