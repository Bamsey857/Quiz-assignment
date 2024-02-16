// document.addEventListener("DOMContentLoaded", () => {
//     // const email = localStorage.getItem("Email");
//     // const id = 123; // Replace with the actual question ID
    
//     // // Fetch questions from the server
//     // axios.post("http://localhost/quiz/PHP/getQuestions.php", { email, id })
//     //     .then(response => {
//     //         if (response.data.status === 200) {
//                 const questions = localStorage.getItem("Questions");
//                 const questionsGrid = document.getElementById("questionsGrid");

//                 // Loop through the questions and populate the grid
//                 questions.forEach(question => {
//                     const div = document.createElement("div");
//                     div.className = "bg-green-500"; // Set the background color based on your logic
//                     div.textContent = question.question; // Assuming the question is stored in the 'question' field
//                     questionsGrid.appendChild(div);
//                 });
//         //     } else {
//         //         console.error("Failed to fetch questions:", response.data.message);
//         //     }
//         // })
//         // .catch(error => {
//         //     console.error("Error fetching questions:", error);
//         // });

//     // Add event listeners to edit and delete buttons
//     const editQuestionBtn = document.getElementById("editQuestionBtn");
//     editQuestionBtn.addEventListener("click", () => {
//         // Add logic to handle edit button click
//         console.log("Edit button clicked");
//     });

//     const deleteQuestionBtn = document.getElementById("deleteQuestionBtn");
//     deleteQuestionBtn.addEventListener("click", () => {
//         // Add logic to handle delete button click
//         console.log("Delete button clicked");
//     });
// });



document.addEventListener('DOMContentLoaded', () => {
    const allQuestions = [
        {
            "id": 5,
            "question": "Question 1",
            "option1": "Option 1",
            "option2": "Option 2",
            "option3": "Option 3",
            "option4": "Option 4",
            "answer": "Option 1",
            "questID": 1
        },
        {
            "id": 6,
            "question": "Question 2",
            "option1": "Option 1",
            "option2": "Option 2",
            "option3": "Option 3",
            "option4": "Option 4",
            "answer": "Option 2",
            "questID": 1
        },
        {
            "id": 7,
            "question": "Question 3",
            "option1": "Option 1",
            "option2": "Option 2",
            "option3": "Option 3",
            "option4": "Option 4",
            "answer": "Option 3",
            "questID": 1
        }
    ];

    const courseDiv = document.querySelector(".card-body");
    courseDiv.classList.add('flex', 'flex-col', 'border-2', 'border-black', 'w-[30%]');

    allQuestions.forEach((question, index) => {
        const div = document.createElement("div");

        const h5 = document.createElement("h5");
        h5.textContent = `${index + 1}. ${question.question}`;

        const gridDiv = document.createElement('div');
        gridDiv.className = 'grid grid-cols-2 grid-rows-3 gap-2 mt-3';

        const opt1 = createOptionDiv(question.option1);
        const opt2 = createOptionDiv(question.option2);
        const opt3 = createOptionDiv(question.option3);
        const opt4 = createOptionDiv(question.option4);
        const answer = createAnswerDiv(question.answer);

        gridDiv.appendChild(opt1);
        gridDiv.appendChild(opt2);
        gridDiv.appendChild(opt3);
        gridDiv.appendChild(opt4);
        gridDiv.appendChild(answer);

        div.appendChild(h5);
        div.appendChild(gridDiv);

        courseDiv.appendChild(div);
    });
})

function createOptionDiv(option) {
    const div = document.createElement('div');
    div.className = 'p-2 bg-green-600 text-red-700 text-bold mt-2 card';
    div.textContent = option;
    return div;
}

function createAnswerDiv(answer) {
    const div = document.createElement('div');
    div.className = 'p-2 bg-green-600 text-red-700 text-bold mt-2 card';
    div.textContent = answer;
    return div;
}


// document.addEventListener('DOMContentLoaded', () => {
//     const allQuestions = JSON.parse(localStorage.getItem('Questions'));

//     const courseDiv = document.querySelector(".card-body");

//     allQuestions.forEach((question) => {
//         const div = document.createElement("div");
//         div.className = 'flex flex-col border-2 border-black w-full rounded-lg mb-4 p-4 bg-white-500 relative'; // Added relative class

//         const h5 = document.createElement("h5");
//         h5.innerHTML = question.question;

//         const optDiv = document.createElement('div');
//         optDiv.className = 'flex gap-2 flex-grow';

//         const gridDiv = document.createElement('div');
//         gridDiv.className = 'grid grid-cols-2 grid-rows-3 gap-2 mt-3';
//         gridDiv.id = 'questionsGrid';

//         const opt1 = createOptionDiv(question.option1);
//         const opt2 = createOptionDiv(question.option2);
//         const opt3 = createOptionDiv(question.option3);
//         const opt4 = createOptionDiv(question.option4);
//         const answer = createAnswerDiv(question.answer);

//         const btnDiv = document.createElement('div');
//         btnDiv.className = 'flex justify-end items-end absolute bottom-2 right-2 gap-2';

//         const btnclass = 'h-10 align-middle select-none font-sans font-bold text-center uppercase transition-all disabled:opacity-50 disabled:shadow-none disabled:pointer-events-none text-xs p-2 rounded-lg bg-gray-900 text-white shadow-md shadow-gray-900/10 hover:shadow-lg hover:shadow-gray-900/20 focus:opacity-[0.85] focus:shadow-none active:opacity-[0.85] active:shadow-none';

//         const editBtn = createButton('Edit', btnclass);
//         const delBtn = createButton('Delete', btnclass);

//         btnDiv.appendChild(editBtn);
//         btnDiv.appendChild(delBtn);

//         gridDiv.appendChild(opt1);
//         gridDiv.appendChild(opt2);
//         gridDiv.appendChild(opt3);
//         gridDiv.appendChild(opt4);
//         gridDiv.appendChild(answer);

//         optDiv.appendChild(gridDiv);

//         div.appendChild(h5);
//         div.appendChild(optDiv);
//         div.appendChild(btnDiv);

//         courseDiv.appendChild(div);

//         editBtn.addEventListener('click', () => {
//             popup.style.display = 'block';

//             submitBtn.addEventListener('click', (ev) => {
//                 ev.preventDefault();
//                 alert('Submitted');
//                 popup.style.display = 'none';
//             })
//         });

//     });

//     const popup = document.getElementById('popup');
//     const submitBtn = document.getElementById('submitBtn');
//     const add = document.getElementById('add');

//     add.addEventListener('click', () => {
//         popup.style.display = 'block';

//         submitBtn.addEventListener('click', (ev) => {
//             ev.preventDefault();
//             alert('Added');
//             popup.style.display = 'none';
//         })
//     })

//     function createOptionDiv(optionText) {
//         const opt = document.createElement('div');
//         opt.className = 'bg-green-800 p-2 rounded-lg border-1 border-red flex justify-center items-center';
//         opt.innerHTML = optionText;
//         return opt;
//     }

//     function createAnswerDiv(answerText) {
//         const answer = document.createElement('div');
//         answer.className = 'col-span-2 bg-blue-600 flex justify-center items-center p-2 rounded-lg border-1 border-red';
//         answer.innerHTML = answerText;
//         return answer;
//     }

//     function createButton(text, className) {
//         const btn = document.createElement('button');
//         btn.className = className;
//         btn.innerHTML = text;
//         return btn;
//     }
// });

