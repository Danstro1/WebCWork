document.querySelector('#exit').addEventListener('click', async () => {
    try {
        const res = await fetch("/api/auth/logout", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
        });
        const data = await res.json();
        if (data.error) {
            throw new Error(data.error);
        }
    } catch (error) {
        console.log(error.message);
    }
})