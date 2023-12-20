import CharLogo from "./CharLogo";

const SelectBoard = ({
  chars,
  setCurrentPick,
  currentPick,
  banCardsByA,
  banCardsByB,
}) => {
  return (
    <div className="h-full mt-8 grid gap-1 lg:grid-cols-10 grid-cols-6 overflow-y-scroll overflow-x-hidden p-2 border">
      {chars.map((char, index) => (
        <CharLogo
          char={char}
          key={index}
          setCurrentPick={setCurrentPick}
          currentPick={currentPick}
          banCardsByA={banCardsByA}
          banCardsByB={banCardsByB}
        />
      ))}
    </div>
  );
};
export default SelectBoard;
