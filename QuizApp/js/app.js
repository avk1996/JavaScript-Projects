const questions = [
  {
    question: "What is the capital of France?",
    a: "Paris",
    b: "Berlin",
    c: "London",
    d: "Madrid",
    answer: "a",
  },
  {
    question: "Who wrote the play 'Hamlet'?",
    a: "William Shakespeare",
    b: "Jane Austen",
    c: "Leo Tolstoy",
    d: "Charles Dickens",
    answer: "a",
  },
  {
    question: "What is the chemical symbol for water?",
    a: "H2O",
    b: "CO2",
    c: "NaCl",
    d: "CH4",
    answer: "a",
  },
  {
    question: "Which planet is known as the Red Planet?",
    a: "Mars",
    b: "Jupiter",
    c: "Venus",
    d: "Saturn",
    answer: "a",
  },
  {
    question: "Who is credited with inventing the telephone?",
    a: "Alexander Graham Bell",
    b: "Thomas Edison",
    c: "Nikola Tesla",
    d: "Marie Curie",
    answer: "a",
  },
  {
    question: "What is the tallest mountain in the world?",
    a: "Mount Everest",
    b: "K2",
    c: "Mount Kilimanjaro",
    d: "Mount Fuji",
    answer: "a",
  },
  {
    question: "Who painted the Mona Lisa?",
    a: "Leonardo da Vinci",
    b: "Pablo Picasso",
    c: "Vincent van Gogh",
    d: "Michelangelo",
    answer: "a",
  },
  {
    question: "What is the largest mammal in the world?",
    a: "Blue whale",
    b: "Elephant",
    c: "Giraffe",
    d: "Hippopotamus",
    answer: "a",
  },
  {
    question: "What is the chemical symbol for gold?",
    a: "Au",
    b: "Ag",
    c: "Fe",
    d: "Pt",
    answer: "a",
  },
  {
    question: "Who was the first man to step on the moon?",
    a: "Neil Armstrong",
    b: "Buzz Aldrin",
    c: "Yuri Gagarin",
    d: "John Glenn",
    answer: "a",
  },
];

let i = 0;
let rI = questions.length;
let correctAns = 0;
let wrongAns = 0;
let unselectedAns = 0;
const question = document.getElementById("question");
const options = document.querySelectorAll(".options");
const loadQuestion = () => {
  resetQuestion();
  const data = questions[i];
  console.log(options);
  question.innerText = `${i + 1} . ${data.question}`;
  options[0].nextElementSibling.innerText = `${data.a}`;
  options[1].nextElementSibling.innerText = `${data.b}`;
  options[2].nextElementSibling.innerText = `${data.c}`;
  options[3].nextElementSibling.innerText = `${data.d}`;
};

const getAnswer = () => {
  let answerSelected;
  options.forEach((input) => {
    if (input.checked) {
      answerSelected = input.value;
    }
  });
  return answerSelected;
};

const submitAnswer = () => {
  const answerSelected = getAnswer();
  const correctAnswer = questions[i].answer;
  console.log(`Answer selected ${answerSelected}`);
  console.log(`Correct answer ${correctAnswer}`);
  if (answerSelected === correctAnswer && i < questions.length) ++correctAns;
  else if (answerSelected === undefined) ++unselectedAns;
  else if (answerSelected !== correctAnswer) ++wrongAns;
  else console.log("complete");

  // to go next question until the final question
  if (i < questions.length - 1) {
    ++i;
    loadQuestion();
    document.getElementById("previous").style.backgroundColor = "";
  } else if (i === questions.length - 1) {
    document.querySelector(".quiz-section").innerHTML = `    
    <div class="quiz-score" style="color: white;display:flex;flex-direction: column;align-items: center ">
    <h1 style="padding: 20px">Congrats on Quiz completion!</h1>
    <h2 style="padding: 5px">Score: ${correctAns}/${questions.length}</h2>
    <h3 style="padding: 5px">Analytics</h3>
    <table>
        <tr>
            <td>Correct Answers:</td>
            <td>&nbsp;&nbsp;</td>
            <td>${correctAns}</td>
        </tr>
        <tr>
            <td>Unselected Answers:</td>
            <td>&nbsp;&nbsp;</td>
            <td>${unselectedAns}</td>
        </tr>
        <tr>
            <td>Wrong Answers:</td>
            <td>&nbsp;&nbsp;</td>
            <td>${wrongAns}</td>
        </tr>
    </table>
    </div>`;
    document.getElementById("end").style.visibility = "visible";
    document.querySelector("#try-again").innerText = "Try Again";
  }
  console.log(correctAns);
  console.log(wrongAns);
};

const toNext = () => {
  if (i >= 0 && i < questions.length - 1) {
    ++i;
    loadQuestion();
    console.log(`to Q${i}. ${questions[i].question}`);
    document.getElementById("previous").style.backgroundColor = "";
  } else {
    document.getElementById("next").style.backgroundColor = "red";
    console.log("can't go further");
  }
};

const goBack = () => {
  if (i > 0) {
    --i;
    loadQuestion();
    console.log(
      `to Q${i}. ${questions[i].question} max questions: ${questions.length}`
    );
    document.getElementById("next").style.backgroundColor = "";
  } else {
    document.getElementById("previous").style.backgroundColor = "red";
    console.log("can't go backword");
  }
};

const checkScore = () => {
  if (i === questions.length - 1) {
    document.querySelector(
      ".score-show"
    ).innerText = `${correctAns}/${questions.length}`;
  }
};

const resetQuestion = () => {
  document.getElementById("end").style.visibility = "hidden";
  options.forEach((input) => {
    input.checked = false;
  });
};

const backToQuiz = () => {
  location.reload();
};
loadQuestion();
