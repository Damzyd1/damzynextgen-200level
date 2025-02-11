

window.addEventListener("popstate", function(event){
  history.pushState(null, "", window.location.href);
});

/*const question = document.getElementById("question");
const choices = Array.from(document.getElementsByClassName("choice-text"));
const progressText = document.getElementById("progressText");
const scoretext = document.getElementById("score");
const progressbarfull = document.getElementById("progressbarfull");
const loader = document.getElementById("loader");
const game = document.getElementById("game");
let currentQuestion = {};
let questionNo;
let acceptingAnswers = false;
let score = 0;
let questionCounter = 0;
let availableQuestion = [];
*/
 let questions = [
    {
        question: "Which of the following is a common form of examination dishonesty?",
        choice1: "Taking notes in class",
        choice2: "Copying another student's answers",
        choice3: "Asking for clarification from an instructor",
        choice4: "Using official study materials",
        answer: "Copying another student's answers",
        rationale: "Copying another student’s answers during an exam is a clear violation of academic integrity policies."
    },
    {
        question: "A student who brings unauthorized materials into an examination hall is committing which form of academic dishonesty?",
        choice1: "Plagiarism",
        choice2: "Fabrication",
        choice3: "Cheating",
        choice4: "Collusion",
        answer: "Cheating",
        rationale: "Bringing unauthorized materials is a direct form of cheating, which violates examination policies."
    },
    {
        question: "Which of the following best describes collusion in the context of examination dishonesty?",
        choice1: "Working together on an assignment without permission",
        choice2: "Using a calculator during a math test",
        choice3: "Memorizing key concepts before an exam",
        choice4: "Citing sources in an essay",
        answer: "Working together on an assignment without permission",
        rationale: "Collusion involves unauthorized collaboration between students, which undermines academic integrity."
    },
    {
        question: "What is the primary psychological impact of being caught in an act of examination dishonesty?",
        choice1: "Increased motivation",
        choice2: "Enhanced credibility",
        choice3: "Loss of trust and potential disciplinary actions",
        choice4: "Recognition for creativity",
        answer: "Loss of trust and potential disciplinary actions",
        rationale: "Being caught can lead to academic penalties, loss of trust, and potential long-term consequences."
    },
    {
        question: "Which of the following strategies helps prevent examination dishonesty?",
        choice1: "Allowing students to exchange answers",
        choice2: "Creating multiple versions of the exam",
        choice3: "Encouraging students to cheat discreetly",
        choice4: "Giving the same exam every year",
        answer: "Creating multiple versions of the exam",
        rationale: "Having multiple exam versions minimizes opportunities for students to share answers."
    },
    {
        question: "Grief is best defined as:",
        choice1: "A temporary feeling of sadness",
        choice2: "A complex emotional response to loss",
        choice3: "A form of academic dishonesty",
        choice4: "A simple stress reaction",
        answer: "A complex emotional response to loss",
        rationale: "Grief is a deep emotional reaction to loss that affects individuals in different ways."
    },
    {
        question: "Which of the following is NOT a common stage of grief according to Kübler-Ross?",
        choice1: "Denial",
        choice2: "Bargaining",
        choice3: "Celebration",
        choice4: "Acceptance",
        answer: "Celebration",
        rationale: "The Kübler-Ross model includes denial, anger, bargaining, depression, and acceptance, but not celebration."
    },
    {
        question: "Strategic communication in grief counseling primarily aims to:",
        choice1: "Manipulate the emotions of the bereaved",
        choice2: "Provide structured and empathetic guidance",
        choice3: "Convince the grieving person to move on quickly",
        choice4: "Ignore the emotions of the affected person",
        answer: "Provide structured and empathetic guidance",
        rationale: "Strategic communication ensures effective, empathetic, and supportive dialogue with grieving individuals."
    },
    {
        question: "Which of the following is a strategic communication technique for supporting someone experiencing grief?",
        choice1: "Offering quick solutions",
        choice2: "Encouraging open expression of emotions",
        choice3: "Telling them to move on",
        choice4: "Ignoring their grief",
        answer: "Encouraging open expression of emotions",
        rationale: "Encouraging open emotional expression helps the grieving process and provides comfort."
    },
    {
        question: "What is the primary role of active listening in grief communication?",
        choice1: "To prepare a response",
        choice2: "To analyze the person’s emotions",
        choice3: "To create a supportive and understanding environment",
        choice4: "To correct the person's feelings",
        answer: "To create a supportive and understanding environment",
        rationale: "Active listening helps grieving individuals feel heard and supported."
    },
    {
        question: "Strategic communication during conflict resolution aims to:",
        choice1: "Suppress opposing views",
        choice2: "Achieve mutual understanding",
        choice3: "Encourage hostility",
        choice4: "Avoid discussions",
        answer: "Achieve mutual understanding",
        rationale: "Effective strategic communication fosters dialogue and mutual understanding in conflicts."
    },
    {
        question: "Which of the following is a key principle of strategic communication?",
        choice1: "Using aggressive language",
        choice2: "Ignoring the other party’s concerns",
        choice3: "Tailoring messages to the audience",
        choice4: "Avoiding communication altogether",
        answer: "Tailoring messages to the audience",
        rationale: "Strategic communication involves adapting messages to suit the audience for maximum effectiveness."
    },
    {
        question: "In conflict resolution, dialogue is most effective when:",
        choice1: "Only one party speaks",
        choice2: "Both parties listen and engage actively",
        choice3: "Personal attacks are used",
        choice4: "The conflict is ignored",
        answer: "Both parties listen and engage actively",
        rationale: "Dialogue requires both sides to listen and engage constructively for successful resolution."
    },
    {
        question: "What is the primary function of dialogue in resolving conflicts?",
        choice1: "To establish dominance over the other party",
        choice2: "To clarify misunderstandings and build consensus",
        choice3: "To create further divisions",
        choice4: "To delay resolution",
        answer: "To clarify misunderstandings and build consensus",
        rationale: "Dialogue helps clarify issues and build common ground for conflict resolution."
    },
    {
        question: "Why is emotional intelligence important in conflict resolution dialogue?",
        choice1: "It helps in ignoring the other person's emotions",
        choice2: "It ensures manipulation of the other party",
        choice3: "It allows individuals to manage emotions and communicate effectively",
        choice4: "It encourages aggressive responses",
        answer: "It allows individuals to manage emotions and communicate effectively",
        rationale: "Emotional intelligence helps manage emotions and facilitates better communication in conflicts."
    },
    {
        question: "A barrier to productive dialogue in conflict resolution is:",
        choice1: "Mutual respect",
        choice2: "Listening actively",
        choice3: "Refusal to acknowledge the other party’s perspective",
        choice4: "Open-mindedness",
        answer: "Refusal to acknowledge the other party’s perspective",
        rationale: "Refusing to acknowledge different perspectives hinders constructive dialogue and resolution."
    },
    {
        question: "Which communication approach is most effective in conflict resolution?",
        choice1: "Confrontational and defensive",
        choice2: "Passive and dismissive",
        choice3: "Open and collaborative",
        choice4: "Silent and avoidant",
        answer: "Open and collaborative",
        rationale: "An open and collaborative approach fosters resolution and mutual understanding."
    },
    {
        question: "What is the main disadvantage of avoiding dialogue in conflict resolution?",
        choice1: "It delays resolution and may escalate the issue",
        choice2: "It leads to immediate resolution",
        choice3: "It makes both parties happier",
        choice4: "It removes all forms of disagreement",
        answer: "It delays resolution and may escalate the issue",
        rationale: "Avoiding dialogue can worsen conflicts by leaving issues unresolved."
    },
    {
        question: "Which of the following is a technique used to promote productive dialogue in conflict resolution?",
        choice1: "Blaming the other party",
        choice2: "Using 'I' statements to express concerns",
        choice3: "Raising one's voice to assert dominance",
        choice4: "Ignoring the concerns of the other party",
        answer: "Using 'I' statements to express concerns",
        rationale: "'I' statements express concerns without blaming others, making dialogue more productive."
    },
    {
        question: "What is the role of mediation in conflict resolution dialogue?",
        choice1: "To escalate the conflict",
        choice2: "To act as an unbiased facilitator for resolution",
        choice3: "To force one party to surrender",
        choice4: "To avoid discussing the issue",
        answer: "To act as an unbiased facilitator for resolution",
        rationale: "Mediators help facilitate fair dialogue and guide conflicting parties toward resolution."
    },
    {
        question: "What is a pluralistic society?",
        choice1: "A society with a single dominant culture",
        choice2: "A society with multiple cultural groups coexisting",
        choice3: "A society with no cultural diversity",
        choice4: "A society with no government",
        answer: "A society with multiple cultural groups coexisting",
        rationale: "A pluralistic society is characterized by the coexistence of multiple cultural groups, each maintaining its unique identity."
    },
    {
        question: "Which of the following is a major challenge in a pluralistic society like Nigeria?",
        choice1: "Cultural assimilation",
        choice2: "Ethnic and religious conflicts",
        choice3: "Lack of natural resources",
        choice4: "Overpopulation",
        answer: "Ethnic and religious conflicts",
        rationale: "Ethnic and religious conflicts are significant challenges in pluralistic societies due to the diversity of cultural and religious groups."
    },
    {
        question: "What is the role of education in a pluralistic society?",
        choice1: "To promote a single culture",
        choice2: "To foster understanding and tolerance among diverse groups",
        choice3: "To eliminate cultural diversity",
        choice4: "To enforce religious beliefs",
        answer: "To foster understanding and tolerance among diverse groups",
        rationale: "Education plays a crucial role in fostering understanding and tolerance among diverse cultural and religious groups in a pluralistic society."
    },

    // MODULE 2: AGEING IN NIGERIA: ISSUES, CHALLENGES, AND PROSPECTS
    {
        question: "What is the primary challenge faced by the elderly in Nigeria?",
        choice1: "Lack of access to healthcare",
        choice2: "Excessive government support",
        choice3: "Overpopulation",
        choice4: "High employment rates",
        answer: "Lack of access to healthcare",
        rationale: "The elderly in Nigeria often face challenges related to inadequate access to healthcare services."
    },
    {
        question: "Which of the following is a prospect for improving the lives of the elderly in Nigeria?",
        choice1: "Increased social security benefits",
        choice2: "Reduced healthcare facilities",
        choice3: "Higher retirement age",
        choice4: "Decreased family support",
        answer: "Increased social security benefits",
        rationale: "Increased social security benefits can significantly improve the quality of life for the elderly by providing financial stability."
    },
    {
        question: "What is a common issue faced by ageing populations in Nigeria?",
        choice1: "Lack of family support",
        choice2: "Excessive government pensions",
        choice3: "High employment rates",
        choice4: "Overpopulation",
        answer: "Lack of family support",
        rationale: "Many elderly individuals in Nigeria face a lack of family support, which can lead to social and economic challenges."
    },

    // CAUSES AND EFFECTS OF RELIGIOUS VIOLENCE IN NIGERIA
    {
        question: "What is a primary cause of religious violence in Nigeria?",
        choice1: "Economic inequality",
        choice2: "Political stability",
        choice3: "Religious tolerance",
        choice4: "Cultural assimilation",
        answer: "Economic inequality",
        rationale: "Economic inequality often exacerbates tensions between religious groups, leading to violence."
    },
    {
        question: "Which of the following is an effect of religious violence in Nigeria?",
        choice1: "Increased social cohesion",
        choice2: "Displacement of communities",
        choice3: "Economic growth",
        choice4: "Political stability",
        answer: "Displacement of communities",
        rationale: "Religious violence often results in the displacement of communities, leading to humanitarian crises."
    },
    {
        question: "How can religious violence in Nigeria be mitigated?",
        choice1: "By promoting interfaith dialogue",
        choice2: "By increasing economic inequality",
        choice3: "By enforcing a single religion",
        choice4: "By reducing education opportunities",
        answer: "By promoting interfaith dialogue",
        rationale: "Promoting interfaith dialogue can help reduce tensions and foster understanding between different religious groups."
    },

    // Grief and strategic communication
    {
        question: "What is the primary goal of strategic communication in the context of grief?",
        choice1: "To suppress emotions",
        choice2: "To provide support and facilitate healing",
        choice3: "To increase economic growth",
        choice4: "To enforce political agendas",
        answer: "To provide support and facilitate healing",
        rationale: "Strategic communication in the context of grief aims to provide support and facilitate healing for those affected."
    },
    {
        question: "Which of the following is a key component of effective grief communication?",
        choice1: "Avoiding the topic of loss",
        choice2: "Providing empathetic and clear information",
        choice3: "Focusing solely on economic issues",
        choice4: "Enforcing religious beliefs",
        answer: "Providing empathetic and clear information",
        rationale: "Effective grief communication involves providing empathetic and clear information to help individuals cope with loss."
    },
    {
        question: "How can strategic communication help in managing public grief?",
        choice1: "By ignoring the public's emotions",
        choice2: "By providing timely and accurate information",
        choice3: "By increasing economic inequality",
        choice4: "By enforcing political stability",
        answer: "By providing timely and accurate information",
        rationale: "Strategic communication can help manage public grief by providing timely and accurate information, which helps in building trust and reducing anxiety."
    },

    // ISSUES IN FUNDAMENTAL HUMAN RIGHTS
    {
        question: "What is a fundamental human right?",
        choice1: "The right to own property",
        choice2: "The right to freedom of speech",
        choice3: "The right to discriminate",
        choice4: "The right to violate others' rights",
        answer: "The right to freedom of speech",
        rationale: "Freedom of speech is a fundamental human right that allows individuals to express their opinions without fear of repression."
    },
    {
        question: "Which of the following is a violation of human rights?",
        choice1: "Providing access to education",
        choice2: "Arbitrary arrest and detention",
        choice3: "Ensuring freedom of religion",
        choice4: "Promoting gender equality",
        answer: "Arbitrary arrest and detention",
        rationale: "Arbitrary arrest and detention are clear violations of human rights as they deprive individuals of their liberty without due process."
    },
    {
        question: "How can human rights be protected in a society?",
        choice1: "By enforcing strict laws",
        choice2: "By promoting awareness and education",
        choice3: "By limiting freedom of speech",
        choice4: "By increasing economic inequality",
        answer: "By promoting awareness and education",
        rationale: "Promoting awareness and education about human rights is essential for their protection and enforcement in society."
    },

    // NIGERIAN LEGAL SYSTEM; CONCEPT OF JUSTICE AND RULE OF LAW
    {
        question: "What is the rule of law?",
        choice1: "The principle that all people are subject to the law",
        choice2: "The idea that laws can be ignored by the government",
        choice3: "The concept that only certain individuals are above the law",
        choice4: "The principle that laws are unnecessary",
        answer: "The principle that all people are subject to the law",
        rationale: "The rule of law is the principle that all individuals, including government officials, are subject to the law and must abide by it."
    },
    {
        question: "Which of the following is a key component of the Nigerian legal system?",
        choice1: "Judicial independence",
        choice2: "Arbitrary enforcement of laws",
        choice3: "Lack of legal representation",
        choice4: "Discrimination in legal processes",
        answer: "Judicial independence",
        rationale: "Judicial independence is a crucial component of the Nigerian legal system, ensuring that the judiciary operates without external influence."
    },
    {
        question: "What is the concept of justice in the Nigerian legal system?",
        choice1: "Favoring the wealthy",
        choice2: "Ensuring fairness and equality before the law",
        choice3: "Discriminating against certain groups",
        choice4: "Ignoring human rights",
        answer: "Ensuring fairness and equality before the law",
        rationale: "The concept of justice in the Nigerian legal system revolves around ensuring fairness and equality before the law for all individuals."
    },

    // Concept of examination dishonesty: before, during, after exams.(and their forms)
    {
        question: "What is examination dishonesty?",
        choice1: "Following exam rules strictly",
        choice2: "Engaging in unethical practices to gain an advantage in exams",
        choice3: "Preparing adequately for exams",
        choice4: "Seeking help from teachers",
        answer: "Engaging in unethical practices to gain an advantage in exams",
        rationale: "Examination dishonesty involves engaging in unethical practices such as cheating or plagiarism to gain an unfair advantage in exams."
    },
    {
        question: "Which of the following is a form of examination dishonesty?",
        choice1: "Studying hard for exams",
        choice2: "Using unauthorized materials during exams",
        choice3: "Following exam instructions",
        choice4: "Seeking clarification from teachers",
        answer: "Using unauthorized materials during exams",
        rationale: "Using unauthorized materials during exams is a common form of examination dishonesty."
    },
    {
        question: "How can examination dishonesty be prevented?",
        choice1: "By promoting a culture of integrity",
        choice2: "By encouraging cheating",
        choice3: "By reducing exam supervision",
        choice4: "By ignoring unethical practices",
        answer: "By promoting a culture of integrity",
        rationale: "Promoting a culture of integrity and ethical behavior is essential in preventing examination dishonesty."
    },

    // The Concept of Religion, Ethnicity, Politics and Development
    {
        question: "How does religion influence development in Nigeria?",
        choice1: "By promoting unity and social cohesion",
        choice2: "By causing conflicts and divisions",
        choice3: "By reducing economic growth",
        choice4: "By enforcing political instability",
        answer: "By promoting unity and social cohesion",
        rationale: "Religion can promote unity and social cohesion, which are essential for development, but it can also cause conflicts if not managed properly."
    },
    {
        question: "What is the role of ethnicity in Nigerian politics?",
        choice1: "It has no influence on politics",
        choice2: "It often leads to political polarization and conflicts",
        choice3: "It promotes economic growth",
        choice4: "It ensures political stability",
        answer: "It often leads to political polarization and conflicts",
        rationale: "Ethnicity often plays a significant role in Nigerian politics, leading to polarization and conflicts due to competing interests."
    },
    {
        question: "How can politics influence development in Nigeria?",
        choice1: "By promoting good governance and policies",
        choice2: "By encouraging corruption",
        choice3: "By reducing access to education",
        choice4: "By enforcing ethnic divisions",
        answer: "By promoting good governance and policies",
        rationale: "Politics can significantly influence development by promoting good governance and implementing policies that foster economic and social growth."
    },

    // THE ROLE OF DIALOGUE IN CONFLICT RESOLUTION
    {
        question: "What is the primary role of dialogue in conflict resolution?",
        choice1: "To escalate conflicts",
        choice2: "To facilitate understanding and agreement between parties",
        choice3: "To enforce one party's will",
        choice4: "To ignore the issues",
        answer: "To facilitate understanding and agreement between parties",
        rationale: "Dialogue plays a crucial role in conflict resolution by facilitating understanding and agreement between conflicting parties."
    },
    {
        question: "Which of the following is a key component of effective dialogue?",
        choice1: "Active listening",
        choice2: "Ignoring the other party's concerns",
        choice3: "Enforcing one's own agenda",
        choice4: "Avoiding communication",
        answer: "Active listening",
        rationale: "Active listening is a key component of effective dialogue, as it helps in understanding the concerns and perspectives of all parties involved."
    },
    {
        question: "How can dialogue contribute to peacebuilding?",
        choice1: "By promoting mutual understanding and cooperation",
        choice2: "By escalating tensions",
        choice3: "By enforcing one party's dominance",
        choice4: "By ignoring the root causes of conflict",
        answer: "By promoting mutual understanding and cooperation",
        rationale: "Dialogue contributes to peacebuilding by promoting mutual understanding and cooperation, which are essential for resolving conflicts and building lasting peace."
    },

    // ANTI-CORRUPTION, INTEGRITY AND SOCIETAL DEVELOPMENT IN NIGERIA
    {
        question: "What is the impact of corruption on societal development in Nigeria?",
        choice1: "It promotes economic growth",
        choice2: "It hinders development by diverting resources",
        choice3: "It ensures political stability",
        choice4: "It reduces poverty",
        answer: "It hinders development by diverting resources",
        rationale: "Corruption hinders societal development by diverting resources away from essential services and infrastructure, leading to economic and social challenges."
    },
    {
        question: "How can integrity be promoted in Nigeria?",
        choice1: "By encouraging corrupt practices",
        choice2: "By enforcing strict anti-corruption laws",
        choice3: "By ignoring unethical behavior",
        choice4: "By reducing transparency",
        answer: "By enforcing strict anti-corruption laws",
        rationale: "Promoting integrity requires enforcing strict anti-corruption laws and fostering a culture of accountability and transparency."
    },
    {
        question: "What is the role of anti-corruption agencies in Nigeria?",
        choice1: "To promote corruption",
        choice2: "To investigate and prosecute corrupt practices",
        choice3: "To ignore corrupt activities",
        choice4: "To reduce transparency",
        answer: "To investigate and prosecute corrupt practices",
        rationale: "Anti-corruption agencies play a crucial role in investigating and prosecuting corrupt practices, thereby promoting accountability and integrity."
    },

    // UNDERSTANDING PEACE, SECURITY AND DEVELOPMENT
    {
        question: "What is the relationship between peace and development?",
        choice1: "Peace hinders development",
        choice2: "Peace is essential for sustainable development",
        choice3: "Development is not affected by peace",
        choice4: "Peace and development are unrelated",
        answer: "Peace is essential for sustainable development",
        rationale: "Peace is essential for sustainable development as it creates a stable environment for economic growth and social progress."
    },
    {
        question: "How does security contribute to development?",
        choice1: "By creating instability",
        choice2: "By fostering a safe environment for economic activities",
        choice3: "By reducing access to education",
        choice4: "By encouraging conflicts",
        answer: "By fostering a safe environment for economic activities",
        rationale: "Security contributes to development by fostering a safe environment that enables economic activities and social progress."
    },
    {
        question: "What is a key factor in achieving sustainable peace?",
        choice1: "Promoting inequality",
        choice2: "Addressing the root causes of conflict",
        choice3: "Ignoring social issues",
        choice4: "Enforcing authoritarian rule",
        answer: "Addressing the root causes of conflict",
        rationale: "Achieving sustainable peace requires addressing the root causes of conflict, such as inequality, injustice, and lack of access to resources."
    }
];
    
























/*const CORRECT_BONUS = 10;
const MAX_QUESTIONS = 4;

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

choices.forEach(choice => {
  choice.addEventListener("click",e => {
    if (!acceptingAnswers) return;
    
    acceptingAnswers = false;
    const selectedChoice = e.target
    const selectedAnswer = selectedChoice.dataset["number"];
    const classToApply = selectedAnswer == currentQuestion.answer? "correct": "incorrect";
    
    selectedChoice.parentElement.classList.add(classToApply);
    if(classToApply == "correct"){
      score+=10;
    }
    scoretext.innerHTML = score;
    setTimeout(remove_next, 1000);
    function remove_next(){
      selectedChoice.parentElement.classList.remove(classToApply);
      getNewQuestion();
    }
  });
});

let durationInMinutes = 1
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
*/



/*
Cretaing folders for question storage.
let questionContainer = document.getElementById("questionCont")

let firstBtn = document.getElementById("firstBtn");
let secondBtn = document.getElementById("css 303");
let thirdBtn = document.getElementById("css 305");
let fourthBtn = document.getElementById("css 307");
let fifthBtn = document.getElementById("css 309");
let sixthBtn = document.getElementById("css 311");
let seventhBtn = document.getElementById("css 313");
let eighthBtn = document.getElementById("css 315");

firstBtn.addEventListener("click", function(){
  questionContainer.style.display = "block";
});

*/
let text = "";
let questionNo = 0;
const questionBox = document.getElementById("questionBox");
for (let i=0; i< questions.length; i++){
  questionNo++;
  text+= questionNo+"."+" "+questions[i].question+'<br>'+"Answer:"+" "+questions[i].answer+'<br>'+questions[i].rationale+'<br>'+'<br>';
}

questionBox.innerHTML = text;
