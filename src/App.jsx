import { useState } from 'react'
import './App.css'


function App() {
  const [currCard, setCurrCard] = useState(0)
  const [clicked, setClicked] = useState(false)
  const [clickedFlashcard, setClickedFlashcard] = useState(false)
  const [submitClicked, setSubmitClicked] = useState(false)
  const [guess, setGuess] = useState("")
  const [isCorrect, setCorrect] = useState(false)
  // const [isCorrect, setCorrect] = useState("")


  const flashcards = [
    {
      question: "What is MSSQL?",
      answer: "Database System created by Microsoft.\nIt stores information in which you can add, find, change, and organize data quickly."
    },
    {
      question: "What is PostgreSQL?",
      answer: "Another Database System that is open-source and free to use.\nIt is extremely flexible and has advanced features for custom data types, full test search, etc.\nIt shines in complex queries."
    },
    {
      question: "What is a stored procedure?",
      answer: "Little programs/scripts that are saved inside a database.\nThey are efficient because you can call them to do repetitive tasks instead of writing the same code over and over again."
    },
    {
      question: "Agentic AI?",
      answer: "A type of AI that can act on its own and is capable of learning, planning, and taking actions towards a specific goal by itself."
    },
    {
      question: "Azure",
      answer: "Microsoft's cloud computing platform that lets you build, deploy, and manage applications and services."
    },
    {
      question: "Azure OpenAI",
      answer: "A service that gives you access to OpenAI's models like ChatGPT.\nIt has an extra layer of security so that company data is protected."
    },
    {
      question: "What is (role based) access control?",
      answer: "A way to restrict access to certain features based on a user's role within an organization.\nDictates who can do what in a system."
    },
    {
      question: "Database Modeling",
      answer: "Designing how data is organized and related in a databaase.\nInvolves creating tables, defining relationships, and setting rules to ensure data integrity."
    },
    {
      question: "Synchronization",
      answer: "Ensuring that data is consistent and up-to-date across multiple systems or locations."
    },
    {
      question: "Responsive UI",
      answer: "A user interface that adjusts smoothly to different screen sizes and devices, providing an optimal user experience."
    },
    {
      question: "What is an API?",
      answer: "A set of rules and protocols that allow two software applications to communicate with each other.\nLets developers use features or data from another app or service."
    },
    {
      question: "API endpoint",
      answer: "The specific URL where a request is sent to access specific datas or services in an API."
    },
    {
      question: "API key",
      answer: "A secret passcode needed to identify yourself when accessing an API.\nHelps track who's making requests and ensures only authorized users can access the API."
    },
    {
      question: "RESTful API",
      answer: "A way for different software to communicate over the internet using standard HTTP methods like GET, POST, PUT, and DELETE.\nApps talk to each other by sending requests and receiving responses."
    },
    {
      question: "CURD",
      answer: "Stands for the 4 operations you can perform on data: Create, Read, Update, and Delete."
    },
    {
      question: "RESTful API: GET (Create in CURD)",
      answer: "Retrieves data from a server."
    },
    {
      question: "RESTful API: POST (Read in CURD)",
      answer: "Sends data to a server to create a new resource."
    },
    {
      question: "RESTful API: PUT (Update in CURD)",
      answer: "Updates an existing resource on a server."
    },
    {
      question: "RESTful API: DELETE (Delete in CURD)",
      answer: "Removes a resource from a server."
    },
    {
      question: "Diffrence between an array and a linked list",
      answer: "Array: fixed size, direct access to elements via index, and memory is stored contiguously(back to back).\n\nLinked List: dynamic size, sequential access to elements via pointers, and elements are nodes linked with pointers."
    },
    {
      question: "Difference between a process and thread",
      answer: "Process: a program running on a computer with its own memory space.\n\nThread: the smallest unit of a process that can be scheduled and executed. A process can have multiple threads and they all share the same memory space."
    },
    {
      question: "Difference between a stack and a queue",
      answer: "Stack: Last In First Out (LIFO)\nQueue: First In First Out (FIFO)"
    },
    {
      question: "What is CI/CD?",
      answer: "CI (Continuous Integration): practice of automaticaly merging + testing code changes from multiple developers into a shared repository.\n\nCD (Continuous Delivery/Deployment): practice of automatically deoplying software after CI has confirmed it is working correctly."
    },
    {
      question: "Difference between synchronous and asynchronous programming",
      answer: "Synchronous: tasks are performed one after the other, blocking the execution until each task is completed.\n\nAsynchronous: tasks can be performed independently, allowing other tasks to run while waiting for a task to complete."
    },


  ]

  const handleClick = () => {
    setClicked(!clicked)
    setClickedFlashcard(true);
  }


  const handleNextCard = () => {
    if (currCard < flashcards.length - 1) {
      setCurrCard(currCard + 1)
    }
    resetGuess();

    setClicked(false)
    setClickedFlashcard(false);
  }


  const handlePrevCard = () => {
    if (currCard > 0) {
      setCurrCard(currCard - 1)
    }
    resetGuess();
   
    setClicked(false)
    setClickedFlashcard(false);
  }

  // const normalize = (s) => s.replace(/\s+/g, ' ').trim().toLowerCase();

  const resetGuess = () => {
    setClicked(false);
    setGuess('');
    setSubmitClicked(false);
    setCorrect(false);
  };


  const handleSubmitGuess = (params) => {
    let correct = false;

    if (!clickedFlashcard) {
      // Only check the guess if the card hasn't been flipped yet
      const normalize = (s) => s.replace(/\s+/g, ' ').trim().toLowerCase();
      correct = normalize(params) === normalize(flashcards[currCard].answer);
    } else {
      // If the card was flipped, automatically mark as incorrect
      correct = false;
    }

    setCorrect(correct);
    setSubmitClicked(true);
  };
 
  return (
    <div className="app-container">
      <h1 className="title"> The Ultimate Resume Flashcard Study Guide </h1>
      <h2 className="sub-title"> A personalized flashcard study guide for Prativa! </h2>
      <h3 className="num-cards"> Number of cards: {flashcards.length}</h3>


      <div className="card-container" onClick={handleClick}>
        <div className={`card-inner ${clicked ? 'flipped' : ''}`}>
          <div className="card-front">
            <h1>{flashcards[currCard].question}</h1>
          </div>
          <div className="card-back">
            <h2>{flashcards[currCard].answer}</h2>
          </div>
        </div>
      </div>


      <div className="guess-container">
        <input
          className={`guess-text ${
            submitClicked ? (isCorrect ? "correct" : "incorrect") : ""
          }`}
          type="text"
          placeholder="Enter guess here..."
          value={guess}
          onChange={(e) => {
            setGuess(e.target.value);
            setSubmitClicked(false);
            setCorrect(false); // reset color when typing again
          }}
        />
        <button className="submit-guess" onClick={() => handleSubmitGuess(guess)}> Submit </button>
      </div>

      <div>
        {guess.length > 0 && submitClicked && <p>{isCorrect}</p>}
      </div>
     

      <div className="button-container">
        <button className={`back-next ${currCard === 0 ? 'disabled' : ''}`} onClick={handlePrevCard}  disabled={currCard === 0}> Back </button>
        <button className={`back-next ${currCard === flashcards.length - 1 ? 'disabled' : ''}`} onClick={handleNextCard}> Next </button>
      </div>

    </div>
  )
}


// <button
//         className={`back-next ${currCard === 0 ? 'disabled' : ''}`}
//         onClick={handlePrevCard}
//         disabled={currCard === 0} // Disable button when on the first card
//       >
//         Back
//       </button>


export default App
