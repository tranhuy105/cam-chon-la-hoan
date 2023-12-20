import PickCard from "./PickCard";

const PickCards = ({ pickCards }) => {
  return (
    <div className="h-full w-1/4 bg-contessa-200/20 text-contessa-50">
      <div className="flex flex-col justify-between items-center h-full">
        {pickCards.map((pickCard, index) => (
          <PickCard card={pickCard} key={index} />
        ))}
        {/* NEU CHUA DU 8 THI THEM PLACEHOLDER */}
        {[...Array(Math.max(0, 8 - pickCards.length))].map(
          (_, index) => (
            <PickCard card="none" key={index + 100} />
          )
        )}
      </div>
    </div>
  );
};
export default PickCards;
