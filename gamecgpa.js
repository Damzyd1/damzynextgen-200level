
window.addEventListener("popstate", function(event){
  history.pushState(null, "", window.location.href);
});

document.addEventListener("keydown", e => {
  if((e.ctrlKey || e.metaKey) &&  e.key.toLowerCase() === 'r'){
    e.preventDefault();
  }
});



const topic = " <br> Exam Simulation";
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
    question: "What is the formula for calculating the mean?",
    choice1: "(Σx) / (n-1)",
    choice2: "(Σx) / (n+1)",
    choice3: "(Σx) / 2",
    choice4: "(Σx) / n",
    answer: 4
  },
  {
    question : "What is the formula for calculating the median for an even-numbered dataset?",
    choice1: "(n+1)/2",
    choice2: "(n/2)th term",
    choice3: "((n/2)th term - ((n/2)+1)th term) / 2",
    choice4: "((n/2)th term + ((n/2)+1)th term) / 2",
    answer: 4
  },
  {
    question: "What is the formula for calculating the mode?",
    choice1: "Most frequently occurring value - 1",
    choice2: "Most frequently occurring value",
    choice3: "Most frequently occurring value + 1",
    choice4: "(Σx) / n",
    answer: 2
  },
  {
    question: "What is the formula for calculating the variance?",
    choice1: "Σ(x-μ)^2 / (n-1)",
    choice2: "Σ(x-μ)^2 / (n+1)",
    choice3: "Σ(x-μ)^2 / 2",
    choice4: "Σ(x-μ)^2 / n",
    answer: 4
  },
  {
    question: "What is the formula for calculating the standard deviation?",
    choice1: "√(Σ(x-μ)^2 / (n-1))",
    choice2: "√(Σ(x-μ)^2 / (n+1))",
    choice3: "√(Σ(x-μ)^2 / 2)",
    choice4: "√(Σ(x-μ)^2 / n)",
    answer: 4
 },
  {
    question: "What is the formula for the regression line?",
    choice1: "y = a + bx",
    choice2: "y = a - bx",
    choice3: "y = a * bx",
    choice4: "y = a / bx",
    answer: 1
  },
  {
    question : "What is the formula for the coefficient of determination (R^2)?",
    choice1: "R^2 = 1 - (Σ(yi - ŷi)^2 / Σ(yi - μy)^2)",
    choice2: "R^2 = 1 + (Σ(yi - ŷi)^2 / Σ(yi - μy)^2)",
    choice3: "R^2 = 1 - (Σ(yi - ŷi)^2 / Σ(yi + μy)^2)",
    choice4: "R^2 = 1 + (Σ(yi - ŷi)^2 / Σ(yi + μy)^2)",
    answer: 1
  },
  {
    question : "What is the formula for the standard error (SE)?",
    choice1: "SE = σ / (√n - 1)",
    choice2: "SE = σ / (√n + 1)",
    choice3: "SE = σ / 2",
    choice4: "SE = σ / √n",
    answer: 4
  },
  {
    question: "What is the formula for a confidence interval (CI)?",
    choice1: "CI = x̄ ± (Z * (σ / (√n - 1)))",
    choice2: "CI = x̄ ± (Z * (σ / (√n + 1)))",
    choice3: "CI = x̄ ± (Z * (σ / 2))",
    choice4: "CI = x̄ ± (Z * (σ / √n))",
    answer: 4
  },
  {
    question:"What percentage of the data does the mean represent?",
    choice1: "25%",
    choice2: "50%",
    choice3: "65%",
    choice4: "100%",
    answer: 4
  },
  {
    question:"What percentage of the data is below the median in an even-numbered dataset?",
    choice1: "25%",
    choice2: "40%",
    choice3: "50%",
    choice4: "75%",
    answer: 3
  },
  {
    question:"What percentage of the data must be the same value to be considered the mode?",
    choice1: "25%",
    choice2: "50%",
    choice3: "65%",
    choice4: "100%",
    answer: 2
  },
  {
    question:"What percentage of the data is explained by the variance?",
    choice1: "25%",
    choice2: "50%",
    choice3: "75%",
    choice4: "100%",
    answer: 4
  },
  {
    question:"What percentage of the data falls within 1 standard deviation of the mean?",
    choice1: "50%",
    choice2: "65%" ,
    choice3: "75%",
    choice4: "95%",
    answer: 4
  },
  {
    question: "What percentage of the variation in one variable is explained by the correlation with another variable?",
    choice1: "25%",
    choice2: "50%",
    choice3: "65%",
    choice4: "100%",
    answer: 4
  },
  {
    question: "What percentage of the data is predicted by the regression line?",
    choice1: "25%",
    choice2: "50%",
    choice3: "65%",
    choice4: "100%",
    answer: 4
  },
  {
    question: "What percentage of the data's spread is accounted for by the standard error?",
    choice1: "25%",
    choice2: "50%",
    choice3: "65%",
    choice4: "100%",
    answer: 1
  },
  {
    question: "What percentage of the data is likely to contain the true population parameter?",
    choice1: "50%",
    choice2: "65%",
    choice3: "75%",
    choice4: "95%",
    answer: 4
  },
  {
  question: "What is the primary purpose of social statistics?",
  choice1: "To collect data",
  choice2: "To analyze data",
  choice3: "To describe and analyze social phenomena",
  choice4: "To predict future events",
  answer: 3,
  rationale: "Social statistics aims to describe and analyze social phenomena."
  },
  {
  question: "Which of the following is a fundamental assumption in social statistics?",
  choice1: "Data should be collected from a sample",
  choice2: "Data should be analyzed using statistical software",
  choice3: "Data should be accurate and reliable",
  choice4: "Data should be collected from a population",
  answer: 3,
  rationale: "Accurate and reliable data is essential in social statistics."
  },
  {
  question: "What is the term for a group of people that share common characteristics?",
  choice1: "Population",
  choice2: "Sample",
  choice3: "Census",
  choice4: "Cluster",
  answer: 1,
  rationale: "A population is a group of people that share common characteristics."
  },
  {
  question: "What is the term for a subset of a population?",
  choice1: "Population",
  choice2: "Sample",
  choice3: "Census",
  choice4: "Cluster",
  answer: 2,
  rationale: "A sample is a subset of a population."
  },
  {
  question: "What type of sampling involves selecting every member of a population?",
  choice1: "Probability sampling",
  choice2: "Non-probability sampling",
  choice3: "Cluster sampling",
  choice4: "Census",
  answer: 4,
  rationale: "A census involves selecting every member of a population."
  },
  {
  question: "What type of scale measures variables in terms of rank or order?",
  choice1: "Nominal scale",
  choice2: "Ordinal scale",
  choice3: "Interval scale",
  choice4: "Ratio scale",
  answer: 2,
  rationale: "An ordinal scale measures variables in terms of rank or order."
  },
  {
  question: "What type of scale measures variables in terms of equal intervals?",
  choice1: "Nominal scale",
  choice2: "Ordinal scale",
  choice3: "Interval scale",
  choice4: "Ratio scale",
  answer: 3,
  rationale: "An interval scale measures variables in terms of equal intervals."
  },
  {
  question: "What type of scale measures variables in terms of a true zero point?",
  choice1: "Nominal scale",
  choice2: "Ordinal scale",
  choice3: "Interval scale",
  choice4: "Ratio scale",
  answer: 4,
  rationale: "A ratio scale measures variables in terms of a true zero point."
  },
  {
  question: "What is the term for a measure of central tendency that is sensitive to extreme values?",
  choice1: "Mean",
  choice2: "Median",
  choice3: "Mode",
  choice4: "Standard deviation",
  answer: 1,
  rationale: "The mean is a measure of central tendency that is sensitive to extreme values."
  },
  {
  question: "What is the term for a measure of variability that is sensitive to extreme values?",
  choice1: "Range",
  choice2: "Variance",
  choice3: "Standard deviation",
  choice4: "Skewness",
  answer: 3,
  rationale: "The standard deviation is a measure of variability that is sensitive to extreme values."
  },
  {
  question: "What is the term for a measure of the asymmetry of a distribution?",
  choice1: "Skewness",
  choice2: "Kurtosis",
  choice3: "Variance",
  choice4: "Standard deviation",
  answer: 1,
  rationale: "Skewness is a measure of the asymmetry of a distribution."
  },
  {
  question: "What is the term for a measure of the flatness or peakedness of a distribution?",
  choice1: "Skewness",
  choice2: "Kurtosis",
  choice3: "Variance",
  choice4: "Standard deviation",
  answer: 2,
  rationale: "Kurtosis is a measure of the flatness or peakedness of a distribution."
  },
  {
  question: "What type of statistical test is used to determine if there is a significant association between two categorical variables?",
  choice1: "t-test",
  choice2: "ANOVA",
  choice3: "Regression analysis",
  choice4: "Chi-square test",
  answer: 4,
  rationale: "The chi-square test is used to determine if there is a significant association between two categorical variables."
  },
  {
  question: "What is the term for a type of non-probability sampling that involves selecting participants based on convenience?",
  choice1: "Convenience sampling",
  choice2: "Purposive sampling",
  choice3: "Quota sampling",
  choice4: "Snowball sampling",
  answer: 1,
  rationale: "Convenience sampling involves selecting participants based on convenience."
  },
  {
  question: "What is the primary purpose of social statistics?",
  choice1: "To collect data",
  choice2: "To analyze data",
  choice3: "To describe and analyze social phenomena",
  choice4: "To predict future events",
  answer: 3,
  rationale: "Social statistics aims to describe and analyze social phenomena."
  },
  {
  question: "Which of the following is a fundamental assumption in social statistics?",
  choice1: "Data should be collected from a sample",
  choice2: "Data should be analyzed using statistical software",
  choice3: "Data should be accurate and reliable",
  choice4: "Data should be collected from a population",
  answer: 3,
  rationale: "Accurate and reliable data is essential in social statistics."
  },
  {
  question: "What is the term for a group of people that share common characteristics?",
  choice1: "Population",
  choice2: "Sample",
  choice3: "Census",
  choice4: "Cluster",
  answer: 1,
  rationale: "A population is a group of people that share common characteristics."
  },
  {
  question: "What type of sampling involves selecting every member of a population?",
  choice1: "Probability sampling",
  choice2: "Non-probability sampling",
  choice3: "Cluster sampling",
  choice4: "Census",
  answer: 4,
  rationale: "A census involves selecting every member of a population."
  },
  {
  question: "What type of scale measures variables in terms of rank or order?",
  choice1: "Nominal scale",
  choice2: "Ordinal scale",
  choice3: "Interval scale",
  choice4: "Ratio scale",
  answer: 2,
  rationale: "An ordinal scale measures variables in terms of rank or order."
  },
  {
  question: "What type of scale measures variables in terms of equal intervals?",
  choice1: "Nominal scale",
  choice2: "Ordinal scale",
  choice3: "Interval scale",
  choice4: "Ratio scale",
  answer: 3,
  rationale: "An interval scale measures variables in terms of equal intervals."
  },
  {
  question: "What type of scale measures variables in terms of a true zero point?",
  choice1: "Nominal scale",
  choice2: "Ordinal scale",
  choice3: "Interval scale",
  choice4: "Ratio scale",
  answer: 4,
  rationale: "A ratio scale measures variables in terms of a true zero point."
  },
  {
  question: "What is the term for a measure of central tendency that is sensitive to extreme values?",
  choice1: "Mean",
  choice2: "Median",
  choice3: "Mode",
  choice4: "Standard deviation",
  answer: 1,
  rationale: "The mean is sensitive to extreme values."
  },
  {
  question: "What is the term for a measure of variability that is sensitive to extreme values?",
  choice1: "Range",
  choice2: "Variance",
  choice3: "Standard deviation",
  choice4: "Skewness",
  answer: 3,
  rationale: "The standard deviation is sensitive to extreme values."
  },
  {
  question: "What is the term for a measure of the asymmetry of a distribution?",
  choice1: "Skewness",
  choice2: "Kurtosis",
  choice3: "Variance",
  choice4: "Standard deviation",
  answer: 1,
  rationale: "Skewness measures the asymmetry of a distribution."
  },
  {
  question: "What is the term for a measure of the flatness or peakedness of a distribution?",
  choice1: "Skewness",
  choice2: "Kurtosis",
  choice3: "Variance",
  choice4: "Standard deviation",
  answer: 2,
  rationale: "Kurtosis measures the flatness or peakedness of a distribution."
  },
  {
  question: "What type of statistical test is used to determine if there is a significant association between two categorical variables?",
  choice1: "t-test",
  choice2: "ANOVA",
  choice3: "Regression analysis",
  choice4: "Chi-square test",
  answer: 4,
  rationale: "The Chi-square test is used to determine if there is a significant association between two categorical variables."
  },
  {
  question: "What is the term for a type of non-probability sampling that involves selecting participants based on convenience?",
  choice1: "Convenience sampling",
  choice2: "Purposive sampling",
  choice3: "Quota sampling",
  choice4: "Snowball sampling",
  answer: 1,
  rationale: "Convenience sampling involves selecting participants based on convenience."
  },
  {
  question: "What is the term for a type of non-probability sampling that involves selecting participants based on their expertise or knowledge?",
  choice1: "Convenience sampling",
  choice2: "Purposive sampling",
  choice3: "Quota sampling",
  choice4: "Snowball sampling",
  answer: 2,
  rationale: "Purposive sampling involves selecting participants based"
  },
  {
  question: "What is the formula for the mean of a dataset?",
  choice1: "∑x / n",
  choice2: "(∑x - μ) / σ",
  choice3: "(x - μ) / σ",
  choice4: "∑(x - μ) / n",
  answer: 1,
  rationale: "The mean is calculated by summing all values and dividing by the number of values."
  },
  {
  question: "What is the formula for the median of a dataset?",
  choice1: "∑x / n",
  choice2: "(n + 1) / 2",
  choice3: "(x - μ) / σ",
  choice4: "∑(x - μ) / n",
  answer: 2,
  rationale: "The median is the middle value of a dataset when it is sorted in ascending order."
  },
  {
  question: "What is the formula for the range of a dataset?",
  choice1: "Max - Min",
  choice2: "(∑x - μ) / σ",
  choice3: "(x - μ) / σ",
  choice4: "∑(x - μ) / n",
  answer: 1,
  rationale: "The range is the difference between the largest and smallest values in a dataset."
  },
  {
  question: "What is the formula for the variance of a dataset?",
  choice1: "∑(x - μ)^2 / n",
  choice2: "(∑x - μ) / σ",
  choice3: "(x - μ) / σ",
  choice4: "∑(x - μ) / n",
  answer: 1,
  rationale: "The variance measures the spread of a dataset."
  },
  {
  question: "What is the formula for the standard deviation of a dataset?",
  choice1: "√(∑(x - μ)^2 / n)",
  choice2: "(∑x - μ) / σ",
  choice3: "(x - μ) / σ",
  choice4: "∑(x - μ) / n",
  answer: 1,
  rationale: "The standard deviation measures the spread of a dataset."
  },
  {
  question: "What is the formula for the correlation coefficient (r)?",
  choice1: "∑(x - μ)(y - μ) / (√(∑(x - μ)^2)√(∑(y - μ)^2))",
  choice2: "(∑x - μ) / σ",
  choice3: "(x - μ) / σ",
  choice4: "∑(x - μ) / n",
  answer: 1,
  rationale: "The correlation coefficient measures the strength and direction of a linear relationship."
  },
  {
  question: "What is the formula for the slope (b) of a linear regression line?",
  choice1: "∑(x - μ)(y - μ) / ∑(x - μ)^2",
  choice2: "(∑x - μ) / σ",
  choice3: "(x - μ) / σ",
  choice4: "∑(x - μ) / n",
  answer: 1,
  rationale: "The slope measures the change in the dependent variable for a one-unit change in the independent variable."
  },
  {
  question: "What is the formula for the y-intercept (a) of a linear regression line?",
  choice1: "y - b(x)",
  choice2: "(∑x - μ) / σ",
  choice3: "(x - μ) / σ",
  choice4: "∑(x - μ) / n",
  answer: 1,
  rationale: "The y-intercept is the value of the dependent variable when the independent variable is equal to zero."
  },
  {
  question: "What is the formula for the coefficient of determination (R^2)?",
  choice1: "1 - (∑(y - ŷ)^2 / ∑(y - μ)^2)",
  choice2: "(∑x - μ) / σ",
  choice3: "(x - μ) / σ",
  choice4: "∑(x - μ) / n",
  answer: 1,
  rationale: "The coefficient of determination measures the proportion of the variance in the dependent variable that is explained by the independent variable."
  },
  {
  question: "What is the formula for the standard error of the mean (SEM)?",
  choice1: "σ / √n",
  choice2: "(∑x - μ) / σ",
  choice3: "(x - μ) / σ",
  choice4: "∑(x - μ) / n",
  answer: 1,
  rationale: "The standard error of the mean measures the variability of the sample mean."
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
