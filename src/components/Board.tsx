import { useEffect, useState } from 'react';

import AnswerType from '../types/Answer';

import AnswerGrid from './AnswerGrid';
import Audio from './Audio';
import Question from './Question';
import ScoreCounter from './ScoreCounter';

const Board = () => {
  const [score, setScore] = useState<number>(0);
  const [question, setQuestion] = useState<string>('');
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const [sound, setSound] = useState<string>('');

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await fetch('/surveys.json');
        const data = await res.json();
        const randomIndex = Math.floor(Math.random() * data.season23?.length);
        const survey = data.season23[randomIndex];
        setQuestion(survey.question);
        setAnswers(survey.answers);
      } catch (error) {
        console.error({ error });
      }
    };

    fetchData();
  }, []);

  const addScore = (answer: AnswerType) => {
    setScore(score + answer.score);
    setCompleted([...completed, answer.id]);
    setSound('correct');
  };

  return (
    <div className='container'>
      <Question question={question} />
      <ScoreCounter score={score} />
      <AnswerGrid answers={answers} completed={completed} addScore={addScore} />
      <Audio sound={sound} setSound={setSound} />
    </div>
  );
};

export default Board;
