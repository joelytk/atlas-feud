import AnswerType from '../types/Answer';

const Answer = ({
  answer,
  isCompleted,
  onClick
}: {
  answer: AnswerType;
  isCompleted: Function;
  onClick: Function;
}) => {
  return (
    <div
      className={`answer-item${isCompleted(answer) ? ' completed' : ''}`}
      onClick={() => onClick(answer)}
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
