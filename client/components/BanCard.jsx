const BanCard = ({ card }) => {
  return (
    <div
      className={`h-6 w-6 lg:h-8 lg:w-8 rounded-md  border-contessa-600 border ${
        card === "skip" ? "bg-red-900" : ""
      }`}
    >
      {card && card !== "skip" && (
        <img
          src={`/icon/${card}/icon.png`}
          alt=""
          className="object-cover"
        />
      )}
    </div>
  );
};
export default BanCard;
