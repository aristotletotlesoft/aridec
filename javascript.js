// javascript.js
// ========== GAME CONTROLLER ==========
// DOM elements
let currentState = {
    subjectsData: [],          // will be loaded from window.quizDatabase
    selectedSubjectId: null,
    selectedSubjectObj: null,
    currentQuestions: [],     // shuffled 10 questions
    userAnswers: new Array(10).fill(null),
    timerInterval: null,
    timeLeftSeconds: 300,     // 5 min
    quizActive: false,
    playerName: "",
    resultScore: 0,
    resultPassed: false,
  };
  
  // DOM refs
  const subjectPanel = document.getElementById('subjectPanel');
  const namePanel = document.getElementById('namePanel');
  const quizPanel = document.getElementById('quizPanel');
  const resultPanel = document.getElementById('resultPanel');
  const subjectsGrid = document.getElementById('subjectsGrid');
  const selectedSubjectPreview = document.getElementById('selectedSubjectPreview');
  const playerNameInput = document.getElementById('playerNameInput');
  const startQuizBtn = document.getElementById('startQuizBtn');
  const backToSubjectsFromName = document.getElementById('backToSubjectsFromName');
  const quizSubjectTitle = document.getElementById('quizSubjectTitle');
  const timerDisplay = document.getElementById('timerDisplay');
  const currentQNumSpan = document.getElementById('currentQNum');
  const totalQNumSpan = document.getElementById('totalQNum');
  const questionTextEl = document.getElementById('questionText');
  const optionsContainer = document.getElementById('optionsContainer');
  const prevBtn = document.getElementById('prevBtn');
  const nextBtn = document.getElementById('nextBtn');
  const submitQuizBtn = document.getElementById('submitQuizBtn');
  const playAgainBtn = document.getElementById('playAgainBtn');
  const changeSubjectBtn = document.getElementById('changeSubjectBtn');
  const resultMessage = document.getElementById('resultMessage');
  const resultDetail = document.getElementById('resultDetail');
  const resultIcon = document.getElementById('resultIcon');
  
  // Helper: shuffle array (Fisher-Yates)
  function shuffleArray(arr) {
    for (let i = arr.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [arr[i], arr[j]] = [arr[j], arr[i]];
    }
    return arr;
  }
  
  // Load subjects from data.js (global window.quizDatabase)
  function loadSubjects() {
    if (window.quizDatabase && window.quizDatabase.subjects) {
      currentState.subjectsData = window.quizDatabase.subjects;
      renderSubjects();
    } else {
      // fallback demo data if data.js missing (just safety)
      console.warn("data.js not loaded properly, using fallback");
      currentState.subjectsData = [
        { id: "eng", name: "English", questions: [] },
        { id: "math", name: "Maths", questions: [] }
      ];
      renderSubjects();
    }
  }
  
  function renderSubjects() {
    if (!subjectsGrid) return;
    subjectsGrid.innerHTML = "";
    currentState.subjectsData.forEach(subj => {
      const card = document.createElement('div');
      card.className = 'subject-card';
      card.innerText = subj.name;
      card.addEventListener('click', () => {
        selectSubject(subj.id);
      });
      subjectsGrid.appendChild(card);
    });
  }
  
  function selectSubject(subjectId) {
    const subject = currentState.subjectsData.find(s => s.id === subjectId);
    if (!subject) return;
    currentState.selectedSubjectId = subjectId;
    currentState.selectedSubjectObj = subject;
    selectedSubjectPreview.innerText = `📖 ${subject.name} • 10 random questions • 80% to pass`;
    // Switch to name panel
    setActivePanel('namePanel');
    playerNameInput.value = "";
    playerNameInput.focus();
  }
  
  function setActivePanel(panelId) {
    subjectPanel.classList.remove('active-panel');
    namePanel.classList.remove('active-panel');
    quizPanel.classList.remove('active-panel');
    resultPanel.classList.remove('active-panel');
    if (panelId === 'subjectPanel') subjectPanel.classList.add('active-panel');
    else if (panelId === 'namePanel') namePanel.classList.add('active-panel');
    else if (panelId === 'quizPanel') quizPanel.classList.add('active-panel');
    else if (panelId === 'resultPanel') resultPanel.classList.add('active-panel');
  }
  
  // generate random 10 questions from subject's pool (minimum 10, else repeat? but we assume >10 or duplicates safe)
  function getRandomQuestions(subject) {
    const pool = subject.questions;
    if (!pool || pool.length === 0) return [];
    // Shuffle copy and take first 10 (or fewer if less than 10, but we design at least 10)
    const shuffledPool = shuffleArray([...pool]);
    return shuffledPool.slice(0, 10);
  }
  
  function startQuiz() {
    const name = playerNameInput.value.trim();
    if (name === "") {
      alert("Please enter your name to start the quiz.");
      return;
    }
    // clear any previous timer
    if (currentState.timerInterval) clearInterval(currentState.timerInterval);
    // get fresh questions
    const questionsSlice = getRandomQuestions(currentState.selectedSubjectObj);
    if (questionsSlice.length < 10) {
      alert("Not enough questions in this subject! Need at least 10. Add more in data.js.");
      return;
    }
    currentState.currentQuestions = questionsSlice;
    currentState.userAnswers = new Array(10).fill(null);
    currentState.timeLeftSeconds = 300; // 5 minutes
    currentState.quizActive = true;
    currentState.playerName = name;
    updateTimerDisplay();
    
    // UI init
    totalQNumSpan.innerText = "10";
    quizSubjectTitle.innerText = currentState.selectedSubjectObj.name;
    renderCurrentQuestion(0);
    setActivePanel('quizPanel');
    
    // start timer
    if (currentState.timerInterval) clearInterval(currentState.timerInterval);
    currentState.timerInterval = setInterval(() => {
      if (!currentState.quizActive) return;
      if (currentState.timeLeftSeconds <= 0) {
        // auto submit
        clearInterval(currentState.timerInterval);
        currentState.quizActive = false;
        autoSubmitQuiz();
      } else {
        currentState.timeLeftSeconds--;
        updateTimerDisplay();
      }
    }, 1000);
  }
  
  function updateTimerDisplay() {
    const mins = Math.floor(currentState.timeLeftSeconds / 60);
    const secs = currentState.timeLeftSeconds % 60;
    timerDisplay.innerText = `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
    if (currentState.timeLeftSeconds <= 60) {
      timerDisplay.style.color = "#ff7777";
    } else {
      timerDisplay.style.color = "#facc15";
    }
  }
  
  let currentQuestionIndex = 0;
  function renderCurrentQuestion(index) {
    if (!currentState.currentQuestions.length) return;
    const q = currentState.currentQuestions[index];
    if (!q) return;
    questionTextEl.innerText = q.text;
    currentQNumSpan.innerText = index+1;
    // build options
    optionsContainer.innerHTML = "";
    const letters = ['A', 'B', 'C', 'D'];
    const optionKeys = ['a', 'b', 'c', 'd'];
    optionKeys.forEach((key, idx) => {
      const optionText = q[key];
      if (!optionText) return;
      const optionDiv = document.createElement('div');
      optionDiv.className = 'option-item';
      if (currentState.userAnswers[index] === key) optionDiv.classList.add('selected');
      const prefixSpan = document.createElement('span');
      prefixSpan.className = 'option-prefix';
      prefixSpan.innerText = letters[idx];
      const textSpan = document.createElement('span');
      textSpan.className = 'option-text';
      textSpan.innerText = optionText;
      optionDiv.appendChild(prefixSpan);
      optionDiv.appendChild(textSpan);
      optionDiv.addEventListener('click', () => {
        if (!currentState.quizActive) return;
        // update answer
        currentState.userAnswers[index] = key;
        // re-render current to highlight
        renderCurrentQuestion(index);
      });
      optionsContainer.appendChild(optionDiv);
    });
  }
  
  // navigation
  function nextQuestion() {
    if (!currentState.quizActive) return;
    if (currentQuestionIndex < 9) {
      currentQuestionIndex++;
      renderCurrentQuestion(currentQuestionIndex);
    } else {
      // on last question, maybe show submit
      if (confirm("You are at the last question. Press OK to review or click Submit Quiz.")) {
        // just stay
      }
    }
  }
  function prevQuestion() {
    if (!currentState.quizActive) return;
    if (currentQuestionIndex > 0) {
      currentQuestionIndex--;
      renderCurrentQuestion(currentQuestionIndex);
    }
  }
  
  function computeScoreAndResult() {
    let correct = 0;
    const questions = currentState.currentQuestions;
    for (let i = 0; i < questions.length; i++) {
      const userAns = currentState.userAnswers[i];
      if (userAns && questions[i].correct === userAns) {
        correct++;
      }
    }
    const percentage = (correct / 10) * 100;
    const passed = percentage >= 60;
    return { score: correct, percentage: Math.round(percentage), passed };
  }
  
  function showResultAndClearName() {
    const { score, percentage, passed } = computeScoreAndResult();
    currentState.resultScore = percentage;
    currentState.resultPassed = passed;
    const player = currentState.playerName || "User";
    let msgTitle = "";
    let msgDetail = "";
    if (passed) {
      msgTitle = `🎉 Congratulations ${player}! 🎉`;
      msgDetail = `You Passed! (Score ${percentage}% - ${score}/10 correct)`;
      resultIcon.innerText = "🏅✨";
    } else {
      msgTitle = `😔 Sorry ${player}, Try Again!`;
      msgDetail = `You Failed (Score ${percentage}% - ${score}/10 correct). Need 60% to pass.`;
      resultIcon.innerText = "📉";
    }
    resultMessage.innerText = msgTitle;
    resultDetail.innerText = msgDetail;
    
    // Remove name from localStorage (clean)
    localStorage.removeItem("aridec_last_player");
    // final cleanup
    setActivePanel('resultPanel');
  }
  
  function autoSubmitQuiz() {
    if (!currentState.quizActive) return;
    currentState.quizActive = false;
    if (currentState.timerInterval) clearInterval(currentState.timerInterval);
    showResultAndClearName();
  }
  
  function manualSubmit() {
    if (!currentState.quizActive) return;
    const confirmSubmit = confirm("Are you sure you want to submit your quiz?");
    if (confirmSubmit) {
      if (currentState.timerInterval) clearInterval(currentState.timerInterval);
      currentState.quizActive = false;
      showResultAndClearName();
    }
  }
  
  function resetGameToSubjects() {
    if (currentState.timerInterval) {
      clearInterval(currentState.timerInterval);
      currentState.timerInterval = null;
    }
    currentState.quizActive = false;
    currentState.selectedSubjectId = null;
    currentState.selectedSubjectObj = null;
    currentState.currentQuestions = [];
    currentState.userAnswers = [];
    currentQuestionIndex = 0;
    setActivePanel('subjectPanel');
  }
  
  function changeSubjectFromResult() {
    resetGameToSubjects();
  }
  
  function playAgainSameSubject() {
    // similar to restart: go back to name entry but keep same subject
    if (currentState.selectedSubjectObj) {
      setActivePanel('namePanel');
      selectedSubjectPreview.innerText = `📖 ${currentState.selectedSubjectObj.name} • 10 random questions • 80% to pass`;
      playerNameInput.value = "";
      // clear any leftovers
      if (currentState.timerInterval) clearInterval(currentState.timerInterval);
      currentState.quizActive = false;
    } else {
      resetGameToSubjects();
    }
  }
  
  // Event listeners
  startQuizBtn.addEventListener('click', startQuiz);
  backToSubjectsFromName.addEventListener('click', resetGameToSubjects);
  prevBtn.addEventListener('click', prevQuestion);
  nextBtn.addEventListener('click', nextQuestion);
  submitQuizBtn.addEventListener('click', manualSubmit);
  playAgainBtn.addEventListener('click', playAgainSameSubject);
  changeSubjectBtn.addEventListener('click', changeSubjectFromResult);
  
  // Init app
  function init() {
    loadSubjects();
    // attach any additional reset
    setActivePanel('subjectPanel');
    currentQuestionIndex = 0;
  }
  init();