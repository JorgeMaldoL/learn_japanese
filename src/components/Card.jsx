import { useState } from 'react';

const Card = ({ question, answer, index, total, remaining }) => {
  const [isFlipped, setIsFlipped] = useState(false);

  const handleClick = () => {
    setIsFlipped(!isFlipped);
  };

  return (
    <div 
      className={`card ${isFlipped ? 'flipped' : ''}`} 
      onClick={handleClick}
    >
      <div className="card-inner">
        <div className="card-front">
          <div className='card-stats'>
            <div className='count'>{index + 1} / {total}</div>
            <div className='remaining'>{remaining} left</div>
          </div>
          <p>{question}</p>
        </div>
        <div className="card-back">
          <div className='card-stats'>
            <div className='count'>{index + 1} / {total}</div>
            <div className='remaining'>{remaining} left</div>
          </div>
          <p>{answer}</p>
        </div>
      </div>
    </div>
  );
};

export default Card;