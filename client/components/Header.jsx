const Header = ({ note, role }) => {
  return (
    <div className="flex justify-between items-center bg-transparent text-contessa-50 font-semibold border-b-contessa-800 border-b h-full">
      <div className="flex gap-2 p-2 items-center bg-transparent">
        <p className="text-3xl text-red-300">Team A</p>
      </div>
      <div className="flex flex-col justify-center items-center">
        <p className="font-extrabold text-2xl text-red-500">{note}</p>
        <p className="text-red-300">Bạn là {role}</p>
      </div>
      <div className="flex gap-2 p-2 items-center">
        <p className="text-3xl text-red-300">Team B</p>
      </div>
    </div>
  );
};
export default Header;
