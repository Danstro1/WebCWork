const getParkedCars = async () => {
    try {
        const res = await fetch('/api/car/getParked');
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }
        return data;
    } catch (error) {
        console.log(error);
    }
}

const calculateParkingHours = (startedAt) => {
    const start = new Date(startedAt);
    const now = new Date();
    const diffInMs = now - start;
    return Math.floor(diffInMs / (1000 * 60 * 60));
}

const unparkCar = async (carNumber, money) => {
    try {
        const res = await fetch("/api/parking/unparkCar", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ carNumber, money }),
        });

        if (!res.ok) {
            throw new Error("Failed to unpark car");
        }

        await displayParkedCars();
    } catch (error) {
        console.log(error);
        alert("Error unparking the car: " + error.message);
    }
}

const displayParkedCars = async () => {
    try {
        const parkedCars = await getParkedCars();
        
        const carCardsContainer = document.getElementById('carCardsContainer');
        carCardsContainer.innerHTML = '';

        parkedCars.forEach(({ car, parking, startedAt }) => {
            const card = document.createElement('div');
            card.classList.add('card-car', 'parking-card');

            const parkingHours = calculateParkingHours(startedAt);
            const pricePerHour = parking.cost || 0;
            const totalPrice = pricePerHour * parkingHours;

            card.innerHTML = `
                <h3 class="car-info">Цена парковки</h3>
                <div><span class="car-info">Номер:</span> ${car.number}</div>
                <div><span class="car-info">Адрес парковки:</span> ${parking.address}</div>
                <div><span class="car-info">Цена в час:</span> ${pricePerHour}руб</div>
                <div><span class="car-info">Кол-во часов:</span> ${parkingHours}</div>
                <div><span class="car-info">Общая стоимость:</span> ${totalPrice}руб</div>
                <button class="delete-btn">Забрать</button>
            `;

            card.querySelector('.delete-btn').addEventListener('click', async () => {
                await unparkCar(car.number, totalPrice);
            });

            carCardsContainer.appendChild(card);
        });
    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', displayParkedCars);