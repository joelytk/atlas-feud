import { useEffect, useState } from 'react';

import AnswerGrid from './AnswerGrid';
import Footer from './Footer';
import Header from './Header';
import ScoreCounter from './ScoreCounter';

import useAudio from '../hooks/useAudio';
import AnswerType from '../types/Answer';
import XMark from './XMark';

const Board = () => {
  const [score, setScore] = useState<number>(0);
  const [question, setQuestion] = useState<string>('');
  const [answers, setAnswers] = useState([]);
  const [completed, setCompleted] = useState<number[]>([]);
  const { audioRef, playSound } = useAudio();
  const [strikes, setStrikes] = useState(0);
  const [teams, setTeams] = useState([
    { id: 1, strikes: 0, score: 0 },
    { id: 2, strikes: 0, score: 0 }
  ]);
  const [showStrikes, setShowStrikes] = useState(false);
  const [activeTeam, setActiveTeam] = useState(1);
  const [isRoundEnded, setIsRoundEnded] = useState(false);
  const [winningTeam, setWinningTeam] = useState(1);
  const [scoreMultipler, setScoreMultiplier] = useState(2);

  // TODO: Implement double points feature

  useEffect(() => {
    playSound('intro');
  }, []);

  useEffect(() => {
    if (isRoundEnded) {
      const timeout = setTimeout(() => {
        playSound('round-win');
      }, 2500);

      return () => clearTimeout(timeout);
    }
  }, [isRoundEnded]);

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

  const checkIfRoundHasEnded = () => {
    // Conditions for round win
    // 1. First team answers all (first team wins)
    // 2. First team gets 3 strikes, and second team answers just 1 (second team wins)
    // 3. First team gets 3 strikes, and second team gets 1 strike (first team wins)

    if (activeTeam === 1) {
      // TODO: Fix this (maybe with useEffect)
      if (completed.length > 0 && completed.length === answers.length) {
        setIsRoundEnded(true);
        setWinningTeam(1);
      }
    } else {
      setIsRoundEnded(true);
      setWinningTeam(strikes === 1 ? 1 : 2);
    }
  };

  const handleSubmit = (guess: string) => {
    const foundAnswer = answers.find(({ answer }: { answer: string }) =>
      answer.toLowerCase().includes(guess.toLowerCase())
    );

    if (foundAnswer) {
      if (completed.includes(foundAnswer.id)) {
        alert('Answer is already on the board!');
      } else {
        setScore(score + foundAnswer.score * scoreMultipler);
        setCompleted([...completed, foundAnswer.id]);
        playSound('correct');
        checkIfRoundHasEnded();
      }
    } else {
      setShowStrikes(true);
      setStrikes(strikes + 1);
      playSound('wrong');
      checkIfRoundHasEnded();

      const timeout = setTimeout(() => {
        setShowStrikes(false);

        if (strikes + 1 === 3) {
          setActiveTeam(2);
          setStrikes(0);
        }
      }, 2000);

      return () => clearTimeout(timeout);
    }
  };

  const revealAnswer = (answer: AnswerType) => {
    if (isRoundEnded) {
      setCompleted([...completed, answer.id]);
      playSound('correct');
    }
  };

  return (
    <>
      <div className='container'>
        <Header question={question} />
        {/* <Avatar /> */}
        <main>
          <ScoreCounter score={score} />
          <AnswerGrid
            answers={answers}
            completed={completed}
            isRoundEnded={isRoundEnded}
            revealAnswer={revealAnswer}
          />
        </main>
        <Footer onSubmit={handleSubmit} />
      </div>
      {showStrikes && <XMark strikes={strikes} />}
      <audio ref={audioRef}>
        Your browser does not support the audio element.
      </audio>
    </>
  );
};

export default Board;
