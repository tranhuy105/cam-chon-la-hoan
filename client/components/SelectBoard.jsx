import { useEffect, useState } from "react";
import { Search } from "lucide-react";
import CharLogo from "./CharLogo";

const SelectBoard = ({
  chars,
  setCurrentPick,
  currentPick,
  banCardsByA,
  banCardsByB,
}) => {
  const [search, setSearch] = useState("");
  const [filteredChar, setFilteredChar] = useState(chars);

  useEffect(() => {
    if (search !== "" && search.length >= 2) {
      setFilteredChar((cur) => cur.filter((c) => c.includes(search)));
    } else {
      setFilteredChar(chars);
    }
  }, [search, chars]);

  return (
    <div className="mt-8 h-full pb-24">
      <div className="w-full px-4 py-2 flex items-center justify-between relative">
        <input
          type="text"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="bg-contessa-200/20 block w-full focus:outline-none px-3 py-2 peer"
        />

        <Search className="absolute mx-3 text-contessa-300 peer-focus-within:opacity-10 transition opacity-70 right-4" />
      </div>
      <div className="h-full overflow-y-scroll">
        <div className="w-18 h-18 grid gap-1 lg:grid-cols-10 grid-cols-6 overflow-x-hidden p-2 border">
          {filteredChar.map((char, index) => (
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
      </div>
    </div>
  );
};
export default SelectBoard;
