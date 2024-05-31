ymaps.ready(async function () {
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

  await getParkings(myMap);

  window.addEventListener('updateMap', async () => {
    await getParkings(myMap);
  });
});

function createPlacemark(weight1, weight2, cordX, cordY, parkingName, cost) {
  var placemark = new ymaps.Placemark(
    [cordX, cordY],
    {
      hintContent: `${parkingName}<br>Стоимость: ${cost} руб/час`,
      data: generatePieChartData(weight1, weight2),
      iconContent: weight1,
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

function generatePieChartData(freePlaces, totalPlaces) {
  if (totalPlaces === freePlaces) {
    return [{ weight: freePlaces, color: "#00ff00" }];
  }
  if (freePlaces === 0) {
    return [{ weight: totalPlaces, color: "#ff0000" }];
  }
  return [
    { weight: freePlaces, color: "#00ff00" },
    { weight: totalPlaces - freePlaces, color: "#ff0000" }
  ];
}

const getParkings = async (myMap) => {
  try {
    const res = await fetch('/api/parking/get');
    const data = await res.json();

    if (data.error) {
      throw new Error(data.error);
    }

    myMap.geoObjects.removeAll();

    data.forEach(parking => {
      const placemark = createPlacemark(parking.freePlaces, parking.totalPlaces, parking.xCoordinate, parking.yCoordinate, parking.address, parking.cost);
      myMap.geoObjects.add(placemark);
    });
  } catch (error) {
    console.log(error);
  }
}