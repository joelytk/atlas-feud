import { useRef } from 'react';

import ArrowUpIcon from './ArrowUpIcon';

const Footer = ({ onSubmit }: { onSubmit: Function }) => {
  const formRef = useRef();

  const handleSubmit = (e: SubmitEvent) => {
    e.preventDefault();
    onSubmit(e.target.guess?.value);
    formRef.current?.reset();
  };

  return (
    <footer>
      <form ref={formRef} onSubmit={handleSubmit}>
        <input name='guess' autoComplete='off' />
        <button>
          <ArrowUpIcon />
        </button>
      </form>
    </footer>
  );
};

export default Footer;
