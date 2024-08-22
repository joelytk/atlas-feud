import KlFood from '../assets/images/kl-food.jpg';
import PenangFood from '../assets/images/penang-food.jpg';

import TeamType from '../types/Team';

const Avatar = ({
  team,
  isActive,
  setActiveTeam
}: {
  team: TeamType;
  isActive: boolean;
  setActiveTeam: Function;
}) => {
  let imageSrc = '';

  switch (team.name) {
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
    <div className='avatar-container'>
      <img
        src={imageSrc}
        alt={`${team.name} food`}
        className={`avatar ${isActive ? 'active' : ''}`}
        onClick={() => setActiveTeam(team.id)}
      />
      <p className='team-score'>{team.score}</p>
    </div>
  );
};

export default Avatar;
