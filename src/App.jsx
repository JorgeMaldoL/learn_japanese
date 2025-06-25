import { useState } from 'react'
import './App.css'
import flashcards from './components/flashcards'
import Card from './components/Card'

function App() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isDarkMode, setIsDarkMode] = useState(false);
  const [cardOrder, setCardOrder] = useState(flashcards.map((_, index) => index));
  const [masteredCards, setMasteredCards] = useState([]);
  const [currentStreak, setCurrentStreak] = useState(0);
  const [longestStreak, setLongestStreak] = useState(0);

  // Get available cards (not mastered)
  const availableCards = cardOrder.filter(index => !masteredCards.includes(index));
  const currentCardIndex = availableCards[currentIndex] || 0;
  const currentCard = flashcards[currentCardIndex];

  const handleNext = () => {
    if (currentIndex < availableCards.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrevious = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const handleShuffle = () => {
    const shuffled = [...availableCards].sort(() => Math.random() - 0.5);
    setCardOrder(shuffled);
    setCurrentIndex(0);
  };

  const handleRestart = () => {
    setCurrentIndex(0);
    setCardOrder(flashcards.map((_, index) => index));
    setMasteredCards([]);
    setCurrentStreak(0);
    // Note: Keep longestStreak for session tracking
  };

  const handleAnswerSubmit = (isCorrect) => {
    if (isCorrect) {
      const newStreak = currentStreak + 1;
      setCurrentStreak(newStreak);
      if (newStreak > longestStreak) {
        setLongestStreak(newStreak);
      }
    } else {
      setCurrentStreak(0);
    }
  };

  const handleMarkAsMastered = () => {
    setMasteredCards([...masteredCards, currentCardIndex]);
    // Move to next card or previous if at end
    if (currentIndex >= availableCards.length - 1 && currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  const remainingCards = availableCards.length - (currentIndex + 1);
  const progress = availableCards.length > 0 ? ((currentIndex + 1) / availableCards.length) * 100 : 0;

  // Navigation button states
  const isAtBeginning = currentIndex === 0;
  const isAtEnd = currentIndex >= availableCards.length - 1;

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
        Enter your guess in the input box below, then submit to check your answer!
      </p>
      
      {/* Streak Counter */}
      <div className="streak-container">
        <div className="streak-stats">
          <span className="current-streak">Current Streak: {currentStreak}</span>
          <span className="longest-streak">  Longest Streak: {longestStreak}</span>
          <span className="mastered-count">  Mastered: {masteredCards.length}</span>
        </div>
      </div>

      <div className="progress-container">
        <div className="progress-bar" style={{ width: `${progress}%` }}>
          <span className="progress-text">{Math.round(progress)}%</span>
        </div>
      </div>

      {availableCards.length > 0 ? (
        <div className="flashcard-section">
          <div className="navigation-row">
            <button 
              onClick={handlePrevious} 
              disabled={isAtBeginning}
              className={isAtBeginning ? 'disabled' : ''}
            >
              Previous
            </button>
            <Card 
              question={currentCard.question}
              answer={currentCard.answer}
              index={currentIndex}
              total={availableCards.length}
              remaining={remainingCards}
              onAnswerSubmit={handleAnswerSubmit}
              onMarkAsMastered={handleMarkAsMastered}
            />
            <button 
              onClick={handleNext} 
              disabled={isAtEnd}
              className={isAtEnd ? 'disabled' : ''}
            >
              Next
            </button>
          </div>
          <div className="control-buttons">
            <button className="shuffle-button" onClick={handleShuffle}>
              🔀 Shuffle Cards
            </button>
            <button className="restart-button" onClick={handleRestart}>
              🔄 Restart
            </button>
          </div>
        </div>
      ) : (
        <div className="completion-message">
          <h2>🎉 Congratulations!</h2>
          <p>You've mastered all the cards!</p>
          <p>Longest streak achieved: {longestStreak}</p>
          <button onClick={() => setMasteredCards([])}>Reset Mastered Cards</button>
        </div>
      )}
    </div>
  )
}

export default App
