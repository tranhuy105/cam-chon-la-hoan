import { socket } from "./socket";
import { useEffect, useState } from "react";
import Header from "../components/Header";
import PickCards from "../components/PickCards";
import BanCards from "../components/BanCards";
import SelectBoard from "../components/SelectBoard";
import { characters } from "../src/character";
import SelectRole from "../components/SelectRole";

function App() {
  const [chars, setChars] = useState(characters);
  const [currentPick, setCurrentPick] = useState("");
  const [pickCardsByA, setPickCardsByA] = useState([]);
  const [pickCardsByB, setPickCardsByB] = useState([]);
  const [banCardsByA, setBanCardsByA] = useState([]);
  const [banCardsByB, setBanCardsByB] = useState([]);

  const [role, setRole] = useState("");
  const [phase, setPhase] = useState(0);
  const [isValidToPick, setIsValidToPick] = useState(true);
  const [isValidToBan, setIsValidToBan] = useState(true);
  const [isWaiting, setIsWaiting] = useState(true);
  const [note, setNote] = useState("");
  const [randomNumber, setRandomNumber] = useState(null);

  useEffect(() => {
    const newRandomNumber = Math.floor(Math.random() * 3) + 1;
    setRandomNumber(newRandomNumber);
  }, []);

  useEffect(() => {
    const setPick = (r) => {
      setIsValidToPick(() => r === role);
      setIsValidToBan(false);
    };

    const setBan = (r) => {
      setIsValidToBan(r === role);
      setIsValidToPick(false);
    };

    switch (phase) {
      case 1:
        setBan("A");
        setNote("Đến lượt A ban");
        break;
      case 2:
        setBan("B");
        setNote("Đến lượt B ban");
        break;
      case 3:
        setBan("A");
        setNote("Đến lượt A ban");
        break;
      case 4:
        setBan("B");
        setNote("Đến lượt B ban");
        break;
      case 5:
        setPick("A");
        setNote("Đến lượt A pick");
        break;
      case 6:
        setPick("B");
        setNote("Đến lượt B pick");
        break;
      case 7:
        setPick("B");
        setNote("Đến lượt B pick");
        break;
      case 8:
        setPick("A");
        setNote("Đến lượt A pick");
        break;
      case 9:
        setPick("A");
        setNote("Đến lượt A pick");
        break;
      case 10:
        setPick("B");
        setNote("Đến lượt B pick");
        break;
      case 11:
        setPick("B");
        setNote("Đến lượt B pick");
        break;
      case 12:
        setPick("A");
        setNote("Đến lượt A pick");
        break;
      case 13:
        setBan("B");
        setNote("Đến lượt B ban");
        break;
      case 14:
        setBan("A");
        setNote("Đến lượt A ban");
        break;
      case 15:
        setBan("B");
        setNote("Đến lượt B ban");
        break;
      case 16:
        setBan("A");
        setNote("Đến lượt A ban");
        break;
      case 17:
        setPick("A");
        setNote("Đến lượt A pick");
        break;
      case 18:
        setPick("B");
        setNote("Đến lượt B pick");
        break;
      case 19:
        setPick("B");
        setNote("Đến lượt B pick");
        break;
      case 20:
        setPick("A");
        setNote("Đến lượt A pick");
        break;
      case 21:
        setPick("A");
        setNote("Đến lượt A pick");
        break;
      case 22:
        setPick("B");
        setNote("Đến lượt B pick");
        break;
      case 23:
        setPick("B");
        setNote("Đến lượt B pick");
        break;
      case 24:
        setPick("A");
        setNote("Đến lượt A pick");
        break;
      default:
        // Default case code (if needed)
        break;
    }
  }, [phase]);

  useEffect(() => {
    function OnAPick(char) {
      setPickCardsByA((cur) => [...cur, char]);
    }

    function OnBPick(char) {
      setPickCardsByB((cur) => [...cur, char]);
    }

    function onABan(char) {
      setBanCardsByA((cur) => [...cur, char]);
    }

    function onBBan(char) {
      setBanCardsByB((cur) => [...cur, char]);
    }

    function handleNextPhase() {}

    socket.on("APicked", ({ char }) => {
      OnAPick(char);
      setPhase((cur) => cur + 1);
    });

    socket.on("BPicked", ({ char }) => {
      OnBPick(char);
      setPhase((cur) => cur + 1);
    });

    socket.on("ABanned", ({ char }) => {
      onABan(char);
      setChars((cur) => cur.filter((c) => c !== char));
      setPhase((cur) => cur + 1);
    });

    socket.on("BBanned", ({ char }) => {
      onBBan(char);
      setChars((cur) => cur.filter((c) => c !== char));
      setPhase((cur) => cur + 1);
    });

    socket.on("nextPhase", handleNextPhase);

    socket.on("startRoom", () => {
      setIsWaiting(() => false);
    });

    socket.on("quitRoom", () => {
      setIsWaiting(() => true);
      setPhase(0);
      setChars(characters);
      setPickCardsByA([]);
      setPickCardsByB([]);
      setBanCardsByA([]);
      setBanCardsByB([]);
    });

    return () => {
      socket.off("APicked");
      socket.off("BPicked");
      socket.off("ABanned");
      socket.off("BBanned");
      socket.off("nextPhase");
      socket.off("timer");
      socket.off("startRoom");
      socket.off("quitRoom");
    };
  }, []);

  useEffect(() => {
    if (!isValidToBan && !isValidToPick) {
      if (role === "A") socket.emit("Adone");
      if (role === "B") socket.emit("Bdone");
    }
  }, [isValidToBan, isValidToPick]);

  useEffect(() => {
    if (role === "A") {
      socket.emit("Ajoin");
    } else if (role === "B") {
      socket.emit("Bjoin");
    }
  }, [role]);

  useEffect(() => {
    socket.on("Aok", () => {
      setPhase((c) => c + 1);
    });

    socket.on("Bok", () => {
      setPhase((c) => c + 1);
    });

    socket.on("AlreadyA", () => {
      alert("Đã có người chơi A");
      setRole("");
    });

    socket.on("AlreadyB", () => {
      alert("Đã có người chơi B");
      setRole("");
    });

    return () => {
      socket.off("Aok");
      socket.off("Bok");
      socket.off("AlreadyA");
      socket.off("AlreadyB");
    };
  }, []);

  const actionHandler = (action, side) => {
    if (currentPick) {
      if (
        side === "A" &&
        action === "pick" &&
        isValidToPick &&
        pickCardsByA.length < 8
      ) {
        socket.emit("Apick", { char: currentPick });
        setPickCardsByA((current) => [...current, currentPick]);
        setChars((current) =>
          current.filter((char) => char !== currentPick)
        );
        setCurrentPick(() => "");
        setPhase((cur) => cur + 1);
      }
      if (
        side === "B" &&
        action === "pick" &&
        isValidToPick &&
        pickCardsByB.length < 8
      ) {
        socket.emit("Bpick", { char: currentPick });
        setPickCardsByB((current) => [...current, currentPick]);
        setChars((current) =>
          current.filter((char) => char !== currentPick)
        );
        setCurrentPick(() => "");
        setPhase((cur) => cur + 1);
      }

      if (
        side === "A" &&
        action === "ban" &&
        isValidToBan &&
        !pickCardsByB.includes(currentPick) &&
        banCardsByA.length < 4
      ) {
        socket.emit("Aban", { char: currentPick });
        setBanCardsByA((current) => [...current, currentPick]);
        setChars((current) =>
          current.filter((char) => char !== currentPick)
        );
        setCurrentPick(() => "");
        setPhase((cur) => cur + 1);
      }

      if (
        side === "B" &&
        action === "ban" &&
        phase !== 1 &&
        isValidToBan &&
        !pickCardsByA.includes(currentPick) &&
        banCardsByB.length < 4
      ) {
        socket.emit("Bban", { char: currentPick });
        setBanCardsByB((current) => [...current, currentPick]);
        setChars((current) =>
          current.filter((char) => char !== currentPick)
        );
        setCurrentPick(() => "");
        setPhase((cur) => cur + 1);
      }
    }
  };

  return (
    <div className="h-screen bg-contessa-100">
      {role === "" ? (
        <SelectRole setRole={setRole} setPhase={setPhase} />
      ) : isWaiting ? (
        <div className="h-full flex items-center justify-center bg-contessa-300 font-extrabold text-4xl flex-col">
          <p>
            Vui lòng chờ người chơi{" "}
            {role === "A" ? "B" : role === "guest" ? "" : "A"}
          </p>
          <img src="https://i.redd.it/hfw3b5oqj3481.gif" />
          <audio src="amongus.mp3" loop className="hidden" autoPlay />
        </div>
      ) : (
        <div className=" relative bg-transparent h-screen overflow-hidden flex flex-col items-center justify-center">
          <div className="h-[10%] z-10 bg-transparent w-full">
            <Header phase={phase} role={role} note={note} />
          </div>
          <div className="flex items-start justify-between h-[90%] w-full bg-transparent z-10">
            <PickCards pickCards={pickCardsByA} />
            <div className="w-[60%] h-full p-2 flex flex-col">
              {/* HIEN THI CAC CHAR BI CAM */}
              <div className="flex items-center justify-center gap-5 lg:gap-7 w-full h-[60px] text-contessa-50">
                <BanCards banCards={banCardsByB.slice().reverse()} />
                <p className="text-red-300">BAN</p>
                <BanCards banCards={banCardsByA} />
              </div>
              {/* HIEN THI BANG CAC TUONG */}
              {role !== "guest" && (
                <div className="h-[480px] overflow-hidden">
                  <SelectBoard
                    setCurrentPick={setCurrentPick}
                    currentPick={currentPick}
                    chars={chars}
                    banCardsByA={banCardsByA}
                    banCardsByB={banCardsByB}
                  />
                </div>
              )}
              {/* BUTTON DE CONFIRM BAN PICK */}
              {role !== "guest" && (
                <>
                  <div
                    className="mt-2 h-[60px] flex items-center justify-center bg-contessa-200/40 hover:bg-contessa-300/40 transition cursor-pointer"
                    onClick={() => actionHandler("pick", role)}
                  >
                    <p>Lựa chọn</p>
                  </div>
                  <div
                    className="mt-2 h-[60px] flex items-center justify-center
                    bg-contessa-200/40 hover:bg-contessa-300/40 transition cursor-pointer flex-col"
                    onClick={() => actionHandler("ban", role)}
                  >
                    <p>Cấm</p>
                    <p className="text-xs">
                      (bạn và đối thủ sẽ không thể lựa chọn nhân vật
                      này)
                    </p>
                  </div>
                </>
              )}
            </div>
            <PickCards pickCards={pickCardsByB} />
          </div>
          <video
            autoPlay
            loop
            className="absolute w-auto min-w-full min-h-full max-w-none"
          >
            <source
              src={`video/${randomNumber}.mp4`}
              type="video/mp4"
            />
            Your browser does not support the video tag.
          </video>
        </div>
      )}
    </div>
  );
}

export default App;
