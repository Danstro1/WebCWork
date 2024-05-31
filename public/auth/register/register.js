const signup = async (name, surname, password, email, phone) => {
    try {
        const res = await fetch("/api/auth/signup", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, surname, password, email, phone }),
        });

        const data = await res.json();
        if(!data.error)
            window.location.replace("http://localhost:5000/mainPage/place-car/place-car.html");
        if (data.error) {
            console.log(data.error);
            alert("Введнные номер телефона или почта уже есть в системе")
            throw new Error(data.error);
        }
    } catch (error) {
        console.log(error);
    }
}


document.querySelector('.reg').addEventListener('submit', e => {
    e.preventDefault();
    const name = document.querySelector('.regName').value.trim();
    const surname = document.querySelector('.regSurname').value.trim();
    const phone = document.querySelector('.regPhone').value.trim();
    const email = document.querySelector('.regEmail').value.trim();
    const password = document.querySelector('.regPassword').value.trim();

    if (!name || !surname || !phone || !email || !password) {
        alert("Пожалуйста, заполните все поля");
        return;
    }

    if(phone.length !== 11){
        alert("В номере телефона должно быть 11 цифр");
        return;
    } 

    signup(name, surname, password, email, phone);
})