document.addEventListener("DOMContentLoaded", (e) => {
  e.preventDefault();
  const submit = document.getElementById("submit");
  const email = document.getElementById("email");
  const password = document.getElementById("password");

  submit.addEventListener("click", (e) => {
    e.preventDefault();

    const data = {
      email: email.value,
      password: password.value,
    };

    axios
      .post("http://localhost/quiz/PHP/login.php", data)
      .then((res) => {
        if (res.data.status === 200) {
          localStorage.setItem("Name", res.data.fullName);
          localStorage.setItem("Email", res.data.email);
          localStorage.setItem("Course", JSON.stringify(res.data.courses));
          localStorage.setItem("Role", res.data.role);

          document.getElementById("success").style.display = "flex";

          setTimeout(() => {
            document.getElementById("success").style.display = "none";
          }, 3000);

          if (res.data.role === "Teacher") {
            window.location.href = "http://localhost/quiz/Admin/dashboard.html";
          } else {
            window.location.href = "http://localhost/quiz/User/dashboard.html";
          }
        } else if (res.data.status === 401) {
          document.getElementById("error").style.display = "flex";
          document.getElementById("passError").innerText = "Incorrect password";

          setTimeout(() => {
            document.getElementById("error").style.display = "none";
          }, 3000);
        } else if (res.data.status === 404) {
          document.getElementById("error").style.display = "flex";
          document.getElementById("passError").innerText = "Email does not exist";

          setTimeout(() => {
            document.getElementById("error").style.display = "none";
          }, 3000);
        }
      })
      .catch((err) => {
        console.error(err);
      });
  });
});