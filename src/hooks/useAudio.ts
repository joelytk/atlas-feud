import { useRef } from 'react';

import Buzzer from '../assets/sounds/buzzer.mp3';
import Correct from '../assets/sounds/correct.mp3';
import Intro from '../assets/sounds/intro.mp3';
import Review from '../assets/sounds/review.mp3';
import RoundWin from '../assets/sounds/round-win.mp3';
import Wrong from '../assets/sounds/wrong.mp3';

const useAudio = () => {
	const audioRef = useRef();

	const playSound = (sound: string) => {
		const audioElement = audioRef.current;
		let soundFile = null;

		switch (sound) {
			case 'buzzer':
				soundFile = Buzzer;
				break;
			case 'correct':
				soundFile = Correct;
				break;
			case 'intro':
				soundFile = Intro;
				break;
			case 'review':
				soundFile = Review;
				break;
			case 'round-win':
				soundFile = RoundWin;
				break;
			case 'wrong':
				soundFile = Wrong;
				break;
			default:
				break;
		}

		audioElement.src = soundFile;
		audioElement.play();

		// if (playPromise !== undefined) {
		// 	playPromise
		// 		.then(() => {
		// 			console.log('playing');
		// 		})
		// 		.catch(error => {
		// 			console.log({ playError: error });
		// 		});
		// }
		// audioElement.play();
	};

	return { audioRef, playSound };
};

export default useAudio;
