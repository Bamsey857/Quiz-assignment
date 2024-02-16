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

        document.getElementById("pass").style.display = "none";
        document.getElementById("passError").style.display = "none";

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
    const passwordRegex = /^(?=.*\d)(?=.*[a-z])(?=.*[A-Z]).{8,}$/;

    const validationMessages = [];

    if (!/(?=.*\d)/.test(data.password)) {
        validationMessages.push("Password must contain at least one digit (0-9).");
    }

    if (!/(?=.*[a-z])/.test(data.password)) {
        validationMessages.push("Password must contain at least one lowercase letter (a-z).");
    }

    if (!/(?=.*[A-Z])/.test(data.password)) {
        validationMessages.push("Password must contain at least one uppercase letter (A-Z).");
    }

    if (!/.{8,}/.test(data.password)) {
        validationMessages.push("Password must be at least 8 characters long.");
    }

    console.log("Password validation messages:", validationMessages);

    if (validationMessages.length > 0) {
        document.getElementById("pass").innerHTML = validationMessages.join("\n");
        document.getElementById("pass").style.display = "flex"
        return;
    } else {
        document.getElementById("pass").style.display = "none";
    }

    if (data.password !== data.confirmPassword) {
        document.getElementById("pass").style.display = "flex";
        return;
    } else {
        document.getElementById("pass").style.display = "none";
    }

    if (data.email === data.password) {
        document.getElementById("passError").style.display = "flex";
        return;
    } else {
        document.getElementById("passError").style.display = "none";
    }

    axios
        .post("http://localhost/Quiz/PHP/otp.php", data)
        .then((res) => {
            console.log(res.data);
            if (res.data.status === 500) {
                document.getElementById("warning").style.display = "flex";

                setTimeout(() => {
                    document.getElementById("warning").style.display = "none";
                }, 3000)
            } else {
                window.location.href = "http://localhost/Quiz/Forms/verify.html";
            }
        })
        .catch((err) => {
            console.error(err);
        });
}