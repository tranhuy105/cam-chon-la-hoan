import BanCard from "./BanCard";

const BanCards = ({ banCards }) => {
  return (
    <div className="flex lg:gap-3 gap-1">
      {banCards.map((banCard, index) => (
        <BanCard card={banCard} key={index} />
      ))}
      {/* NEU CHUA DU 4 THI THEM PLACEHOLDER */}
      {[...Array(Math.max(0, 4 - banCards.length))].map(
        (_, index) => (
          <BanCard card="" key={index + 100} />
        )
      )}
    </div>
  );
};
export default BanCards;
