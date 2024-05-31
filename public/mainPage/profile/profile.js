const getUser = async () => {
    try {
        const res = await fetch("/api/user/get");

        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }

        $('#name').val(data.name);
        $('#surname').val(data.surname);
        $('#phone').val(data.phone);
        $('#email').val(data.email);

    } catch (error) {
        console.log(error);
    }
}

const changeData = async (name, surname, phone, email) => {
    try {
        const res = await fetch("/api/user/change", {
            method: "PUT",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ name, surname, phone, email }),
        });

        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }

        $('#message').text("Данные успешно изменены").css("color", "green").show();
    } catch (error) {
        console.log(error);
        $('#message').text(error.message).css("color", "red").show();
    }
}

$(document).ready(async function() {
    await getUser();

    $('#profile-change-btn').on('click', async (e) => {
        e.preventDefault();
        const name = $('#name').val();
        const surname = $('#surname').val();
        const phone = $('#phone').val();
        const email = $('#email').val();
        await changeData(name, surname, phone, email);
    });
});