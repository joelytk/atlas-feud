import { useEffect, useRef } from 'react';

import Buzzer from '../assets/sounds/buzzer.mp3';
import Correct from '../assets/sounds/correct.mp3';
import Intro from '../assets/sounds/intro.mp3';
import Review from '../assets/sounds/review.mp3';
import RoundWin from '../assets/sounds/round-win.mp3';
import Wrong from '../assets/sounds/wrong.mp3';

const Audio = ({ sound, setSound }: { sound: string; setSound: Function }) => {
  const audioRef = useRef();

  useEffect(() => {
    const audioElement = audioRef.current;

    const playSound = () => {
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

      audioElement.src = Correct;
      audioElement.play();
    };

    const resetSound = () => setSound('');

    if (sound) {
      playSound();

      audioElement.addEventListener('ended', resetSound);

      return () => {
        audioElement.removeEventListener('ended', resetSound);
      };
    }
  }, [sound]);

  return (
    <audio ref={audioRef}>
      Your browser does not support the audio element.
    </audio>
  );
};

export default Audio;
