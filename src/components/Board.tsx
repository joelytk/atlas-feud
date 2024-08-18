import { useEffect, useState } from 'react';

import AnswerType from '../types/Answer';

import AnswerGrid from './AnswerGrid';
import Question from './Question';
import ScoreCounter from './ScoreCounter';

import useAudio from '../hooks/useAudio';

const Board = () => {
	const [score, setScore] = useState<number>(0);
	const [question, setQuestion] = useState<string>('');
	const [answers, setAnswers] = useState([]);
	const [completed, setCompleted] = useState<number[]>([]);
	const { audioRef, playSound } = useAudio();

	useEffect(() => {
		playSound('intro');
	}, []);

	useEffect(() => {
		if (completed.length > 0 && completed.length === answers.length) {
			playSound('round-win');
		}
	}, [completed]);

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
		playSound('correct');
	};

	return (
		<div className='container'>
			<Question question={question} />
			<ScoreCounter score={score} />
			<AnswerGrid answers={answers} completed={completed} addScore={addScore} />
			<audio ref={audioRef}>
				Your browser does not support the audio element.
			</audio>
		</div>
	);
};

export default Board;
