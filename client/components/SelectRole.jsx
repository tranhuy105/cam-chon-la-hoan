const SelectRole = ({ setRole }) => {
  const handleSetRole = (role) => {
    if (role !== "") {
      setRole(() => role);
    }
  };

  return (
    <div className="flex items-center justify-center h-full bg-contessa-200">
      <div className="flex items-center justify-center flex-col bg-contessa-500 rounded-xl text-white">
        <h1 className="text-5xl font-bold bg-contessa-600 px-6 py-4 rounded-t-xl">
          Lựa chọn vai trò của bạn!
        </h1>
        <div
          className="px-3 py-4 hover:bg-contessa-800 transition h-full w-full text-center cursor-pointer"
          onClick={() => handleSetRole("A")}
        >
          Người chơi team A
        </div>
        <div
          className="px-3 py-4 hover:bg-contessa-800 transition h-full w-full text-center cursor-pointer"
          onClick={() => handleSetRole("B")}
        >
          Người chơi team B
        </div>
        <div
          className="px-3 py-4 hover:bg-contessa-800 transition h-full w-full text-center cursor-pointer rounded-b-xl"
          onClick={() => handleSetRole("guest")}
        >
          khán giả
        </div>
      </div>
    </div>
  );
};
export default SelectRole;
