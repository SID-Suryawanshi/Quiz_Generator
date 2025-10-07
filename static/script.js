// static/script.js

document.addEventListener('DOMContentLoaded', () => {
    const quizForm = document.getElementById('quiz-form');
    const generateBtn = document.getElementById('generate-btn');
    const quizContainer = document.getElementById('quiz-container');
    const resultContainer = document.getElementById('result-container');
    const loader = document.getElementById('loader');

    let quizData = null; // To store the quiz data globally

    quizForm.addEventListener('submit', async (e) => {
        e.preventDefault();
        
        // Get form values
        const topic = document.getElementById('topic').value;
        const numQuestions = document.getElementById('num_questions').value;
        const difficulty = document.getElementById('difficulty').value;

        // UI updates
        generateBtn.disabled = true;
        loader.style.display = 'block';
        quizContainer.innerHTML = '';
        resultContainer.innerHTML = '';

        try {
            // Call the FastAPI backend
            const response = await fetch('/create-quiz/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    topic: topic,
                    num_questions: parseInt(numQuestions),
                    difficulty: difficulty,
                }),
            });

            if (!response.ok) {
                throw new Error('Failed to generate quiz. Please try again.');
            }

            const data = await response.json();
            quizData = data.quiz; // Store quiz data
            displayQuiz(quizData);

        } catch (error) {
            resultContainer.textContent = error.message;
        } finally {
            // UI cleanup
            loader.style.display = 'none';
            generateBtn.disabled = false;
        }
    });

    function displayQuiz(quiz) {
        quiz.forEach((question, index) => {
            const card = document.createElement('div');
            card.className = 'question-card';
            
            const questionText = document.createElement('h3');
            questionText.textContent = `${index + 1}. ${question.question_text}`;
            card.appendChild(questionText);

            const optionsList = document.createElement('ul');
            optionsList.className = 'options-list';
            
            question.options.forEach(option => {
                const optionItem = document.createElement('li');
                optionItem.className = 'option-item';

                const radioInput = document.createElement('input');
                radioInput.type = 'radio';
                radioInput.name = `question-${index}`;
                radioInput.value = option;
                radioInput.id = `q${index}-opt${option}`;
                
                const label = document.createElement('label');
                label.htmlFor = `q${index}-opt${option}`;
                label.textContent = option;
                
                optionItem.appendChild(radioInput);
                optionItem.appendChild(label);
                optionsList.appendChild(optionItem);
            });

            card.appendChild(optionsList);
            quizContainer.appendChild(card);
        });

        // Add a submit button for the quiz
        const submitQuizBtn = document.createElement('button');
        submitQuizBtn.textContent = 'Submit Answers';
        submitQuizBtn.onclick = checkAnswers;
        quizContainer.appendChild(submitQuizBtn);
    }

    function checkAnswers() {
        if (!quizData) return;

        let score = 0;
        const questionCards = document.querySelectorAll('.question-card');

        quizData.forEach((question, index) => {
            const selectedOption = document.querySelector(`input[name="question-${index}"]:checked`);
            const labels = questionCards[index].querySelectorAll('label');
            
            labels.forEach(label => {
                const radio = document.getElementById(label.htmlFor);
                // Highlight the correct answer
                if (radio.value === question.correct_answer) {
                    label.classList.add('correct');
                }
                // If an option was selected and it's incorrect, highlight it
                if (selectedOption && radio.value === selectedOption.value && selectedOption.value !== question.correct_answer) {
                    label.classList.add('incorrect');
                }
                // Disable all radio buttons after submission
                document.getElementById(label.htmlFor).disabled = true;
            });

            if (selectedOption && selectedOption.value === question.correct_answer) {
                score++;
            }
        });

        resultContainer.textContent = `Your score: ${score} out of ${quizData.length}`;
        // Optionally, disable the submit button
        event.target.disabled = true;
    }
});