import { useState } from 'react';

const Card = ({ question, answer, index, total, remaining, onAnswerSubmit, onMarkAsMastered }) => {
  const [isFlipped, setIsFlipped] = useState(false);
  const [userGuess, setUserGuess] = useState('');
  const [feedback, setFeedback] = useState(null); // 'correct', 'incorrect', or null
  const [hasSubmitted, setHasSubmitted] = useState(false);

  const handleClick = () => {
    if (!hasSubmitted) {
      setIsFlipped(!isFlipped);
    }
  };

  const normalizeAnswer = (str) => {
    return str.toLowerCase().trim().replace(/[^\w\s]/g, '');
  };

  const isAnswerCorrect = (guess, correctAnswer) => {
    const normalizedGuess = normalizeAnswer(guess);
    const normalizedAnswer = normalizeAnswer(correctAnswer);
    
    // Exact match
    if (normalizedGuess === normalizedAnswer) return true;
    
    // Partial match (guess contains answer or vice versa)
    if (normalizedGuess.includes(normalizedAnswer) || normalizedAnswer.includes(normalizedGuess)) {
      return true;
    }
    
    return false;
  };

  const handleSubmit = () => {
    if (userGuess.trim() === '') return;
    
    const correct = isAnswerCorrect(userGuess, answer);
    setFeedback(correct ? 'correct' : 'incorrect');
    setHasSubmitted(true);
    setIsFlipped(true);
    
    onAnswerSubmit(correct);
  };

  const handleNextCard = () => {
    setIsFlipped(false);
    setUserGuess('');
    setFeedback(null);
    setHasSubmitted(false);
  };

  const handleKeyPress = (e) => {
    if (e.key === 'Enter') {
      handleSubmit();
    }
  };

  return (
    <div className="card-container">
      <div 
        className={`card ${isFlipped ? 'flipped' : ''} ${feedback ? `feedback-${feedback}` : ''}`} 
        onClick={handleClick}
      >
        <div className="card-inner">
          <div className="card-front">
            <div className='card-stats'>
              <div className='count'>{index + 1} / {total}</div>
              <div className='remaining'>{remaining} left</div>
            </div>
            <p className="card-content">{question}</p>
          </div>
          <div className="card-back">
            <div className='card-stats'>
              <div className='count'>{index + 1} / {total}</div>
              <div className='remaining'>{remaining} left</div>
            </div>
            <p className="card-content">{answer}</p>
            {feedback && (
              <div className={`feedback-message ${feedback}`}>
                {feedback === 'correct' ? '✅ Correct!' : '❌ Incorrect'}
              </div>
            )}
          </div>
        </div>
      </div>
      
      <div className="input-section">
        <div className="guess-container">
          <input
            type="text"
            placeholder="Enter your guess..."
            value={userGuess}
            onChange={(e) => setUserGuess(e.target.value)}
            onKeyPress={handleKeyPress}
            disabled={hasSubmitted}
            className={`guess-input ${feedback ? `feedback-${feedback}` : ''}`}
          />
          <button 
            onClick={handleSubmit} 
            disabled={userGuess.trim() === '' || hasSubmitted}
            className="submit-button"
          >
            Submit
          </button>
        </div>
        
        {hasSubmitted && (
          <div className="post-submit-actions">
            <button onClick={handleNextCard} className="next-card-button">
              Next Card
            </button>
            <button onClick={onMarkAsMastered} className="master-button">
              ⭐ Mark as Mastered
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Card;