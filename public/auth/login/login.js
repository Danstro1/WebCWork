const login = async (email, password) => {
    try {
        const res = await fetch("/api/auth/login", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ email, password }),
        });

        const data = await res.json();
        console.log(data);

        if (data.error) {
            alert("Введнная почта или пароль неверны");
            throw new Error(data.error);
        }

        if (data.isAdmin){
            window.location.replace("http://localhost:5000/admin/admin-page.html");
        } else if (data.isWorker) {
            window.location.replace("http://localhost:5000/workerPages/parkingControl/parking-control.html");
        } else {
            window.location.replace("http://localhost:5000/mainPage/place-car/place-car.html");
        }
    } catch (error) {
        console.log(error);
    }
}

document.querySelector('.loginForm').addEventListener('submit', e => {
    e.preventDefault();
    const email = document.querySelector('.logEmail').value.trim();
    const password = document.querySelector('.logPassword').value.trim();

    if (!email || !password) {
        alert("Пожалуйста, заполните все поля");
        return;
    }

    login(email, password);
});