const otpInput = document.getElementById("otpInput");
const verifyOTP = document.getElementById("verifyOTP");

verifyOTP.addEventListener("click", async (e) => {
    e.preventDefault();
    const OTP = otpInput.value;
    const data = {
        otp: OTP,
    };

    if (OTP.length !== 6) {
        document.getElementById("otpInput").style.border = "2px solid red";
    } else {
        axios
            .post("http://localhost/quiz/PHP/confirmotp.php", data)
            .then((res) => {
                if (res.data.status === 200) {
                    localStorage.setItem("Name", res.data.fullName);
                    localStorage.setItem("Email", res.data.email);
                    localStorage.setItem("Course", JSON.stringify(res.data.courses));
                    localStorage.setItem("Role", res.data.role);

                    if (res.data.role === "Teacher") {
                        window.location.href = "http://localhost/quiz/Admin/dashboard.html";
                    } else {
                        window.location.href = "http://localhost/quiz/User/dashboard.html";
                    }
                } else if (res.data.status === 404) {
                    alert("Invalid OTP")
                } else if (res.data.status === 500) {
                    alert("User already exists, please login")
                    window.location.href = "http://localhost/quiz/forms/login.html";
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
});