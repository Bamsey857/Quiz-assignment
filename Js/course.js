document.addEventListener("DOMContentLoaded", function () {
  const allCourses = JSON.parse(localStorage.getItem("Course"));
  const courseDiv = document.querySelector(".card-body");

  allCourses.forEach((course) => {
    const div = document.createElement("div");
    div.className = "relative flex flex-col mt-6 text-gray-700 bg-white shadow-md bg-clip-border rounded-xl w-96 p-4";

    const menuContainer = document.createElement("div");
    menuContainer.className = "absolute top-0 right-0 m-2 cursor-pointer";

    const menuIcon = document.createElement("i");
    menuIcon.className = "fas fa-ellipsis-v text-gray-700 text-xl";

    const dropdownMenu = document.createElement("div");
    dropdownMenu.className = "hidden absolute top-10 right-0 shadow-md rounded-lg p-4 bg-white";

    const editButton = document.createElement("button");
    editButton.className = "block w-full p-2 text-lg text-blue-700 hover:bg-gray-100 fas fa-pen-to-square";

    const popup = document.getElementById('popup');

    editButton.addEventListener("click", () => {
      popup.style.display = "block";

      const submitBtn = document.getElementById('submitBtn');
      const lang = document.getElementById('lang');
      const desc = document.getElementById('desc');

      submitBtn.onclick = (ev) => {
        ev.preventDefault();

        const data = {
          lang: lang.value,
          desc: desc.value,
          id: course.id,
          teachID: course.teachID
        };

        axios.post('http://localhost/Quiz/PHP/editCourse.php', data).then((res) => {
          console.log(res.data);
          if (res.data.status === 200) {
            document.getElementById("success").style.display = "flex";
            document.getElementById("succMess").innerText = "Course edited successfully";

            setTimeout(() => {
              document.getElementById("success").style.display = "none";
            }, 3000);
            localStorage.setItem("Course", JSON.stringify(res.data.course));
            popup.style.display = 'none';
            window.location.reload();
          } else {
            document.getElementById("error").style.display = "flex";
            document.getElementById("passError").innerText = "Unable to finish request";

            setTimeout(() => {
              document.getElementById("error").style.display = "none";
            }, 3000);
          }
        })
      }
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "block w-full p-2 text-lg text-red-700 hover:bg-gray-100 fas fa-trash";

    deleteButton.addEventListener("click", () => {
      const data = {
        id: course.id,
        teachID: course.teachID
      }
      axios.post('http://localhost/Quiz/PHP/delCourse.php', data).then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          document.getElementById("success").style.display = "flex";
          document.getElementById("succMess").innerText = "Course deleted successfully";

          setTimeout(() => {
            document.getElementById("success").style.display = "none";
          }, 3000);
          localStorage.setItem("Course", JSON.stringify(res.data.course));
          window.location.reload();
        } else {
          document.getElementById("error").style.display = "flex";
          document.getElementById("passError").innerText = "Unable to finish request";

          setTimeout(() => {
            document.getElementById("error").style.display = "none";
          }, 3000);
        }
      })
    });

    dropdownMenu.appendChild(editButton);
    dropdownMenu.appendChild(deleteButton);

    menuContainer.appendChild(menuIcon);
    menuContainer.appendChild(dropdownMenu);

    menuContainer.addEventListener("click", () => {
      dropdownMenu.classList.toggle("hidden");
    });

    div.appendChild(menuContainer);

    const h5 = document.createElement("h5");
    h5.className = "block mb-2 font-sans text-xl antialiased font-semibold leading-snug tracking-normal text-blue-gray-900";
    h5.innerHTML = course.lang;
    div.appendChild(h5);

    const p = document.createElement("p");
    p.className = "block mb-2 font-sans text-base antialiased font-light leading-relaxed text-inherit";
    p.style.wordWrap = "break-word";
    p.innerHTML = course.desc;
    div.appendChild(p);

    const btndiv = document.createElement("div");
    btndiv.className = "p-6 pt-0";

    const btn = document.createElement("button");
    btn.className = "align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs py-3 px-6 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none";
    btn.type = "button";
    btn.innerHTML = "View";

    btn.addEventListener("click", () => {
      if (localStorage.getItem("Role") === "Teacher") {
        const id = course.id;
        const email = localStorage.getItem("Email");
        const data = { id, email };
        console.log(data);
        axios.post("http://localhost/Quiz/Php/quest.php", data).then((res) => {
          console.log(res.data);
          localStorage.setItem("Questions", JSON.stringify(res.data.questions));
          window.location.href = "http://localhost/Quiz/Admin/Questions.html";
        }).catch((err) => {
          console.error(err);
        })
      } else {
        console.log("Student Clicked");
        const id = course.id;
        const email = localStorage.getItem("Email");
        const data = { id, email };
        console.log(data);
        axios.post("http://localhost/Quiz/Php/quest.php", data).then((res) => {
          console.log(res.data);
          localStorage.setItem("Questions", JSON.stringify(res.data.questions));
          window.location.href = "http://localhost/Quiz/User/quiz.html";
        }).catch((err) => {
          console.error(err);
        })
      }
    })

    btndiv.appendChild(btn);
    div.appendChild(btndiv);

    courseDiv.appendChild(div);
  });

  const add = document.getElementById("add");
  const popup = document.getElementById('popup');
  const submitBtn = document.getElementById('submitBtn');
  const lang = document.getElementById('lang');
  const desc = document.getElementById('desc');
  const email = localStorage.getItem('Email');

  add.addEventListener("click", () => {
    popup.style.display = 'block';

    submitBtn.onclick = (ev) => {
      ev.preventDefault();

      const data = {
        lang: lang.value,
        desc: desc.value,
        email
      };

      axios.post('http://localhost/Quiz/PHP/createCourse.php', data).then((res) => {
        console.log(res.data);
        if (res.data.status === 200) {
          document.getElementById("success").style.display = "flex";
          document.getElementById("succMess").innerText = "Course Added successfully";

          setTimeout(() => {
            document.getElementById("success").style.display = "none";
          }, 3000);
          localStorage.setItem("Course", JSON.stringify(res.data.course));
          popup.style.display = 'none';
          window.location.reload();
        } else {
          document.getElementById("error").style.display = "flex";
          document.getElementById("passError").innerText = "Unable to finish request";

          setTimeout(() => {
            document.getElementById("error").style.display = "none";
          }, 3000);
        }
      })
    }
  })
})
