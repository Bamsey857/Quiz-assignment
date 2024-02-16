document.addEventListener('DOMContentLoaded', () => {
    const allQuestions = JSON.parse(localStorage.getItem('Questions'));

    const courseDiv = document.querySelector(".card-body");

    allQuestions.forEach((question) => {
        const div = document.createElement("div");
        div.className = 'flex flex-col border-2 border-black w-full rounded-lg mb-4 p-4 bg-white-500 relative'; // Added relative class

        const h5 = document.createElement("h5");
        h5.innerHTML = question.question;

        const optDiv = document.createElement('div');
        optDiv.className = 'flex gap-2 flex-grow';

        const gridDiv = document.createElement('div');
        gridDiv.className = 'grid grid-cols-2 grid-rows-3 gap-2 mt-3';
        gridDiv.id = 'questionsGrid';

        const opt1 = createOptionDiv(question.option1);
        const opt2 = createOptionDiv(question.option2);
        const opt3 = createOptionDiv(question.option3);
        const opt4 = createOptionDiv(question.option4);
        const answer = createAnswerDiv(question.answer);

        const btnDiv = document.createElement('div');
        btnDiv.className = 'flex justify-end items-end absolute bottom-2 right-2 gap-2';

        const btnclass = 'h-10 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs p-2 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none';

        const editBtn = createButton('Edit', btnclass);
        const delBtn = createButton('Delete', btnclass);

        btnDiv.appendChild(editBtn);
        btnDiv.appendChild(delBtn);

        gridDiv.appendChild(opt1);
        gridDiv.appendChild(opt2);
        gridDiv.appendChild(opt3);
        gridDiv.appendChild(opt4);
        gridDiv.appendChild(answer);

        optDiv.appendChild(gridDiv);

        div.appendChild(h5);
        div.appendChild(optDiv);
        div.appendChild(btnDiv);

        courseDiv.appendChild(div);

        editBtn.addEventListener('click', () => {
            popup.style.display = 'block';

            const questInput = document.getElementById('question');
            const opt1Input = document.getElementById('Option1');
            const opt2Input = document.getElementById('Option2');
            const opt3Input = document.getElementById('Option3');
            const opt4Input = document.getElementById('Option4');
            const ansInput = document.getElementById('answer');
            const id = question.id

            questInput.value = question.question;
            opt1Input.value = question.option1;
            opt2Input.value = question.option2;
            opt3Input.value = question.option3;
            opt4Input.value = question.option4;
            ansInput.value = question.answer;

            submitBtn.onclick = (ev) => {
                ev.preventDefault();

                const data = {
                    question: questInput.value,
                    option1: opt1Input.value,
                    option2: opt2Input.value,
                    option3: opt3Input.value,
                    option4: opt4Input.value,
                    answer: ansInput.value,
                    id,
                    questID: question.questID
                };

                axios.post('http://localhost/Quiz/PHP/editQuest.php', data).then((res) => {
                    if (res.data.status === 200) {
                        alert('Updated Successfully');
                        localStorage.setItem("Questions", JSON.stringify(res.data.questions));
                        popup.style.display = 'none';
                        window.location.reload();
                    } else {
                        alert('Something went wrong');
                    }
                }).catch((err) => {
                    console.log(err);
                })
            };
        });

        delBtn.addEventListener('click', () => {

            const id = question.id;
            const questID = question.questID;
            const data = {
                id,
                questID
            }

            console.log(data);

            axios.post('http://localhost/Quiz/PHP/delQuest.php', data).then((res) => {
                if (res.data.status === 200) {
                    alert('Deleted Successfully');
                    localStorage.setItem("Questions", JSON.stringify(res.data.questions));
                    window.location.reload();
                } else {
                    alert('Something went wrong');
                }
            }).catch((err) => {
                console.log(err);
            })
        })

    });

    const popup = document.getElementById('popup');
    const submitBtn = document.getElementById('submitBtn');
    const add = document.getElementById('add');
    const next = document.getElementById('next');

    add.addEventListener('click', () => {
        popup.style.display = 'block';

        const questInput = document.getElementById('question');
        const opt1Input = document.getElementById('Option1');
        const opt2Input = document.getElementById('Option2');
        const opt3Input = document.getElementById('Option3');
        const opt4Input = document.getElementById('Option4');
        const ansInput = document.getElementById('answer');

        next.style.display = 'block';

        const multiQuest = [];
        const quest = JSON.parse(localStorage.getItem('Questions'));
        const questID = parseInt(quest[quest.length - 1].questID);



        next.onclick = (ev) => {
            ev.preventDefault();
            console.log(multiQuest);

            if (multiQuest.length > 49) {
                alert('Cannot add more than 50 questions');
            }

            multiQuest.push({
                question: questInput.value,
                option1: opt1Input.value,
                option2: opt2Input.value,
                option3: opt3Input.value,
                option4: opt4Input.value,
                answer: ansInput.value,
                questID
            });

            questInput.value = '';
            opt1Input.value = '';
            opt2Input.value = '';
            opt3Input.value = '';
            opt4Input.value = '';
            ansInput.value = '';


            submitBtn.onclick = (ev) => {
                ev.preventDefault();

                if (multiQuest.length < 0) {
                    alert('Please add at least 10 questions');
                    return;
                }
                console.log(multiQuest);
                axios.post('http://localhost/Quiz/PHP/multiaddquest.php', { multiQuest: JSON.stringify(multiQuest) })
                    .then((res) => {
                        console.log(res.data);
                    })
                    .catch((err) => {
                        console.log(err);
                    });
            };

        }

        submitBtn.onclick = (ev) => {
            ev.preventDefault();

            const quest = JSON.parse(localStorage.getItem('Questions'));
            const questID = parseInt(quest[quest.length - 1].questID);

            const data = {
                question: questInput.value,
                option1: opt1Input.value,
                option2: opt2Input.value,
                option3: opt3Input.value,
                option4: opt4Input.value,
                answer: ansInput.value,
                questID
            };

            console.log(questID);

            axios.post('http://localhost/Quiz/PHP/addQuest.php', data)
                .then((res) => {
                    if (res.data.status === 200) {
                        alert('Added Successfully');
                        localStorage.setItem("Questions", JSON.stringify(res.data.questions));
                        popup.style.display = 'none';
                        window.location.reload();
                    } else {
                        alert('Something went wrong' + res.data.message + " " + res.data.status);
                    }
                })
                .catch((err) => {
                    console.log(err);
                });
        };

    });

    function createOptionDiv(optionText) {
        const opt = document.createElement('div');
        opt.className = 'bg-green-800 p-2 rounded-lg border-1 border-red flex justify-center items-center';
        opt.innerHTML = optionText;
        return opt;
    }

    function createAnswerDiv(answerText) {
        const answer = document.createElement('div');
        answer.className = 'col-span-2 bg-blue-600 flex justify-center items-center p-2 rounded-lg border-1 border-red';
        answer.innerHTML = answerText;
        return answer;
    }

    function createButton(text, className) {
        const btn = document.createElement('button');
        btn.className = className;
        btn.innerHTML = text;
        return btn;
    }
});
