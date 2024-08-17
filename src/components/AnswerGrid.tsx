import AnswerType from '../types/Answer';

import Answer from './Answer';

const AnswerGrid = ({
  answers,
  completed,
  addScore
}: {
  answers: AnswerType[];
  completed: number[];
  addScore: Function;
}) => {
  const isCompleted = (answer: AnswerType) => completed.includes(answer.id);

  const handleClick = (answer: AnswerType) => {
    if (!isCompleted(answer)) {
      addScore(answer);
    }
  };

  return (
    <div className='answer-grid'>
      {answers.map(answer => (
        <Answer
          key={answer.id}
          answer={answer}
          isCompleted={isCompleted}
          onClick={handleClick}
        />
      ))}
    </div>
  );
};

export default AnswerGrid;
