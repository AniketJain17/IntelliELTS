// const XLSX = require('xlsx');
// const workbook = XLSX.readFile('questions.xlsx');
// const worksheet = workbook.Sheets['Sheet1'];

// // Assuming that the questions are in the first column (column A)
// const questionRange = XLSX.utils.decode_range(worksheet['!ref']);
// for (let row = questionRange.s.r; row <= questionRange.e.r; row++) {
//   const cellAddress = XLSX.utils.encode_cell({ r: row, c: 0 });
//   const question = worksheet[cellAddress].v;
//   console.log(question);
// }


const questions = [
  "What is your Name ?",
  "What is your Age ?",
  "What is your Fav Game ?",
  "What is your Fav color ?",

];

const generateQuestionButton = document.getElementById("generateQuestionButton");
const answerField = document.getElementById("questionField");
const startBtn = document.getElementById("startBtn");

answerField.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    const userAnswer = answerField.value;
    console.log("User's answer:", userAnswer);
    answerField.value = "";
  }
});

generateQuestionButton.addEventListener("click", function() {
  stopTimer();
  const randomQuestionIndex = Math.floor(Math.random() * questions.length);
  const randomQuestion = questions[randomQuestionIndex];
  answerField.value = randomQuestion;
  startTimer();
});



  let timerInterval;
  let countdownEl;
  let remainingTime = 60; // initial time is 2 minutes
  
  function startTimer() {

    const existingCountdownEl = document.querySelector("startBtn");
    if (existingCountdownEl) {
      existingCountdownEl.parentNode.removeChild(existingCountdownEl); 
    }
    const endTime = Date.now() + remainingTime * 1000; // calculate end time based on remaining time
    countdownEl = document.createElement("div");
    countdownEl.classList.add("startBtn"); // add class to match HTML
    countdownEl.innerHTML = `<span id="startBtn"> ${remainingTime} seconds</span>`;
    const startBtn = document.getElementById("startBtn");
    startBtn.parentNode.appendChild(countdownEl);
    timerInterval = setInterval(() => {
      remainingTime = Math.round((endTime - Date.now()) / 1000); // update remaining time
      if (remainingTime < 0) {
        clearInterval(timerInterval);
        countdownEl.innerHTML = `<span class="jsx-1740485024">Time's up!</span>`;
      } else {
        countdownEl.innerHTML = `<span class="id="startBtn"">${remainingTime} seconds</span>`;
      }
    }, 1000);
  }
  
  function stopTimer() {
    clearInterval(timerInterval); // clear the interval to stop the timer
  }

  const MAX_WORDS = 150; // maximum number of words allowed

// Get the answer word count element
const answerWordCount = document.querySelector('#answer-word-count');
const answerParagraphCount = document.querySelector('answer-paragraph-count');

// Get the answer textarea element
const answerTextArea = document.querySelector('#answer');

  // Add event listener for the answer textarea to count words
answerTextArea.addEventListener('input', () => {
  const paragraphs = answerTextArea.value.trim().split(/\n+/);
  // Split textarea value into array of words
  const words = answerTextArea.value.trim().split(/\s+/);

  // Count number of words and update word count display
  answerWordCount.textContent = `word : ${words.length}`;

  answerParagraphCount.textContent = `paragraphs : ${paragraphs.length}`;

    // Disable further typing if the maximum word limit is reached
    if (words.length >= MAX_WORDS) {
      answerTextArea.value = answerTextArea.value.slice(0, answerTextArea.value.length - 1);
      answerTextArea.setAttribute('disabled', 'disabled');
    } else {
      answerTextArea.removeAttribute('disabled');
    }
});
  