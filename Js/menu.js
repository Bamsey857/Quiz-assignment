document.addEventListener("DOMContentLoaded", function () {
    document.getElementById("mobile-menu-button").addEventListener("click", () => {
        const mobile = document.getElementById("mobile-down");
        mobile.style.display = mobile.style.display === "block" ? "none" : "block";
    });

    document.getElementById("user-menu-button").addEventListener("click", () => {
        const menuDown = document.getElementById("menu-down");
        menuDown.style.display = menuDown.style.display === "block" ? "none" : "block";
    });

    function signOut() {
        localStorage.clear();
        window.location.href("http://localhost/quiz/Forms/login.html");
    };

    document.getElementById('user-menu-item-2').addEventListener('click', signOut);
    document.getElementById('out').addEventListener('click', signOut);
})