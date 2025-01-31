
window.addEventListener("popstate", function(event){
  history.pushState(null, "", window.location.href);
});

document.addEventListener("keydown", e => {
  if((e.ctrlKey || e.metaKey) &&  e.key.toLowerCase() === 'r'){
    e.preventDefault();
  }
});



const topic = "ISL: <br> Exam Simulation";
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
        question: "Which of the following is NOT a Hudud offence in Islamic law?",
        choice1: "Theft (Sariqa)",
        choice2: "False accusation of adultery (Qadhf)",
        choice3: "Negligence in financial contracts",
        choice4: "Apostasy (Riddah)",
        answer: 3,
        rationale: "Hudud crimes are fixed punishable offenses under Shariah. Negligence in financial contracts falls under civil liability, not Hudud."
    },
    {
        question: "What are the conditions for a theft (Sariqa) offense to warrant Hudud punishment?",
        choice1: "The stolen item must be valuable and taken secretly",
        choice2: "The thief must confess or be witnessed by two male Muslims",
        choice3: "The stolen item must be kept in a secure place",
        choice4: "All of the above",
        answer: 4,
        rationale: "Islamic law requires strict conditions for applying Hudud punishments. Theft must meet criteria such as item value, security, and valid witness testimony."
    },
    {
        question: "A man is caught stealing a loaf of bread from a public market. Does this qualify for Hudud punishment?",
        choice1: "Yes, amputation must be applied",
        choice2: "No, because it is a minor theft",
        choice3: "No, because Hudud does not apply when a person steals out of necessity",
        choice4: "Yes, but only if the stolen item is returned",
        answer: 3,
        rationale: "Necessity (such as hunger) can exempt a person from Hudud punishment under Islamic law."
    },
    {
        question: "How many male witnesses are required to prove an adultery (Zina) case in a Hudud court?",
        choice1: "Two",
        choice2: "Three",
        choice3: "Four",
        choice4: "One is enough",
        answer: 3,
        rationale: "Four upright male Muslim witnesses must testify to having seen the act explicitly."
    },
    {
        question: "A woman confesses to committing adultery but later withdraws her confession. What happens under Islamic law?",
        choice1: "She is still punished because of her first confession",
        choice2: "She must swear an oath to prove innocence",
        choice3: "The punishment is dropped because withdrawal of confession is allowed",
        choice4: "She must bring four witnesses to prove innocence",
        answer: 3,
        rationale: "Confession must be voluntary and repeated four times; withdrawal before execution cancels the Hudud punishment."
    },
    {
        question: "Which of the following is an acceptable proof for adultery in Hudud?",
        choice1: "DNA evidence",
        choice2: "Video footage",
        choice3: "Four male eyewitnesses or a confession",
        choice4: "Polygraph test",
        answer: 3,
        rationale: "Islamic law requires strict evidence; modern technology does not replace the need for human testimony in Hudud cases."
    },
    {
        question: "What is the punishment for false accusation of adultery (Qadhf)?",
        choice1: "Death penalty",
        choice2: "80 lashes",
        choice3: "Imprisonment for life",
        choice4: "A fine and public apology",
        answer: 2,
        rationale: "If an accuser fails to provide four male eyewitnesses, they receive 80 lashes."
    },
    {
        question: "What is the punishment for drinking alcohol (Shurb al-Khamr) under Hudud?",
        choice1: "40–80 lashes",
        choice2: "Death penalty",
        choice3: "Community service",
        choice4: "10 years imprisonment",
        answer: 1,
        rationale: "Classical Islamic law prescribes flogging, though the exact number varies based on the ruler’s discretion."
    },
    {
        question: "In a case of highway robbery (Hirabah), what determines whether the offender receives the death penalty?",
        choice1: "If they caused death or severe harm during the robbery",
        choice2: "If they stole a large sum of money",
        choice3: "If they committed the crime alone",
        choice4: "If they plead guilty in court",
        answer: 1,
        rationale: "Highway robbery punishments vary: execution applies if murder was involved."
    },
    {
        question: "A Muslim renounces Islam publicly. What punishment does classical Islamic law prescribe for apostasy (Riddah)?",
        choice1: "No punishment",
        choice2: "Death penalty after a grace period for repentance",
        choice3: "Imprisonment for life",
        choice4: "Public flogging",
        answer: 2,
        rationale: "Traditional Islamic jurisprudence prescribes death after a chance to repent, though modern interpretations vary."
    },
    {
        question: "What is the main difference between Hudud and Ta’zir offences?",
        choice1: "Hudud punishments are fixed, while Ta'zir punishments are discretionary",
        choice2: "Ta'zir offenses are only related to financial matters",
        choice3: "Hudud can be forgiven by the victim, while Ta’zir cannot",
        choice4: "Only Ta’zir offenses are punishable by death",
        answer: 1,
        rationale: "Hudud punishments are predetermined, while Ta'zir allows judicial discretion."
    },
    {
        question: "Which of the following is a Ta’zir crime?",
        choice1: "Murder",
        choice2: "Slander without proof",
        choice3: "Bribery",
        choice4: "Both B and C",
        answer: 4,
        rationale: "Slander and bribery are not fixed Hudud crimes, so they fall under Ta'zir."
    },
    {
        question: "A man is caught spreading false rumors about another person. What punishment can a judge impose?",
        choice1: "Death penalty",
        choice2: "Imprisonment, flogging, or a fine, depending on the judge’s decision",
        choice3: "Nothing, because it is not a crime",
        choice4: "Public apology only",
        answer: 2,
        rationale: "Ta'zir crimes allow for flexible sentencing depending on the harm caused."
    },
    {
        question: "A business owner engages in price-fixing and fraud. What type of punishment applies?",
        choice1: "Amputation of hand",
        choice2: "Ta’zir punishment such as fines, imprisonment, or community service",
        choice3: "80 lashes",
        choice4: "Execution",
        answer: 2,
        rationale: "Financial misconduct falls under Ta’zir, allowing for judge-determined penalties."
    },
    {
        question: "If a person is caught spying against the state, what type of punishment applies?",
        choice1: "Hudud",
        choice2: "Ta'zir",
        choice3: "Qisas",
        choice4: "Diyah",
        answer: 2,
        rationale: "Spying is not a fixed Hudud crime, so it falls under Ta’zir."
    },
    {
        question: "The ruler or judge has the right to determine Ta’zir punishments based on what?",
        choice1: "Personal bias",
        choice2: "Circumstances of the crime, intent, and harm caused",
        choice3: "Strict interpretation of Hudud laws",
        choice4: "Public opinion",
        answer: 2,
        rationale: "Islamic judges assess factors such as intent and harm when determining Ta’zir punishments."
    },
    {
        question: "Can Ta’zir punishments include exile?",
        choice1: "Yes",
        choice2: "No",
        answer: 1,
        rationale: "Exile is a discretionary punishment under Ta’zir."
    },
    {
        question: "Can a Ta’zir offender be pardoned?",
        choice1: "Yes, by the judge",
        choice2: "No, only Hudud offenses can be pardoned",
        answer: 1,
        rationale: "Ta’zir punishments can be modified or pardoned by the judge."
    },
    {
        question: "What is the maximum number of lashes for a Ta’zir punishment?",
        choice1: "100",
        choice2: "40",
        choice3: "There is no fixed number",
        answer: 3,
        rationale: "Unlike Hudud, Ta'zir allows for judicial discretion on punishment severity."
    },
    {
        question: "What is the primary source of Islamic law?",
        choice1: "Qur'an and Hadith",
        choice2: "Sunna and Ijma",
        choice3: "Qiyas and Ijtihad",
        choice4: "Fiqh and Shariah",
        answer: 1,
        rationale: "Islamic law is primarily derived from the Qur'an and Hadith, which are the fundamental religious texts of Islam."
    },
    {
        question: "What is the purpose of punishment in Islam?",
        choice1: "To inflict harm on the offender",
        choice2: "To deter others from committing similar offenses",
        choice3: "To reform the offender and maintain social order",
        choice4: "To exact revenge on the offender",
        answer: 3,
        rationale: "Punishment in Islam aims at reformation and maintaining social harmony rather than mere retaliation."
    },
    {
        question: "What is the definition of crime in Islam?",
        choice1: "An act that harms another person or property",
        choice2: "An act that goes against the commands of Allah",
        choice3: "An act that is prohibited by the Shariah",
        choice4: "An act that is punishable by the state",
        answer: 3,
        rationale: "Crime in Islam is defined as any act prohibited by Shariah, which governs moral and legal conduct."
    },
    {
        question: "What is the primary object of punishment in Islam?",
        choice1: "To punish the offender",
        choice2: "To deter others from committing similar offenses",
        choice3: "To reform the offender and maintain social order",
        choice4: "To exact revenge on the offender",
        answer: 3,
        rationale: "The goal of punishment in Islam is to rehabilitate offenders and preserve societal harmony."
    },
    {
        question: "What is the definition of tort in Islam?",
        choice1: "A civil wrong that causes harm to another person or property",
        choice2: "A criminal offense that is punishable by the state",
        choice3: "A moral wrong that goes against the commands of Allah",
        choice4: "A breach of contract that causes harm to another person",
        answer: 1,
        rationale: "In Islamic law, torts refer to civil wrongs that result in harm to individuals or property."
    },
    {
        question: "What is the punishment for theft in Islam?",
        choice1: "Amputation of the hand",
        choice2: "Imprisonment for a period of time",
        choice3: "Payment of a fine",
        choice4: "Flogging",
        answer: 1,
        rationale: "According to Islamic law, theft is a Hudud offense punishable by amputation under specific conditions."
    },
    {
        question: "What is the main difference between tort and crime in Islam?",
        choice1: "Tort is a civil wrong, while crime is a criminal offense",
        choice2: "Tort is punishable by the state, while crime is not",
        choice3: "Tort is a moral wrong, while crime is not",
        choice4: "Tort is a breach of contract, while crime is not",
        answer: 1,
        rationale: "Torts in Islam concern private rights and compensation, while crimes involve offenses against the state or religion."
    },
    {
        question: "What is the condition for liability in tort in Islam?",
        choice1: "Intent to harm",
        choice2: "Negligence",
        choice3: "Causation",
        choice4: "All of the above",
        answer: 4,
        rationale: "Islamic tort liability may arise from intentional harm, negligence, or causation leading to damage."
    },
    {
        question: "What is the burden of proof in Islamic law?",
        choice1: "The plaintiff must prove their case beyond a reasonable doubt",
        choice2: "The defendant must prove their innocence beyond a reasonable doubt",
        choice3: "The plaintiff must prove their case by a preponderance of the evidence",
        choice4: "The defendant must prove their innocence by a preponderance of the evidence",
        answer: 1,
        rationale: "In Islamic law, the plaintiff bears the burden of proof, and guilt must be established beyond a reasonable doubt."
    },
    {
        question: "What is the punishment for murder in Islam?",
        choice1: "Death penalty",
        choice2: "Imprisonment for life",
        choice3: "Payment of diyah (blood money)",
        choice4: "All of the above",
        answer: 4,
        rationale: "Islamic law prescribes various penalties for murder, including capital punishment, imprisonment, or blood money, depending on circumstances."
    },
    {
        question: "What is the purpose of the concept of 'maqasid al-shariah' in Islamic law?",
        choice1: "To punish offenders",
        choice2: "To protect the rights of victims",
        choice3: "To promote the public interest",
        choice4: "To achieve the objectives of the Shariah",
        answer: 4,
        rationale: "'Maqasid al-shariah' refers to the higher objectives of Shariah, which include justice, public welfare, and moral integrity."
    },
    {
        question: "What is the concept of 'tawbah' in Islamic law?",
        choice1: "Repentance",
        choice2: "Punishment",
        choice3: "Reward",
        choice4: "Forgiveness",
        answer: 1,
        rationale: "'Tawbah' is the Islamic principle of repentance, allowing individuals to seek forgiveness for sins through sincere remorse and reform."
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
let durationInMinutes = 15;
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
