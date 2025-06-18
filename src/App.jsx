import { useState } from 'react'
import './App.css'
import flashcards from './components/flashcards'
import Card from './components/Card'

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);

  const handleNext = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === flashcards.length - 1 ? 0 : prevIndex + 1
    );
  };

  const handleRandom = () => {
    const randomIndex = Math.floor(Math.random() * flashcards.length);
    setCurrentIndex(randomIndex);
  };

  const handlePrevious = () => {
    setCurrentIndex((prevIndex) => 
      prevIndex === 0 ? flashcards.length - 1 : prevIndex - 1
    );
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const remainingCards = flashcards.length - (currentIndex + 1);
  const progress = ((currentIndex + 1) / flashcards.length) * 100;

  return (
    <div className={`App ${isDarkMode ? 'dark-mode' : ''}`}>
      <div className="header-controls">
        <button className="theme-toggle" onClick={toggleDarkMode}>
          {isDarkMode ? '☀️' : '🌙'}
        </button>
      </div>
      <h1>Language Flashcards</h1>
      <h2>Hiragana</h2>
      <p className="description">
        Learn how to read the Hiragana Japanese alphabet with Romaji pronunciation.
        Click on the card to flip it over for the pronunciation, and click the buttons to go to the next card. 
        The bar indicates how far you are from completing the practice. 
      </p>
      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}>
          <span className="progress-text">{Math.round(progress)}%</span>
        </div>
      </div>
      <div className="flashcard-section">
        <div className="navigation-row">
          <button onClick={handlePrevious}>Previous</button>
          <Card 
            question={flashcards[currentIndex].question}
            answer={flashcards[currentIndex].answer}
            index={currentIndex}
            total={flashcards.length}
            remaining={remainingCards}
          />
          <button onClick={handleNext}>Next</button>
        </div>
        <button className="random-button" onClick={handleRandom}>Random Card</button>
      </div>
    </div>
  )
}

export default App
