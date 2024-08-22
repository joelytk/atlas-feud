import { useEffect, useState } from 'react';

import AnswerGrid from './AnswerGrid';
import ArrowRightIcon from './ArrowRightIcon';
import Avatar from './Avatar';
import Footer from './Footer';
import Header from './Header';
import ScoreCounter from './ScoreCounter';
import Strike from './Strike';

import useAudio from '../hooks/useAudio';

import SplashScreen from '../screens/SplashScreen';
import WinnerScreen from '../screens/WinnerScreen';

import AnswerType from '../types/Answer';

const Board = () => {
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
	const [winner, setWinner] = useState('');
	const [isSteal, setIsSteal] = useState(false);

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

	const handleNext = () => {
		if (questionIndex === 0) {
			nextQuestion();
		} else {
			endGame();
			playSound('intro');
		}
	};

	const nextQuestion = () => {
		setCompleted([]);
		setSurvey(data[1]);
		setQuestionIndex(1);
		setScoreMultiplier(2);
		setScore(0);
		setStrikes(0);
		setIsRoundEnded(false);
		setIsSteal(false);
	};

	const playRoundWinSound = () => {
		const timeout = setTimeout(() => {
			playSound('round-win');
		}, 2000);

		return () => clearTimeout(timeout);
	};

	const checkIfRoundHasEnded = (completed: number[], status: string) => {
		if (
			!isSteal &&
			completed.length > 0 &&
			completed.length === survey.answers?.length
		) {
			setIsRoundEnded(true);
			assignScore(score, activeTeam);
			playRoundWinSound();
		} else if (isSteal && status === 'correct') {
			setIsRoundEnded(true);
			playRoundWinSound();
			assignScore(score, activeTeam);
		} else if (isSteal && status === 'wrong') {
			setIsRoundEnded(true);
			playRoundWinSound();
			assignScore(score, activeTeam === 1 ? 2 : 1);
		}
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
			const foundAnswer = survey.answers?.find(
				({ acceptedAnswers }: { acceptedAnswers: string[] }) =>
					acceptedAnswers.includes(guess.toLowerCase())
			);

			if (foundAnswer) {
				if (completed.includes(foundAnswer.id)) {
					alert('Answer is already on the board!');
				} else {
					playSound('correct');
					setScore(score + foundAnswer.score * scoreMultipler);
					setCompleted([...completed, foundAnswer.id]);
					checkIfRoundHasEnded([...completed, foundAnswer.id], 'correct');
				}
			} else {
				playSound('wrong');
				setShowStrikes(true);
				setStrikes(strikes + 1);
				checkIfRoundHasEnded(completed, 'wrong');

				const timeout = setTimeout(() => {
					setShowStrikes(false);

					if (strikes + 1 === 3) {
						setActiveTeam(activeTeam === 1 ? 2 : 1);
						setIsSteal(true);
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
			<SplashScreen playSound={playSound} />
			{winner && <WinnerScreen winner={winner} />}
			<div className='board'>
				<Avatar
					team={teams[0]}
					isActive={activeTeam === 1}
					setActiveTeam={setActiveTeam}
				/>
				<div className='container'>
					<Header question={survey.question} />
					<main>
						<ScoreCounter score={score} />
						<AnswerGrid
							answers={survey.answers}
							completed={completed}
							isRoundEnded={isRoundEnded}
							revealAnswer={revealAnswer}
						/>
					</main>
					<Footer isRoundEnded={isRoundEnded} onSubmit={handleSubmit} />
				</div>
				<Avatar
					team={teams[1]}
					isActive={activeTeam === 2}
					setActiveTeam={setActiveTeam}
				/>
			</div>
			{isRoundEnded && (
				<button className='fab' onClick={handleNext}>
					<ArrowRightIcon />
				</button>
			)}
			{showStrikes && <Strike strikes={strikes} />}
			<audio ref={audioRef}>
				Your browser does not support the audio element.
			</audio>
		</>
	);
};

export default Board;
