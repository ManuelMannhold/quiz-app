let questions = [
    {
        question: "Wer hat HTML erfunden?",
        answer_1: "Bill Murray",
        answer_2: "Tim Berners-Lee",
        answer_3: "Robbie Williams",
        answer_4: "Bill Cosby",
        rigth_answer: 2,
    },
    {
        question: "Was heisst CSS in der Informatik?",
        answer_1: "Cascading Stylesheet",
        answer_2: "Cross Canvas Stamp",
        answer_3: "Counter-Strike Source",
        answer_4: "Clara-Cora-Sans",
        rigth_answer: 1,
    },
    {
        question: "Wie fügt man einen Link im HTML ein?",
        answer_1: "Bitte Link einfügen!",
        answer_2: 'img src="..."',
        answer_3: 'a href="..."',
        answer_4: "button></button",
        rigth_answer: 3,
    },
    {
        question: "Wie bindet man externes Javascript im HTML ein?",
        answer_1: 'script src="..."',
        answer_2: "Laut um Hilfe rufen",
        answer_3: "link",
        answer_4: 'body class="Javascript"',
        rigth_answer: 1,
    },
];

let currentQuestion = 0;
let rightQuestions = 0;
let AUDIO_SUCCESS = new Audio('./sound/right.mp3');
let AUDIO_FAIL = new Audio('./sound/wrong.mp3');

function init() {
    questionLength();
    showQuestion();
}

function questionLength() {
    document.getElementById("question-length").innerHTML = questions.length;
}

function showQuestion() {
    if (gameIsOver()) {
        showEndScreen()
    } else {
        updateProgressBar();
        updateToNextQuestion();
    }
}

function gameIsOver() {
   return currentQuestion >= questions.length;
}

function showEndScreen() {
    document.getElementById("quiz-end").style = "";
    document.getElementById("question-body").style = "display: none";
    document.getElementById("amount-of-question").innerHTML = questions.length;
    document.getElementById("amount-of-right-questions").innerHTML = rightQuestions;
    document.getElementById("header-image").src = "./img/cup.png";
}

function updateToNextQuestion() {
    
    let question = questions[currentQuestion];
    document.getElementById("questiontext").innerHTML = question["question"];
    document.getElementById("answer_1").innerHTML = question["answer_1"];
    document.getElementById("answer_2").innerHTML = question["answer_2"];
    document.getElementById("answer_3").innerHTML = question["answer_3"];
    document.getElementById("answer_4").innerHTML = question["answer_4"];
}

function updateProgressBar() {
    let percent = (currentQuestion + 1) / questions.length;
    percent = Math.round(percent * 100);
    document.getElementById("progress-bar").innerHTML = `${percent} %`;
    document.getElementById("progress-bar").style = `width: ${percent}%;`;
}

function answer(selection) {
    let question = questions[currentQuestion];
    let selectedQuestionNumber = selection.slice(-1); //nummer von answer_'' in variable speichern;
    let idOfRightAnswer = `answer_${question["rigth_answer"]}`;

    if (rightAnswerSelected(selectedQuestionNumber)) {
        // abfrage ob die geklickte answer die right_answer aus dem JSON Array ist;
        console.log("richtige antwort");
        document.getElementById(selection).parentNode.classList.add("bg-success");
        AUDIO_SUCCESS.play();
        rightQuestions++;
    } else {
        document.getElementById(selection).parentNode.classList.add("bg-danger");
        document
            .getElementById(idOfRightAnswer)
            .parentNode.classList.add("bg-success");
        AUDIO_FAIL.play();
    }
    document.getElementById("next-button").disabled = false;
}

function rightAnswerSelected(selectedQuestionNumber) {
    return selectedQuestionNumber == questions["rigth_answer"];
}

function nextQuestion() {
    currentQuestion++; // Frage um 1 erhöhen für die nächste Frage;
    resetAnswerButtons();
    showQuestion();
}

function resetAnswerButtons() {
    document.getElementById("question-number").innerHTML = currentQuestion + 1;
    document.getElementById("next-button").disabled = true;
    document.getElementById("answer_1").parentNode.classList.remove("bg-danger");
    document.getElementById("answer_1").parentNode.classList.remove("bg-success");
    document.getElementById("answer_2").parentNode.classList.remove("bg-danger");
    document.getElementById("answer_2").parentNode.classList.remove("bg-success");
    document.getElementById("answer_3").parentNode.classList.remove("bg-danger");
    document.getElementById("answer_3").parentNode.classList.remove("bg-success");
    document.getElementById("answer_4").parentNode.classList.remove("bg-danger");
    document.getElementById("answer_4").parentNode.classList.remove("bg-success");
}

function restartGame() {
    document.getElementById('header-image').src = './img/background.jpg';
    document.getElementById("question-body").style = ''; //questionBody wieder anzeigen
    document.getElementById("quiz-end").style = "display: none"; // Endscreen ausblenden

    rightQuestions = 0; // zurücksetzen auf 0
    currentQuestion = 0;
    init();
}