import AnswerType from '../types/Answer';

import Answer from './Answer';

const AnswerGrid = ({
  answers,
  completed,
  isRoundEnded,
  revealAnswer
}: {
  answers: AnswerType[];
  completed: number[];
  isRoundEnded: boolean;
  revealAnswer: Function;
}) => {
  const isCompleted = (answer: AnswerType) => completed.includes(answer.id);

  return (
    <div className='answer-grid-wrapper'>
      <div className='answer-grid'>
        {answers.map(answer => (
          <Answer
            key={answer.id}
            answer={answer}
            isCompleted={isCompleted}
            isRoundEnded={isRoundEnded}
            revealAnswer={revealAnswer}
          />
        ))}
      </div>
    </div>
  );
};

export default AnswerGrid;
