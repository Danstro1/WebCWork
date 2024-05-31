const addCar = async (mark, model, color, number) => {
    try {
        const res = await fetch("/api/car/add", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ mark, model, color, number }),
        });

        const data = await res.json();
        if (!res.ok) {
            throw new Error(data.error);
        }

        addCarToDOM(mark, model, color, number)
        document.querySelector('#mark').value = '';
        document.querySelector('#model').value = '';
        document.querySelector('#color').value = '';
        document.querySelector('#number').value = '';

        document.querySelector('#error-message').style.display = 'none';
    } catch (error) {
        console.log(error);
        const errorMessage = document.querySelector('#error-message');
        errorMessage.textContent = "Такой номер машины уже есть в системе";
        errorMessage.style.display = 'block';
    }
}

function addCarToDOM(mark, model, color, number) {
    const carCard = $(`
        <div class="card-car">
            <div><span class="car-info">Марка:</span> ${mark}</div>
            <div><span class="car-info">Модель:</span> ${model}</div>
            <div><span class="car-info">Цвет:</span> ${color}</div>
            <div><span class="car-info">Номер:</span> ${number}</div>
            <button class="delete-btn">Удалить</button>
        </div>
    `);

    carCard.find('.delete-btn').on('click', async function () {
        try {
            const res = await fetch('/api/car/delete', {
                method: 'DELETE',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ number: number })
            });

            const result = await res.json();
            if (res.ok) {
                carCard.remove();
            } else {
                console.error('Ошибка при удалении автомобиля:', result.error);
            }
        } catch (error) {
            console.error('Ошибка при выполнении запроса на удаление:', error);
        }
    });

    $('.car-cards').append(carCard);
}

document.querySelector('.addCarForm').addEventListener("submit", e => {
    e.preventDefault();
    const mark = document.querySelector('#mark').value;
    const model = document.querySelector('#model').value;
    const color = document.querySelector('#color').value;
    const number = document.querySelector('#number').value;
    addCar(mark, model, color, number);
});

$(document).ready(async function () {
    const res = await fetch('/api/car/getUnparked');
    const data = await res.json();

    data.forEach(car => {
        addCarToDOM(car.mark, car.model, car.color, car.number);
    });
});