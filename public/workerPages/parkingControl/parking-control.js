const getParkingOptions = async () => {
    try {
      const res = await fetch('/api/parking/get');
      const data = await res.json();
  
      if (data.error) {
        throw new Error(data.error);
      }
  
      const parkingSelect = document.getElementById('parkingId');
      parkingSelect.innerHTML = '<option value="">Выберите стоянку</option>';
  
      data.forEach(parking => {
        const option = document.createElement('option');
        option.value = parking.address;
        option.textContent = parking.address;
        parkingSelect.appendChild(option);
      });
  
    } catch (error) {
      console.log(error);
    }
  };

const addPlace = async (parkingAddress) => {
    try {
        const res = await fetch("/api/parking/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ parkingAddress }),
        });

        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }

        const event = new Event('updateMap');
        window.dispatchEvent(event);
    } catch (error) {
        console.log(error);
    }
}

const removePlace = async (parkingAddress) => {
    try {
        const res = await fetch("/api/parking/remove", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ parkingAddress }),
        });

        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }

        const event = new Event('updateMap');
        window.dispatchEvent(event);
    } catch (error) {
        console.log(error);
    }
}

const changeCost = async (parkingAddress, newCost) => {
    try {
        const res = await fetch("/api/parking/changeCost", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ parkingAddress, cost: newCost }),
        });

        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }

        const event = new Event('updateMap');
        window.dispatchEvent(event);
        alert("Стоимость успешно изменена");
    } catch (error) {
        console.log(error);
    }
}

$(document).ready(async function() {
    await getParkingOptions();

    $('#addPlaceBtn').on('click', async function() {
        const parkingAddress = $('#parkingId').val();
        if (parkingAddress) {
            await addPlace(parkingAddress);
        } else {
            alert("Выберите парковку.");
        }
    });

    $('#removePlaceBtn').on('click', async function() {
        const parkingAddress = $('#parkingId').val();
        if (parkingAddress) {
            await removePlace(parkingAddress);
        } else {
            alert("Выберите парковку.");
        }
    });

    $('#formChangeCost').on('submit', async function(e) {
        e.preventDefault();
        const parkingAddress = $('#parkingId').val();
        const newCost = $('#newCost').val();
        if (parkingAddress && newCost) {
            await changeCost(parkingAddress, newCost);
        } else {
            alert("Выберите парковку и введите новую стоимость.");
        }
    });
});