import { useRef } from 'react';

const Footer = ({
	onSubmit,
	isRoundEnded
}: {
	onSubmit: Function;
	isRoundEnded: boolean;
}) => {
	const formRef = useRef();

	const handleSubmit = (e: SubmitEvent) => {
		e.preventDefault();
		onSubmit(e.target.guess?.value);
		formRef.current?.reset();
	};

	return (
		<footer>
			<form ref={formRef} onSubmit={handleSubmit}>
				<input name='guess' autoComplete='off' disabled={isRoundEnded} />
				{/* <button disabled={isRoundEnded}>
					<ArrowUpIcon />
				</button> */}
			</form>
		</footer>
	);
};

export default Footer;
