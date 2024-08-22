import { useEffect, useState } from 'react';

import FamilyFeudLogo from '../assets/images/family_feud_logo.png';

const SplashScreen = ({ playSound }: { playSound: Function }) => {
	const [containerClassName, setContainerClassName] = useState('');
	const [imageClassName, setImageClassName] = useState('spin');
	const [showLogo, setShowLogo] = useState(false);

	useEffect(() => {
		if (showLogo) {
			const timeout = setTimeout(() => {
				setContainerClassName('slide-up');
				setImageClassName('');
			}, 15000);

			return () => clearTimeout(timeout);
		}
	}, [showLogo]);

	return (
		<div className={`splash-screen ${containerClassName}`}>
			{showLogo ? (
				<img
					src={FamilyFeudLogo}
					alt='Family feud logo'
					className={imageClassName}
				/>
			) : (
				<button
					style={{
						fontSize: '3rem',
						width: 'auto',
						height: 'auto',
						padding: '1rem'
					}}
					onClick={() => {
						setShowLogo(true);
						playSound('intro');
					}}
				>
					Start
				</button>
			)}
		</div>
	);
};

export default SplashScreen;
