import { useEffect, useState } from 'react';

import AnswerGrid from './AnswerGrid';
import Footer from './Footer';
import ScoreCounter from './ScoreCounter';
import Strike from './Strike';

import useAudio from '../hooks/useAudio';

import AnswerType from '../types/Answer';
import Avatar from './Avatar';

const Board = ({ setWinner }) => {
  const [data, setData] = useState([]);
  const [survey, setSurvey] = useState({
    id: 0,
    question: '',
    answers: []
  });
  const [questionIndex, setQuestionIndex] = useState(0);
  const [score, setScore] = useState<number>(0);
  const [completed, setCompleted] = useState<number[]>([]);
  const { audioRef, playSound } = useAudio();
  const [strikes, setStrikes] = useState(0);
  const [teams, setTeams] = useState([
    { id: 1, name: 'Penang', score: 0 },
    { id: 2, name: 'KL', score: 0 }
  ]);
  const [showStrikes, setShowStrikes] = useState(false);
  const [activeTeam, setActiveTeam] = useState(1);
  const [isRoundEnded, setIsRoundEnded] = useState(false);
  const [scoreMultipler, setScoreMultiplier] = useState(1);

  // useEffect(() => {
  //   playSound('intro');
  // }, []);

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
        const survey = await data[questionIndex];
        setData(data);
        setSurvey(survey);
      } catch (error) {
        console.error({ error });
      }
    };

    fetchData();
  }, []);

  // const loadAnswers = () => {};

  const nextQuestion = () => {
    setCompleted([]);
    setSurvey(data[1]);
    setQuestionIndex(1);
    setScoreMultiplier(2);
    setScore(0);
    setStrikes(0);
  };

  const checkIfRoundHasEnded = () => {
    const timeout = setTimeout(() => {
      if (activeTeam === 1) {
        if (
          completed.length > 0 &&
          completed.length + 1 === survey.answers?.length
        ) {
          setIsRoundEnded(true);
          assignScore(score, 1);

          if (questionIndex === 0) {
            nextQuestion();
          } else {
            endGame();
          }
        }
      } else if (activeTeam === 2) {
        setIsRoundEnded(true);
        assignScore(score, strikes === 1 ? 1 : 2);

        if (questionIndex === 0) {
          nextQuestion();
        } else {
          endGame();
        }
      }
    }, 2000);

    return () => clearTimeout(timeout);
  };

  const assignScore = (score: number, winningTeam: number) => {
    setTeams(teams =>
      teams.map(team =>
        team.id === winningTeam ? { ...team, score: team.score + score } : team
      )
    );
  };

  const endGame = () => {
    const timeout = setTimeout(() => {
      if (questionIndex === 1) {
        const team1Score = teams[0].score;
        const team2Score = teams[1].score;

        if (team1Score > team2Score) {
          setWinner('Penang');
        } else {
          setWinner('KL');
        }
      }
    }, 1000);

    return () => clearTimeout(timeout);
  };

  const handleSubmit = (guess: string) => {
    const timeout = setTimeout(() => {
      const foundAnswer: any = survey.answers?.find(
        ({ acceptedAnswers }: { acceptedAnswers: string[] }) =>
          acceptedAnswers.includes(guess.toLowerCase())
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
            setActiveTeam(activeTeam === 1 ? 2 : 1);
            setStrikes(0);
          }
        }, 2000);

        return () => clearTimeout(timeout);
      }
    }, 1000);

    return () => clearTimeout(timeout);
  };

  const revealAnswer = (answer: AnswerType) => {
    if (isRoundEnded) {
      setCompleted([...completed, answer.id]);
      playSound('correct');
    }
  };

  return (
    <>
      <div className='board'>
        <Avatar team={teams[0]} isActive={activeTeam === 1} />
        <div className='container'>
          <main>
            <ScoreCounter score={score} />
            <AnswerGrid
              answers={survey.answers}
              completed={completed}
              isRoundEnded={isRoundEnded}
              revealAnswer={revealAnswer}
            />
          </main>
          <Footer onSubmit={handleSubmit} />
        </div>
        <Avatar team={teams[1]} isActive={activeTeam === 2} />
      </div>
      {showStrikes && <Strike strikes={strikes} />}
      <audio ref={audioRef}>
        Your browser does not support the audio element.
      </audio>
    </>
  );
};

export default Board;
