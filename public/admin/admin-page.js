const addWorkerToTable = (worker) => {
    const workersTable = document.getElementById('workersTable').getElementsByTagName('tbody')[0];
    const row = workersTable.insertRow();

    const cellName = row.insertCell(0);
    const cellSurname = row.insertCell(1);
    const cellPhone = row.insertCell(2);
    const cellEmail = row.insertCell(3);
    const cellActions = row.insertCell(4);

    cellName.textContent = worker.name;
    cellSurname.textContent = worker.surname;
    cellPhone.textContent = worker.phone;
    cellEmail.textContent = worker.email;

    const deleteButton = document.createElement('button');
    deleteButton.textContent = 'Удалить';
    deleteButton.classList.add('worker-delete-btn');
    deleteButton.addEventListener('click', async () => {
        await deleteWorker(worker._id);
        row.remove();
    });

    cellActions.appendChild(deleteButton);
}

const signup = async (name, surname, password, email, phone) => {
    try {
        const res = await fetch("/api/auth/signupWorker", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, surname, password, email, phone }),
        });

        const data = await res.json();
        if (!data.error) {
            document.querySelector('.reg').reset();
            addWorkerToTable(data);
        }
        if (data.error) {
            alert("Пользователь с таким номером или почтой уже существует")
            throw new Error(data.error);
        }
    } catch (error) {
        console.log(error);
    }
}

document.querySelector('.reg').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.querySelector('.regName').value;
    const surname = document.querySelector('.regSurname').value;
    const phone = document.querySelector('.regPhone').value;
    const email = document.querySelector('.regEmail').value;
    const password = document.querySelector('.regPassword').value;

    if (!name || !surname || !phone || !email || !password) {
        alert("Пожалуйста, заполните все поля");
        return;
    }

    if (phone.length !== 11) {
        alert("В номере телефона должно быть 11 цифр");
        return;
    }

    signup(name, surname, password, email, phone);
})

const getWorkers = async () => {
    try {
        const res = await fetch("/api/user/getWorkers");
        const data = await res.json();

        if (data.error) {
            throw new Error(data.error);
        }

        const workersTable = document.getElementById('workersTable').getElementsByTagName('tbody')[0];

        data.forEach(worker => {
            addWorkerToTable(worker);
        });

    } catch (error) {
        console.log(error);
    }
}

const deleteWorker = async (workerId) => {
    try {
        const res = await fetch("/api/user/deleteWorker", {
            method: "DELETE",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ _id: workerId }),
        });

        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }

    } catch (error) {
        console.log(error);
    }
}

document.addEventListener('DOMContentLoaded', (event) => {
    getWorkers();
});
