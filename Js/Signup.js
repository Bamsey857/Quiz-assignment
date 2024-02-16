let role = "student";

document.getElementById("switchStu").addEventListener("click", () => {
    role = "student";
    document.getElementById("teacher").classList.add("hidden");
    document.getElementById("student").classList.remove("hidden");
});

document.getElementById("switchTea").addEventListener("click", () => {
    role = "teacher";
    document.getElementById("student").classList.add("hidden");
    document.getElementById("teacher").classList.remove("hidden");
});

const submitButtons = document.querySelectorAll(".submit-button");
submitButtons.forEach((button) => {
    button.addEventListener("click", (e) => {
        e.preventDefault();

        let email, password, confirmPassword, fullName;
        if (role === "teacher") {
            email = document.getElementById("teacher-email");
            password = document.getElementById("teacher-password");
            confirmPassword = document.getElementById("teacher-confirmPassword");
            fullName = document.getElementById("teacher-fullname");
        } else if (role === "student") {
            email = document.getElementById("student-email");
            password = document.getElementById("student-password");
            confirmPassword = document.getElementById("student-confirmPassword");
            fullName = document.getElementById("student-fullname");
        }

        const data = {
            fullname: fullName.value,
            email: email.value,
            password: password.value,
            confirmPassword: confirmPassword.value,
            role: role,
        };

        sendDetails(data);
    });
});

function sendDetails(data) {
    document.getElementById("pass").style.display = "none";
    document.getElementById("passError").style.display = "none";


    if (data.email === data.password) {
        document.getElementById("passError").style.display = "block";
    } else if (data.password !== data.confirmPassword) {
        document.getElementById("pass").style.display = "block";
    } else {
        axios
            .post("http://localhost/Quiz/PHP/otp.php", data)
            .then((res) => {
                console.log(res.data);
                window.location.href = "http://localhost/Quiz/Forms/verify.html";
            })
            .catch((err) => {
                console.error(err);
            });
    }
}