import KlFood from '../assets/images/kl-food.jpg';
import PenangFood from '../assets/images/penang-food.jpg';

const WinnerScreen = ({ winner = 'Penang' }: { winner: string }) => {
  let imageSrc = '';

  switch (winner) {
    case 'Penang':
      imageSrc = PenangFood;
      break;
    case 'KL':
      imageSrc = KlFood;
      break;
    default:
      break;
  }

  return (
    <div className='winner-screen'>
      <h1 style={{ fontSize: '6rem' }}>Congrats, {winner}!</h1>
      <img
        src={imageSrc}
        alt={`${winner} food`}
        className='avatar'
        style={{ width: '20rem', height: '20rem' }}
      />
      <div className='firework'></div>
      <div className='firework'></div>
      <div className='firework'></div>
    </div>
  );
};

export default WinnerScreen;
