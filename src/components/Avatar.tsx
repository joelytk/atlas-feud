import KlFood from '../assets/images/kl-food.jpg';
import PenangFood from '../assets/images/penang-food.jpg';

const Avatar = () => {
  return (
    <div>
      <img src={PenangFood} alt='Penang food' className='avatar' />
      <img src={KlFood} alt='Penang food' className='avatar' />
    </div>
  );
};

export default Avatar;
