import { characters2 } from "../src/character";

const CharLogo = ({
  char,
  setCurrentPick,
  currentPick,
  banCardsByA,
  banCardsByB,
}) => {
  const rarity = characters2.filter((ch) => ch.name === char)[0]
    .rarity;

  const isBan =
    banCardsByA.includes(char) || banCardsByB.includes(char);

  return (
    <div
      className={`h-18 w-18 p-1 flex items-center justify-center hover:scale-110 border border-contessa-200 hover:border-contessa-500 transition ${
        isBan ? "cursor-not-allowed" : "cursor-pointer"
      } ${rarity === 5 ? "bg-yellow-300/70" : "bg-purple-300/70"} ${
        currentPick === char ? "border-contessa-500 border-2" : ""
      }`}
      onClick={() => setCurrentPick(char)}
    >
      <img src={`/icon/${char}/icon.png`} className="object-fit" />
    </div>
  );
};
export default CharLogo;
