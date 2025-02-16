
window.addEventListener("popstate", function(event){
  history.pushState(null, "", window.location.href);
});

document.addEventListener("keydown", e => {
  if((e.ctrlKey || e.metaKey) &&  e.key.toLowerCase() === 'r'){
    e.preventDefault();
  }
});



const topic = " <br> GNS 211 Exam Simulation";
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
    // Topic 1: Five Reasonable Research Questions
    {
        question: "Which of the following is a characteristic of a good research question?",
        choice1: "It is broad and vague.",
        choice2: "It is specific and measurable.",
        choice3: "It is based on assumptions.",
        choice4: "It avoids any hypothesis.",
        answer: 2,
        rationale: "A good research question should be specific, measurable, and focused to guide the research process effectively."
    },
    {
        question: "What is the primary purpose of a research question?",
        choice1: "To confuse the researcher.",
        choice2: "To provide a clear direction for the study.",
        choice3: "To limit the scope of the study.",
        choice4: "To avoid data collection.",
        answer: 2,
        rationale: "A research question helps define the scope and direction of the study, ensuring the research stays focused."
    },
    {
        question: "Which of the following is an example of a reasonable research question?",
        choice1: "Why is the sky blue?",
        choice2: "What is the impact of social media on teenage mental health?",
        choice3: "How many stars are in the universe?",
        choice4: "What is the meaning of life?",
        answer: 2,
        rationale: "A reasonable research question should be specific, researchable, and relevant to a particular field of study."
    },
    {
        question: "What is the most important factor to consider when formulating a research question?",
        choice1: "The complexity of the question.",
        choice2: "The feasibility of answering the question.",
        choice3: "The popularity of the topic.",
        choice4: "The length of the question.",
        answer: 2,
        rationale: "Feasibility ensures that the research question can be answered within the constraints of time, resources, and data availability."
    },
    {
        question: "Which of the following is NOT a characteristic of a good research question?",
        choice1: "It is clear and concise.",
        choice2: "It is open-ended.",
        choice3: "It is based on personal opinion.",
        choice4: "It is relevant to the field of study.",
        answer: 3,
        rationale: "A good research question should be based on evidence and research, not personal opinion."
    },

    // Topic 2: Sources of Research Topic
    {
        question: "Which of the following is a primary source of research topics?",
        choice1: "Textbooks.",
        choice2: "Academic journals.",
        choice3: "Personal experiences.",
        choice4: "Wikipedia.",
        answer: 3,
        rationale: "Personal experiences can inspire research topics by identifying gaps or problems in real-world situations."
    },
    {
        question: "What is the role of literature review in identifying research topics?",
        choice1: "To copy existing research.",
        choice2: "To identify gaps in existing knowledge.",
        choice3: "To avoid new research.",
        choice4: "To summarize textbooks.",
        answer: 2,
        rationale: "A literature review helps identify gaps in existing knowledge, which can lead to new research questions."
    },
    {
        question: "Which of the following is a secondary source of research topics?",
        choice1: "Interviews.",
        choice2: "Surveys.",
        choice3: "Academic journals.",
        choice4: "Observations.",
        answer: 3,
        rationale: "Academic journals provide existing research and insights that can inspire new research topics."
    },
    {
        question: "Why is it important to consider current trends when selecting a research topic?",
        choice1: "To ensure the topic is outdated.",
        choice2: "To make the research irrelevant.",
        choice3: "To address contemporary issues.",
        choice4: "To avoid practical applications.",
        answer: 3,
        rationale: "Current trends ensure the research topic is relevant and addresses contemporary issues."
    },
    {
        question: "Which of the following is NOT a reliable source for research topics?",
        choice1: "Peer-reviewed articles.",
        choice2: "Social media posts.",
        choice3: "Government reports.",
        choice4: "Conference proceedings.",
        answer: 2,
        rationale: "Social media posts are not peer-reviewed and may lack credibility as a source for research topics."
    },

    // Topic 3: Variables and Types
    {
        question: "What is an independent variable in research?",
        choice1: "The variable that is measured.",
        choice2: "The variable that is manipulated.",
        choice3: "The variable that remains constant.",
        choice4: "The variable that is irrelevant.",
        answer: 2,
        rationale: "The independent variable is the one that is manipulated to observe its effect on the dependent variable."
    },
    {
        question: "Which of the following is an example of a dependent variable?",
        choice1: "The amount of fertilizer used.",
        choice2: "The growth rate of plants.",
        choice3: "The type of soil used.",
        choice4: "The amount of sunlight provided.",
        answer: 2,
        rationale: "The growth rate of plants depends on the independent variables like fertilizer, soil, and sunlight."
    },
    {
        question: "What is a confounding variable?",
        choice1: "A variable that is kept constant.",
        choice2: "A variable that is manipulated.",
        choice3: "A variable that affects the outcome but is not accounted for.",
        choice4: "A variable that is irrelevant to the study.",
        answer: 3,
        rationale: "A confounding variable can distort the results by influencing the dependent variable unintentionally."
    },
    {
        question: "Which of the following is an example of a categorical variable?",
        choice1: "Age.",
        choice2: "Height.",
        choice3: "Gender.",
        choice4: "Weight.",
        answer: 3,
        rationale: "Gender is a categorical variable as it represents distinct categories rather than numerical values."
    },
    {
        question: "What is the difference between a discrete and a continuous variable?",
        choice1: "Discrete variables are measured, while continuous variables are counted.",
        choice2: "Discrete variables are counted, while continuous variables are measured.",
        choice3: "Discrete variables are always categorical.",
        choice4: "Continuous variables are always numerical.",
        answer: 2,
        rationale: "Discrete variables are counted in whole numbers, while continuous variables can take any value within a range."
    },

    // Topic 4: Difference Between Probability and Non-Probability Sampling
    {
        question: "What is the main characteristic of probability sampling?",
        choice1: "It relies on the researcher's judgment.",
        choice2: "Every member of the population has an equal chance of being selected.",
        choice3: "It is less time-consuming.",
        choice4: "It is used in qualitative research.",
        answer: 2,
        rationale: "Probability sampling ensures that every member of the population has an equal chance of being selected, reducing bias."
    },
    {
        question: "Which of the following is an example of probability sampling?",
        choice1: "Convenience sampling.",
        choice2: "Snowball sampling.",
        choice3: "Stratified sampling.",
        choice4: "Purposive sampling.",
        answer: 3,
        rationale: "Stratified sampling is a type of probability sampling where the population is divided into strata, and samples are randomly selected from each stratum."
    },
    {
        question: "What is a disadvantage of non-probability sampling?",
        choice1: "It is more expensive.",
        choice2: "It is less representative of the population.",
        choice3: "It requires a large sample size.",
        choice4: "It is time-consuming.",
        answer: 2,
        rationale: "Non-probability sampling often results in a sample that is not representative of the population, leading to biased results."
    },
    {
        question: "Which of the following is an example of non-probability sampling?",
        choice1: "Simple random sampling.",
        choice2: "Cluster sampling.",
        choice3: "Quota sampling.",
        choice4: "Systematic sampling.",
        answer: 3,
        rationale: "Quota sampling is a non-probability sampling method where the researcher selects participants based on specific characteristics."
    },
    {
        question: "Why is probability sampling preferred in quantitative research?",
        choice1: "It is easier to implement.",
        choice2: "It ensures generalizability of results.",
        choice3: "It requires a smaller sample size.",
        choice4: "It is less expensive.",
        answer: 2,
        rationale: "Probability sampling allows researchers to generalize findings to the broader population with greater confidence."
    },

    // Topic 5: Differentiated Between Qualitative and Quantitative Research Design
    {
        question: "What is the primary focus of qualitative research?",
        choice1: "To test hypotheses.",
        choice2: "To explore and understand phenomena.",
        choice3: "To quantify relationships.",
        choice4: "To use statistical analysis.",
        answer: 2,
        rationale: "Qualitative research focuses on exploring and understanding phenomena through non-numerical data."
    },
    {
        question: "Which of the following is a characteristic of quantitative research?",
        choice1: "It uses open-ended questions.",
        choice2: "It relies on numerical data.",
        choice3: "It is subjective.",
        choice4: "It is exploratory.",
        answer: 2,
        rationale: "Quantitative research relies on numerical data and statistical analysis to draw conclusions."
    },
    {
        question: "What is the main difference between qualitative and quantitative research?",
        choice1: "Qualitative research uses large sample sizes, while quantitative research uses small sample sizes.",
        choice2: "Qualitative research is objective, while quantitative research is subjective.",
        choice3: "Qualitative research explores phenomena, while quantitative research tests hypotheses.",
        choice4: "Qualitative research uses statistical analysis, while quantitative research uses thematic analysis.",
        answer: 3,
        rationale: "Qualitative research is exploratory, while quantitative research is focused on testing hypotheses and quantifying relationships."
    },
    {
        question: "Which of the following is an example of qualitative research?",
        choice1: "A survey with closed-ended questions.",
        choice2: "An experiment with control groups.",
        choice3: "A case study with interviews.",
        choice4: "A statistical analysis of census data.",
        answer: 3,
        rationale: "Case studies with interviews are a common method in qualitative research, as they provide in-depth insights into phenomena."
    },
    {
        question: "What is a limitation of qualitative research?",
        choice1: "It is difficult to generalize findings.",
        choice2: "It requires large sample sizes.",
        choice3: "It is expensive to conduct.",
        choice4: "It relies on numerical data.",
        answer: 1,
        rationale: "Qualitative research often involves small sample sizes, making it difficult to generalize findings to a broader population."
    },

    // Topic 6: Major Philosophical Underpinnings in Criminology
    {
        question: "Which philosophical approach emphasizes free will and rational choice in criminology?",
        choice1: "Positivism.",
        choice2: "Classical theory.",
        choice3: "Social disorganization theory.",
        choice4: "Labeling theory.",
        answer: 2,
        rationale: "Classical theory in criminology emphasizes free will and rational decision-making as the basis for criminal behavior."
    },
    {
        question: "What is the focus of positivist criminology?",
        choice1: "Social factors influencing crime.",
        choice2: "Biological and psychological factors influencing crime.",
        choice3: "Rational decision-making.",
        choice4: "Legal definitions of crime.",
        answer: 2,
        rationale: "Positivist criminology focuses on biological, psychological, and social factors that influence criminal behavior."
    },
    {
        question: "Which theory suggests that crime is a result of societal labeling?",
        choice1: "Strain theory.",
        choice2: "Labeling theory.",
        choice3: "Routine activities theory.",
        choice4: "Control theory.",
        answer: 2,
        rationale: "Labeling theory posits that individuals become criminals because they are labeled as such by society."
    },
    {
        question: "What is the primary focus of critical criminology?",
        choice1: "Individual behavior.",
        choice2: "Social justice and inequality.",
        choice3: "Biological factors.",
        choice4: "Legal definitions of crime.",
        answer: 2,
        rationale: "Critical criminology focuses on social justice, inequality, and the role of power structures in defining and addressing crime."
    },
    {
        question: "Which philosophical approach in criminology emphasizes the role of environmental factors in crime?",
        choice1: "Classical theory.",
        choice2: "Positivism.",
        choice3: "Social disorganization theory.",
        choice4: "Rational choice theory.",
        answer: 3,
        rationale: "Social disorganization theory emphasizes the role of environmental factors, such as neighborhood conditions, in influencing crime rates."
    },

    // Topic 7: Advantages and Disadvantages of Questionnaires
    {
        question: "What is a major advantage of using questionnaires in research?",
        choice1: "They are time-consuming.",
        choice2: "They allow for large sample sizes.",
        choice3: "They are expensive to administer.",
        choice4: "They require face-to-face interaction.",
        answer: 2,
        rationale: "Questionnaires allow researchers to collect data from a large number of participants efficiently."
    },
    {
        question: "What is a disadvantage of using questionnaires?",
        choice1: "They are easy to analyze.",
        choice2: "They may have low response rates.",
        choice3: "They are cost-effective.",
        choice4: "They allow for in-depth responses.",
        answer: 2,
        rationale: "Questionnaires often suffer from low response rates, which can affect the validity of the data."
    },
    {
        question: "Which of the following is an advantage of closed-ended questions in questionnaires?",
        choice1: "They allow for detailed responses.",
        choice2: "They are easy to analyze statistically.",
        choice3: "They encourage creativity.",
        choice4: "They are open to interpretation.",
        answer: 2,
        rationale: "Closed-ended questions provide structured responses that are easy to analyze statistically."
    },
    {
        question: "What is a limitation of open-ended questions in questionnaires?",
        choice1: "They are easy to analyze.",
        choice2: "They limit response options.",
        choice3: "They are time-consuming to analyze.",
        choice4: "They discourage detailed responses.",
        answer: 3,
        rationale: "Open-ended questions require more time and effort to analyze due to the variability in responses."
    },
    {
        question: "Why might questionnaires be unsuitable for sensitive topics?",
        choice1: "They are too expensive.",
        choice2: "Participants may not provide honest answers.",
        choice3: "They are difficult to distribute.",
        choice4: "They require face-to-face interaction.",
        answer: 2,
        rationale: "Participants may be reluctant to provide honest answers on sensitive topics due to fear of judgment or lack of anonymity."
    },
    {
        question: "Which epistemological approach believes that social reality can be studied using the same methods as the natural sciences?",
        choice1: "Positivism",
        choice2: "Interpretivism",
        choice3: "Critical Theory",
        choice4: "Constructivism",
        answer: 1,
        rationale: "Positivism holds that objective knowledge about social reality can be obtained using scientific methods similar to those in the natural sciences."
    },
    {
        question: "Interpretivism primarily seeks to:",
        choice1: "Find universal laws governing society",
        choice2: "Understand the subjective meanings individuals attach to social phenomena",
        choice3: "Criticize and transform society",
        choice4: "Establish absolute truths about human behavior",
        answer: 2,
        rationale: "Interpretivism emphasizes understanding individuals' perspectives and meanings within social contexts rather than discovering universal laws."
    },
    {
        question: "Critical theory challenges traditional social research by:",
        choice1: "Advocating for neutrality in research",
        choice2: "Promoting value-free scientific inquiry",
        choice3: "Exposing power structures and advocating for social change",
        choice4: "Focusing only on numerical data",
        answer: 3,
        rationale: "Critical theory aims to uncover and challenge power imbalances, seeking to transform society through critical analysis."
    },
    {
        question: "Which ontological perspective argues that reality exists independently of human perception?",
        choice1: "Constructivism",
        choice2: "Realism",
        choice3: "Interpretivism",
        choice4: "Postmodernism",
        answer: 2,
        rationale: "Realism asserts that an objective reality exists regardless of human beliefs or perceptions."
    },
    {
        question: "Constructivists believe that:",
        choice1: "Social reality is objectively measurable",
        choice2: "Reality is socially constructed through human interactions",
        choice3: "Truth is absolute and universal",
        choice4: "Science is the only way to understand social phenomena",
        answer: 2,
        rationale: "Constructivism argues that knowledge and social reality are shaped by human interactions and cultural contexts."
    },
    {
        question: "Which of the following best describes the positivist approach to research?",
        choice1: "Emphasizing subjectivity and personal experiences",
        choice2: "Using rigorous scientific methods to uncover objective truths",
        choice3: "Rejecting empirical data in favor of critical reflection",
        choice4: "Believing reality is only a human construct",
        answer: 2,
        rationale: "Positivism relies on empirical data and scientific methods to discover objective truths about social phenomena."
    },
    {
        question: "A researcher using an interpretivist approach is most likely to:",
        choice1: "Conduct statistical surveys",
        choice2: "Use in-depth interviews and ethnography",
        choice3: "Avoid studying human behavior",
        choice4: "Ignore cultural and social influences",
        answer: 2,
        rationale: "Interpretivist research methods focus on qualitative techniques like interviews to understand individual experiences and meanings."
    },
    {
        question: "Which epistemological approach aligns with Marxist perspectives on social change?",
        choice1: "Positivism",
        choice2: "Interpretivism",
        choice3: "Critical Theory",
        choice4: "Realism",
        answer: 3,
        rationale: "Critical theory, influenced by Marxist thought, critiques societal structures and advocates for transformative social change."
    },
    {
        question: "How does realism differ from constructivism?",
        choice1: "Realism sees reality as independent, while constructivism sees it as socially constructed",
        choice2: "Both believe reality is a human construct",
        choice3: "Constructivism emphasizes objective facts, while realism emphasizes subjectivity",
        choice4: "Realism rejects the existence of a social world",
        answer: 1,
        rationale: "Realism asserts an independent reality, whereas constructivism holds that reality is shaped by social and cultural processes."
    },
    {
        question: "Which research approach aligns most closely with constructivism?",
        choice1: "Experimental research",
        choice2: "Qualitative research",
        choice3: "Survey-based research",
        choice4: "Mathematical modeling",
        answer: 2,
        rationale: "Constructivism supports qualitative research methods that explore how individuals and groups create meaning in society."
    },

    // Understanding Sampling Methods
    {
        question: "What is the primary purpose of sampling in research?",
        choice1: "To study an entire population",
        choice2: "To gather data from a subset that represents the whole population",
        choice3: "To ensure all individuals participate in a study",
        choice4: "To eliminate variability in research",
        answer: 2,
        rationale: "Sampling allows researchers to study a subset of a population to make generalizable conclusions about the whole."
    },
    {
        question: "Which sampling method gives every member of a population an equal chance of being selected?",
        choice1: "Convenience sampling",
        choice2: "Snowball sampling",
        choice3: "Simple random sampling",
        choice4: "Purposive sampling",
        answer: 3,
        rationale: "Simple random sampling ensures that each member of a population has an equal probability of selection, reducing bias."
    },
    {
        question: "Which sampling technique involves selecting participants based on ease of access?",
        choice1: "Stratified sampling",
        choice2: "Random sampling",
        choice3: "Convenience sampling",
        choice4: "Cluster sampling",
        answer: 3,
        rationale: "Convenience sampling selects participants based on availability and accessibility, but it may introduce bias."
    },
    {
        question: "When is stratified sampling most useful?",
        choice1: "When the population is homogenous",
        choice2: "When the population has distinct subgroups that need representation",
        choice3: "When studying an entire population is possible",
        choice4: "When random selection is unnecessary",
        answer: 2,
        rationale: "Stratified sampling ensures representation of different subgroups within a population by dividing it into strata before sampling."
    },
    {
        question: "A researcher studying a hidden population, such as drug users, is most likely to use:",
        choice1: "Cluster sampling",
        choice2: "Snowball sampling",
        choice3: "Systematic sampling",
        choice4: "Simple random sampling",
        answer: 2,
        rationale: "Snowball sampling is effective for studying hard-to-reach populations by using existing participants to recruit others."
    },
    {
        question: "Which sampling method divides the population into groups and then randomly selects entire groups for study?",
        choice1: "Systematic sampling",
        choice2: "Cluster sampling",
        choice3: "Purposive sampling",
        choice4: "Quota sampling",
        answer: 2,
        rationale: "Cluster sampling selects entire groups randomly instead of individual members, making it useful for large and geographically dispersed populations."
    },
    {
        question: "Which of the following is a probability sampling method?",
        choice1: "Purposive sampling",
        choice2: "Convenience sampling",
        choice3: "Quota sampling",
        choice4: "Systematic sampling",
        answer: 4,
        rationale: "Systematic sampling is a probability sampling method where every nth element in a population is selected, ensuring some level of randomness."
    },
    {
        question: "What is the main advantage of probability sampling?",
        choice1: "It allows for non-random participant selection",
        choice2: "It increases the representativeness of the sample",
        choice3: "It requires no statistical knowledge",
        choice4: "It guarantees 100% accuracy",
        answer: 2,
        rationale: "Probability sampling increases the likelihood of obtaining a representative sample, making generalization to the population more valid."
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
