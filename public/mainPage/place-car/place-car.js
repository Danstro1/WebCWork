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
  
  const getCarNumbers = async () => {
    try {
      const res = await fetch("/api/car/getUnparked", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });
  
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
  
      const carSelect = document.getElementById('carId');
      carSelect.innerHTML = '<option value="">Выберите машину</option>';
  
      data.forEach(car => {
        const option = document.createElement('option');
        option.value = car.number;
        option.textContent = car.number;
        carSelect.appendChild(option);
      });
  
    } catch (error) {
      console.log(error);
    }
  }
  
  const placeCar = async (parkingAddress, carNumber) => {
    try {
      const res = await fetch("/api/parking/parkCar", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ carNumber, parkingAddress }),
      });
  
      const data = await res.json();
      if (data.error) {
        throw new Error(data.error);
      }
  
      await getCarNumbers();
  
      const event = new Event('updateMap');
      window.dispatchEvent(event);
    } catch (error) {
      console.log(error);
    }
  }
  
  $(document).ready(async function() {
    await getParkingOptions();
    await getCarNumbers();
  
    $('#formPlaceCar').on('submit', async function(e) {
      e.preventDefault();
      const parkingAddress = $('#parkingId').val();
      const carNumber = $('#carId').val();
      if (parkingAddress && carNumber) {
        await placeCar(parkingAddress, carNumber);
      } else {
        alert("Выберите парковку и машину.");
      }
    });
  });