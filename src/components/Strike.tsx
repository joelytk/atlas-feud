import StrikeIndicator from '../assets/images/strike.webp';

const Strike = ({ strikes }: { strikes: number }) => {
  return (
    <div className='strike-overlay'>
      {[...Array(strikes).keys()].map(strike => (
        <div key={strike} className='strike-container'>
          <img
            src={StrikeIndicator}
            alt='Strike indicator'
            className='strike-indicator'
          />
        </div>
      ))}
    </div>
  );
};

export default Strike;
