const PickCard = ({ card }) => {
  return (
    <div className="h-full w-full flex items-center justify-center text-2xl border-contessa-400 border">
      <div
        className={`w-[80px] h-[1/8]  rounded-md  border-contessa-600 ${
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
    </div>
  );
};
export default PickCard;
