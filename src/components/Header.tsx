const Header = ({ question, onClick }) => {
  return (
    <header onClick={onClick}>
      <h1>{question}</h1>
    </header>
  );
};

export default Header;
