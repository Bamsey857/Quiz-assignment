document.addEventListener("DOMContentLoaded", function () {
    const questions = JSON.parse(localStorage.getItem('Questions'));

    if (!questions || !Array.isArray(questions) || questions.length === 0) {
        alert('No questions found or invalid data.');
        return;
    }

    let currentQuestionIndex = 0;
    let score = 0;
    let timer;

    const questionElement = document.getElementById('question');
    const optionsElement = document.getElementById('options');
    const nextButton = document.getElementById('nextBtn');
    const timerElement = document.getElementById('timer');

    function displayQuestion() {
        const currentQuestion = questions[currentQuestionIndex];
        questionElement.textContent = currentQuestion.question;
        optionsElement.innerHTML = '';

        for (let i = 1; i <= 4; i++) {
            const option = currentQuestion['option' + i];
            const optionButton = document.createElement('button');
            optionButton.className = 'bg-gray-700 border-2 border-black border-solid p-2 m-2 rounded-lg';
            optionButton.textContent = option;
            optionButton.addEventListener('click', () => {
                if (option === currentQuestion.answer) {
                    score++;
                }
                nextQuestion();
            });
            optionsElement.appendChild(optionButton);
        }
    }

    function nextQuestion() {
        currentQuestionIndex++;
        if (currentQuestionIndex < questions.length) {
            displayQuestion();
        } else {
            clearInterval(timer);
            alert('Quiz completed! Your score: ' + score);
            window.location.href = "http://localhost/Quiz/User/dashboard.html";
        }
    }

    function startTimer(time) {
        let timeLeft = time;
        timer = setInterval(() => {
            if (timeLeft > 0) {
                const minutes = Math.floor(timeLeft / 60);
                const seconds = timeLeft % 60;
                timerElement.textContent = `Time Left: ${minutes}m ${seconds}s`;
                timeLeft--;
            } else {
                clearInterval(timer);
                alert('Time up! Your score: ' + score);
                window.location.href = "http://localhost/Quiz/User/dashboard.html";
            }
        }, 1000);
    }

    let quizDuration;
    if (questions.length > 10 && questions.length < 20) {
        quizDuration = 600;
    } else if (questions.length > 20 && questions.length < 30) {
        quizDuration = 750;
    } else {
        quizDuration = 900;
    }

    startTimer(quizDuration);
    displayQuestion();
    nextButton.addEventListener('click', nextQuestion);
});