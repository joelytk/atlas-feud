import { useEffect, useState } from 'react';

import FamilyFeudLogo from '../assets/images/family_feud_logo.png';

const Splash = () => {
  const [containerClassName, setContainerClassName] = useState('');
  const [imageClassName, setImageClassName] = useState('spin');

  useEffect(() => {
    const timeout = setTimeout(() => {
      setContainerClassName('slide-up');
      setImageClassName('');
    }, 5000);

    return () => clearTimeout(timeout);
  }, []);

  return (
    <div className={`splash-screen ${containerClassName}`}>
      <img
        src={FamilyFeudLogo}
        alt='Family feud logo'
        className={imageClassName}
      />
    </div>
  );
};

export default Splash;
