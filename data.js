// data.js
// ========== ARI DEC BRAIN QUIZE - DATABASE ==========
// Subjects and questions pool. 
// You can add more subjects or questions anytime.
// Structure:
// subjects: [ { id, name, questions: [ { text, a, b, c, d, correct } ] } ]
// correct must match the option key: 'a', 'b', 'c', or 'd'

const quizDatabase = {
    subjects: [
      // ---------------------------- ENGLISH ----------------------------
      {
        id: "english",
        name: "English",
        questions: [
          { text: "What is the synonym of 'Happy'?", a: "Sad", b: "Joyful", c: "Angry", d: "Tired", correct: "b" },
          { text: "Which word is a noun?", a: "South Korea", b: "Beautiful", c: "Happiness", d: "Quickly", correct: "a" },
          { text: "What is the past tense of 'Go'?", a: "Went", b: "Gone", c: "Goed", d: "Going", correct: "a" },
          { text: "Identify the adjective: 'The blue sky is clear.'", a: "sky", b: "clear", c: "blue", d: "is", correct: "c" },
          { text: "What is the opposite of 'Difficult'?", a: "Hard", b: "Easy", c: "Tough", d: "Complex", correct: "b" },
          { text: "Choose the correct spelling:", a: "Recieve", b: "Receive", c: "Receeve", d: "Reseive", correct: "b" },
          { text: "Which sentence is grammatically correct?", a: "He go to school.", b: "He goes to school.", c: "He going to school.", d: "He gone to school.", correct: "b" },
          { text: "What is a pronoun?", a: "A person, place or thing", b: "An action word", c: "A word that replaces a noun", d: "A describing word", correct: "c" },
          { text: "What does 'synonym' mean?", a: "Same meaning", b: "Opposite meaning", c: "Similar sound", d: "Different spelling", correct: "a" },
          { text: "Which is a preposition? 'The book is on the table.'", a: "book", b: "is", c: "on", d: "table", correct: "c" },
          { text: "What is the plural of 'Child'?", a: "Childs", b: "Children", c: "Childes", d: "Childern", correct: "b" },
          { text: "Which word is an adverb? 'She sings beautifully.'", a: "She", b: "sings", c: "beautifully", d: "sings beautifully", correct: "c" },
          { text: "What is the main idea of a paragraph?", a: "The first sentence", b: "The central point", c: "The longest sentence", d: "The title", correct: "b" }
        ]
      },
      // ---------------------------- MATHS ----------------------------
      {
        id: "maths",
        name: "Maths",
        questions: [
          { text: "What is 15 + 27?", a: "32", b: "42", c: "40", d: "52", correct: "b" },
          { text: "If x = 5, what is 3x + 2?", a: "15", b: "17", c: "20", d: "10", correct: "b" },
          { text: "What is the square root of 64?", a: "6", b: "7", c: "8", d: "9", correct: "c" },
          { text: "Solve: 12 × 4 = ?", a: "36", b: "48", c: "44", d: "52", correct: "b" },
          { text: "What is 25% of 200?", a: "25", b: "40", c: "50", d: "75", correct: "c" },
          { text: "Simplify: 8/12", a: "1/2", b: "2/3", c: "3/4", d: "4/6", correct: "b" },
          { text: "What is the area of a rectangle with length 8 and width 5?", a: "40", b: "26", c: "13", d: "20", correct: "a" },
          { text: "If a triangle has angles 45° and 55°, what is the third angle?", a: "80°", b: "90°", c: "100°", d: "70°", correct: "a" },
          { text: "What is 7 × 8?", a: "48", b: "56", c: "64", d: "54", correct: "b" },
          { text: "Which number is prime?", a: "21", b: "33", c: "29", d: "49", correct: "c" },
          { text: "What is 100 ÷ 4?", a: "20", b: "25", c: "30", d: "40", correct: "b" },
          { text: "Convert 0.75 to a fraction.", a: "1/4", b: "2/3", c: "3/4", d: "4/5", correct: "c" },
          { text: "What is the perimeter of a square with side 6 cm?", a: "24 cm", b: "36 cm", c: "12 cm", d: "30 cm", correct: "a" }
        ]
      },
      // ---------------------------- PHYSICS ----------------------------
      {
        id: "physics",
        name: "Physics",
        questions: [
          { text: "What is the SI unit of force?", a: "Joule", b: "Newton", c: "Watt", d: "Pascal", correct: "b" },
          { text: "Which law states F = ma?", a: "Newton's First Law", b: "Newton's Second Law", c: "Newton's Third Law", d: "Law of Gravity", correct: "b" },
          { text: "What is the speed of light in vacuum (approx)?", a: "3×10^5 km/s", b: "3×10^8 m/s", c: "3×10^6 m/s", d: "3×10^7 m/s", correct: "b" },
          { text: "Which particle has a negative charge?", a: "Proton", b: "Neutron", c: "Electron", d: "Positron", correct: "c" },
          { text: "What is the unit of resistance?", a: "Volt", b: "Ampere", c: "Ohm", d: "Watt", correct: "c" },
          { text: "Gravity is a force of __________.", a: "Attraction", b: "Repulsion", c: "Friction", d: "Momentum", correct: "a" },
          { text: "Which of these is a renewable energy source?", a: "Coal", b: "Natural Gas", c: "Solar", d: "Oil", correct: "c" },
          { text: "What does a thermometer measure?", a: "Pressure", b: "Temperature", c: "Mass", d: "Volume", correct: "b" },
          { text: "Sound cannot travel through __________.", a: "Air", b: "Water", c: "Vacuum", d: "Steel", correct: "c" },
          { text: "What is the formula for kinetic energy?", a: "mgh", b: "1/2 mv²", c: "mv", d: "ma", correct: "b" },
          { text: "Which color of light has the longest wavelength?", a: "Blue", b: "Green", c: "Red", d: "Violet", correct: "c" },
          { text: "What device is used to measure current?", a: "Voltmeter", b: "Ammeter", c: "Ohmmeter", d: "Galvanometer", correct: "b" },
          { text: "The unit of power is __________.", a: "Joule", b: "Watt", c: "Newton-meter", d: "Hertz", correct: "b" }
        ]
      },
      // ---------------------------- ECONOMICS ----------------------------
      {
        id: "economics",
        name: "Economics",
        questions: [
          { text: "What does GDP stand for?", a: "Gross Domestic Product", b: "General Demand Price", c: "Gross Development Profit", d: "Global Domestic Parity", correct: "a" },
          { text: "Inflation means a rise in __________.", a: "Unemployment", b: "General price level", c: "Taxes", d: "Exports", correct: "b" },
          { text: "What is the law of demand?", a: "Price up, demand up", b: "Price down, demand down", c: "Price up, demand down", d: "Price constant, demand up", correct: "c" },
          { text: "Which is a direct tax?", a: "VAT", b: "Income Tax", c: "Sales Tax", d: "Customs Duty", correct: "b" },
          { text: "What is a monopoly?", a: "Many sellers", b: "Single seller", c: "Two sellers", d: "No seller", correct: "b" },
          { text: "Who is known as the father of modern economics?", a: "Adam Smith", b: "Karl Marx", c: "John Keynes", d: "Milton Friedman", correct: "a" },
          { text: "What is opportunity cost?", a: "Money cost", b: "The next best alternative foregone", c: "Total expense", d: "Fixed cost", correct: "b" },
          { text: "Which is a characteristic of a developed economy?", a: "Low GDP", b: "High agricultural employment", c: "High per capita income", d: "Low literacy rate", correct: "c" },
          { text: "What does RBI stand for (in Indian context)?", a: "Royal Bank of India", b: "Reserve Bank of India", c: "Regional Bank of India", d: "Revenue Bank of India", correct: "b" },
          { text: "What is the primary function of money?", a: "Medium of exchange", b: "Store of ornament", c: "Increase taxes", d: "Create debt", correct: "a" },
          { text: "Which sector contributes most to GDP in developed nations?", a: "Agriculture", b: "Industry", c: "Services", d: "Mining", correct: "c" },
          { text: "Budget deficit means:", a: "Revenue > Expenditure", b: "Expenditure > Revenue", c: "Balanced budget", d: "Zero tax", correct: "b" },
          { text: "What is microeconomics about?", a: "Whole economy", b: "Individual markets & firms", c: "International trade", d: "Government policy", correct: "b" }
        ]
      },
      //----------------------Agric science ---------------------- 
      {
      id:"agric",
      name:"Agric science",
      questions:[
       { text: "Provision of farm inputs such as _______ and ________is one the roles of government in agricutural development",a:"barns,silos",b:"electricity,pipeborne water",c:"chemicals,farm tools",d:"good roads,railways",correct:"c" },
       { text: "Abiotic component of an ecosystem includes all except________", a:"rainfall",b:"crops",c:"rocks",d:"water",correct:"c" },
       { text: "What is a monopoly?", a: "Many sellers", b: "Single seller", c: "Two sellers", d: "No seller", correct: "b" },
          { text: "Who is known as the father of modern economics?", a: "Adam Smith", b: "Karl Marx", c: "John Keynes", d: "Milton Friedman", correct: "a" },
          { text: "What is opportunity cost?", a: "Money cost", b: "The next best alternative foregone", c: "Total expense", d: "Fixed cost", correct: "b" },
          { text: "Which is a characteristic of a developed economy?", a: "Low GDP", b: "High agricultural employment", c: "High per capita income", d: "Low literacy rate", correct: "c" },
          { text: "What does RBI stand for (in Indian context)?", a: "Royal Bank of India", b: "Reserve Bank of India", c: "Regional Bank of India", d: "Revenue Bank of India", correct: "b" },
          { text: "What is the primary function of money?", a: "Medium of exchange", b: "Store of ornament", c: "Increase taxes", d: "Create debt", correct: "a" },
          { text: "Which sector contributes most to GDP in developed nations?", a: "Agriculture", b: "Industry", c: "Services", d: "Mining", correct: "c" },
          { text: "Budget deficit means:", a: "Revenue > Expenditure", b: "Expenditure > Revenue", c: "Balanced budget", d: "Zero tax", correct: "b" },
          { text: "What is microeconomics about?", a: "Whole economy", b: "Individual markets & firms", c: "International trade", d: "Government policy", correct: "b" }
        







      ]

    }













    ]
  };
  
  // Make it globally available
  window.quizDatabase = quizDatabase;