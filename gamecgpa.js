
window.addEventListener("popstate", function(event){
  history.pushState(null, "", window.location.href);
});

document.addEventListener("keydown", e => {
  if((e.ctrlKey || e.metaKey) &&  e.key.toLowerCase() === 'r'){
    e.preventDefault();
  }
});



const topic = " <br> CSS 304  Pre-lecture Test";
const topicId = document.getElementById("topic");
topicId.innerHTML = topic;
setTimeout(disappear, 10000);
function disappear(){
  topicId.style.opacity = 0;
}


const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoretext = document.getElementById("score");
const progressbarfull = document.getElementById("progressbarfull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
const previous = document.getElementById("previous");
const next = document.getElementById("next");
let currentQuestion = {};
let questionNo;
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];
let questions = [
    {
        question: "Who is considered the father of the Classical School of Criminology?",
        choice1: "Cesare Lombroso",
        choice2: "Jeremy Bentham",
        choice3: "Cesare Beccaria",
        choice4: "Emile Durkheim",
        answer: 3,
        rationale: "Cesare Beccaria is widely recognized as the father of the Classical School for advocating rational punishment and legal reform."
    },
    {
        question: "What was the Classical School’s primary explanation for criminal behavior?",
        choice1: "Genetic abnormalities",
        choice2: "Unconscious motives",
        choice3: "Free will and rational choice",
        choice4: "Social inequality",
        answer: 3,
        rationale: "Classical theorists believed people commit crimes after rationally calculating benefits over consequences."
    },
    {
        question: "According to Classical thinkers, how can crime best be controlled?",
        choice1: "Through rehabilitation",
        choice2: "By improving social structures",
        choice3: "By ensuring swift, certain, and proportionate punishment",
        choice4: "Through long-term incarceration",
        answer: 3,
        rationale: "The Classical School emphasized deterrence through predictable and proportionate punishment."
    },
    {
        question: "How did the Classical School propose to predict criminal behavior?",
        choice1: "By analyzing family history",
        choice2: "By assuming all humans are rational and seek pleasure over pain",
        choice3: "By evaluating mental illness",
        choice4: "By studying economic status",
        answer: 2,
        rationale: "Prediction was based on the belief that everyone calculates actions using pleasure-pain principles."
    },
    {
        question: "Which of the following best describes the Classical School’s view on crime?",
        choice1: "Crime is caused by biological defects",
        choice2: "Crime is a result of environmental factors",
        choice3: "Crime is a product of free will and rational calculation",
        choice4: "Crime is an unconscious drive",
        answer: 3,
        rationale: "Classical theorists saw crime as a conscious and rational choice by the offender."
    },
    {
        question: "What distinguishes the Neo-Classical School from the Classical School?",
        choice1: "It rejects the idea of punishment",
        choice2: "It denies human rationality",
        choice3: "It introduces mitigating circumstances",
        choice4: "It emphasizes genetics",
        answer: 3,
        rationale: "Neo-Classical theorists retained free will but acknowledged circumstances like age and mental health."
    },
    {
        question: "Which group would the Neo-Classical School consider less culpable for a crime?",
        choice1: "Adults",
        choice2: "The elderly",
        choice3: "Children and the mentally ill",
        choice4: "Repeat offenders",
        answer: 3,
        rationale: "Neo-Classical theory allows for reduced responsibility in vulnerable populations."
    },
    {
        question: "Which of the following statements reflects the Neo-Classical view on crime control?",
        choice1: "Only capital punishment is effective",
        choice2: "Rehabilitation is irrelevant",
        choice3: "Punishment should consider individual circumstances",
        choice4: "Crime should be punished equally for everyone",
        answer: 3,
        rationale: "Neo-Classical theory supports justice that adjusts based on personal factors."
    },
    {
        question: "How does the Neo-Classical School improve prediction of criminal behavior?",
        choice1: "By studying economic factors",
        choice2: "By analyzing physiological defects",
        choice3: "By considering the impact of age, mental state, and intent",
        choice4: "By conducting IQ tests",
        answer: 3,
        rationale: "Neo-Classical theorists believe personal factors affect decision-making and can aid prediction."
    },
    {
        question: "Which of these thinkers is associated with the Neo-Classical School?",
        choice1: "Cesare Lombroso",
        choice2: "Rafael Garofalo",
        choice3: "Thomas Hobbes",
        choice4: "Jeremy Bentham",
        answer: 2,
        rationale: "Garofalo advanced Neo-Classical thought by incorporating social and psychological dimensions."
    },
    {
        question: "Who is considered the pioneer of the Biological Positivist School?",
        choice1: "Cesare Beccaria",
        choice2: "Cesare Lombroso",
        choice3: "Gabriel Tarde",
        choice4: "Sigmund Freud",
        answer: 2,
        rationale: "Lombroso introduced the idea that criminals have inherited biological traits."
    },
    {
        question: "According to biological positivism, crime is caused by:",
        choice1: "Social inequality",
        choice2: "Free will",
        choice3: "Physical and genetic abnormalities",
        choice4: "Economic status",
        answer: 3,
        rationale: "Biological positivists argue that inherited or physical defects influence criminality."
    },
    {
        question: "Which of the following best describes how the Biological School aims to predict crime?",
        choice1: "Through facial recognition software",
        choice2: "By analyzing social behavior",
        choice3: "By identifying inherited traits and physical anomalies",
        choice4: "By observing family traditions",
        answer: 3,
        rationale: "Biological theories focus on observable physical or genetic predispositions."
    },
    {
        question: "What is a major criticism of the Biological School’s control mechanism?",
        choice1: "It relies too heavily on religious morals",
        choice2: "It does not consider individual will",
        choice3: "It uses overly harsh punishments",
        choice4: "It leads to discriminatory practices like eugenics",
        answer: 4,
        rationale: "Biological theories have historically led to unethical policies based on heredity."
    },
    {
        question: "Which of the following best describes the Positivist approach to crime?",
        choice1: "Crime is a result of rational calculation",
        choice2: "Crime is determined by internal or external factors beyond the individual’s control",
        choice3: "Crime is a spiritual failure",
        choice4: "Crime is a result of poor decision-making",
        answer: 2,
        rationale: "Positivist criminology sees crime as influenced by forces beyond the person’s control."
    },
    {
        question: "Sigmund Freud contributed to criminology through which concept?",
        choice1: "Atavism",
        choice2: "Free will",
        choice3: "The unconscious mind",
        choice4: "Social contract",
        answer: 3,
        rationale: "Freud believed that unconscious psychological conflicts drive criminal behavior."
    },
    {
        question: "According to the Psychological School, criminal behavior is often a result of:",
        choice1: "Social deprivation",
        choice2: "Inherited physical traits",
        choice3: "Mental illness or personality disorders",
        choice4: "Poor parenting alone",
        answer: 3,
        rationale: "Psychological theories focus on abnormal mental states as causes of crime."
    },
    {
        question: "How can psychological theories predict crime?",
        choice1: "By measuring skull size",
        choice2: "By assessing early childhood behavior and personality traits",
        choice3: "By evaluating family income",
        choice4: "By studying community traditions",
        answer: 2,
        rationale: "Early detection of abnormal behavior can signal future delinquency."
    },
    {
        question: "A key control strategy in the psychological approach is:",
        choice1: "Punitive justice",
        choice2: "Biological testing",
        choice3: "Therapy and behavioral correction",
        choice4: "Mass surveillance",
        answer: 3,
        rationale: "Control mechanisms include psychotherapy, counseling, and behavior modification programs."
    },
    {
        question: "Which of the following best describes the psychological view of crime?",
        choice1: "It is caused by societal pressures",
        choice2: "It is a result of defective mental processes",
        choice3: "It is purely a rational choice",
        choice4: "It is based on ancient biology",
        answer: 2,
        rationale: "Psychological theorists view crime as stemming from dysfunctional thinking or emotional states."
    },
    {
        question: "Who is most associated with the concept of anomie in the sociological explanation of crime?",
        choice1: "Karl Marx",
        choice2: "Sigmund Freud",
        choice3: "Emile Durkheim",
        choice4: "Cesare Beccaria",
        answer: 3,
        rationale: "Durkheim developed the concept of anomie to describe normlessness in society."
    },
    {
        question: "What does the term anomie describe?",
        choice1: "A legal loophole",
        choice2: "A society with shared values",
        choice3: "A breakdown of social norms",
        choice4: "A criminal personality",
        answer: 3,
        rationale: "Anomie refers to instability resulting from a breakdown in cultural norms."
    },
    {
        question: "How does the Sociological School explain crime?",
        choice1: "As a biological defect",
        choice2: "As a failure of individual moral choice",
        choice3: "As a product of social structure and inequality",
        choice4: "As a result of religious decline",
        answer: 3,
        rationale: "Sociological theories view crime as shaped by environmental and systemic factors."
    },
    {
        question: "One way to predict crime sociologically is by:",
        choice1: "Assessing skin color",
        choice2: "Studying economic inequality and urban conditions",
        choice3: "Checking for tattoos",
        choice4: "Testing IQ",
        answer: 2,
        rationale: "Prediction in sociological criminology is based on social factors like poverty and disorganization."
    },
    {
        question: "According to sociologists, crime can be controlled through:",
        choice1: "Capital punishment",
        choice2: "Social reforms and community programs",
        choice3: "Intense surveillance",
        choice4: "Public shaming",
        answer: 2,
        rationale: "Sociological schools promote proactive social change to reduce crime."
    },
    {
        question: "Who is a key figure in the Conflict School of Criminology?",
        choice1: "Emile Durkheim",
        choice2: "Karl Marx",
        choice3: "Gabriel Tarde",
        choice4: "Cesare Lombroso",
        answer: 2,
        rationale: "Karl Marx influenced conflict criminology by emphasizing power dynamics in lawmaking."
    },
    {
        question: "What is the primary explanation for crime according to the Conflict School?",
        choice1: "Biological inferiority",
        choice2: "Unconscious desires",
        choice3: "Social inequality and power struggle",
        choice4: "Personal greed",
        answer: 3,
        rationale: "Conflict theorists believe crime arises from exploitation and class conflict."
    },
    {
        question: "How does the Conflict School propose crime is described?",
        choice1: "As acts of moral failure",
        choice2: "As choices of free will",
        choice3: "As a result of capitalist oppression",
        choice4: "As individual faults",
        answer: 3,
        rationale: "They argue laws reflect the interests of the ruling class, not moral consensus."
    },
    {
        question: "According to radical criminologists, crime is best controlled by:",
        choice1: "Mass incarceration",
        choice2: "Therapy",
        choice3: "Abolishing class-based structures",
        choice4: "Legal reform only",
        answer: 3,
        rationale: "Radical theorists call for systemic social change to eliminate the root causes of crime."
    },
    {
        question: "What is a common predictive focus in Radical criminology?",
        choice1: "Psychological profiles",
        choice2: "Economic class and social conflict",
        choice3: "Genetic makeup",
        choice4: "Law enforcement patterns",
        answer: 2,
        rationale: "They predict crime rates by analyzing inequalities and political repression."
    }
];

















    

const CORRECT_BONUS = 10;
const MAX_QUESTIONS = questions.length;
const Total_Score = 10*MAX_QUESTIONS;

function startGame(){
  questionCounter = 0;
  score = 0;
  //using spread operators to spread the contents of the array as shown in line 52
  availableQuestions = [...questions];
  getNewQuestion();
  startTestTimer();
}
function getNewQuestion(){
  if(availableQuestions.length === 0 || questionCounter > MAX_QUESTIONS){
    //setSCore and transfer to end.html
    localStorage.setItem("mostRecentScore", score);
    localStorage.setItem("Max_Score", Total_Score);
    return window.location.assign("end.html");
  }
  questionCounter++;
  progressText.innerHTML = questionCounter + "/"+ MAX_QUESTIONS;
  //Update the progress bar
  let progress_percent = questionCounter / MAX_QUESTIONS * 100;
  progressbarfull.style.width = progress_percent+"%";
  const questionIndex = Math.floor(Math.random()* availableQuestions.length);
  currentQuestion = availableQuestions[questionIndex];
  question.innerHTML = currentQuestion.question;
  
  choices.forEach(choice => {
    const number = choice.dataset["number"];
    choice.innerHTML = currentQuestion['choice' + number];
  });
  
  availableQuestions.splice(questionIndex,1);
  
  acceptingAnswers = true;
}


const correctRemarks = [
    "Awesome!",
    "Nice!",
    "Great job!",
    "Well done!",
    "Scholar!",
    "Sharp!"
  ];
  
const wrongRemarks = [
    "Come on!",
    "Keep going!",
    "You can do better!",
    "Keep trying!",
    "Do not give up!",
    "Believe!"
  ];
  
function getRandomRemark(remarks){
  const index = Math.floor(Math.random() * remarks.length);
  return remarks[index];
}
  
choices.forEach(choice => {
  choice.addEventListener("click",e => {
    if (!acceptingAnswers) return;
    
    acceptingAnswers = false;
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset["number"];
    const classToApply = selectedAnswer == currentQuestion.answer? "correct": "incorrect";
    
    selectedChoice.parentElement.classList.add(classToApply);
    let remark = "";
    if(classToApply == "correct"){
      score+=10;
      remark = getRandomRemark(correctRemarks);
    }else{
      remark = getRandomRemark(wrongRemarks);
    }
    displayRemark(remark);
    scoretext.innerHTML = score;
    setTimeout(remove_next, 1000);
    function remove_next(){
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }
  });
});

function displayRemark(remark){
  const remarkElement = document.getElementById("remark");
  remarkElement.innerHTML = remark;
  setTimeout(remove, 2000);
  function remove(){
    remarkElement.style.opacity = 0;
  }
}
let durationInMinutes = 27;
let timeInSeconds = durationInMinutes * 60;
const timerDisplay = document.getElementById("timer");

function startTestTimer(){
  const timerInterval = setInterval( () => {
    const minutes = Math.floor(timeInSeconds / 60);
    const seconds = timeInSeconds % 60;
    
    const formattedTime = `${minutes < 10 ? '0' : ''}${minutes}:${seconds < 10 ? '0' : ''}${seconds}`;
    
    timerDisplay.innerHTML = formattedTime;
    
    if(timeInSeconds <= 0){
      clearInterval(timerInterval);
      return window.location.assign("end.html");
    }else{
      timeInSeconds--;
    }
    
  },1000);
}
setTimeout(delay, 2000);
function delay(){
  game.classList.remove("hidden");
  loader.style.display = "none";
  startGame();
}
/*next.addEventListener("click", function(){
  getNewQuestion();
});
*/
