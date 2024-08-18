import AnswerType from '../types/Answer';

const Answer = ({
  answer,
  isCompleted,
  isRoundEnded,
  revealAnswer
}: {
  answer: AnswerType;
  isCompleted: Function;
  isRoundEnded: boolean;
  revealAnswer: Function;
}) => {
  return (
    <div
      className={`answer-item${isCompleted(answer) ? ' completed' : ''}${
        isRoundEnded ? ' cursor-pointer' : ''
      }`}
      onClick={() => revealAnswer(answer)}
    >
      <div className='answer-item__inner'>
        <div className='answer-item__front'>
          <div className='answer-item__number'>{answer.id}</div>
        </div>
        <div className='answer-item__back'>
          <p className='answer-item__answer'>{answer.answer}</p>
          <p className='answer-item__score'>{answer.score}</p>
        </div>
      </div>
    </div>
  );
};

export default Answer;
