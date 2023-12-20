const http = require("http");
const { Server } = require("socket.io");

const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());

const server = http.createServer(app);

const io = new Server(server, {
  cors: {
    origin: "http://localhost:5173",
    methods: ["GET", "POST"],
  },
});

let playerADone = false;
let playerBDone = false;
let phase = 1;
let AjoinCount = 0;
let BjoinCount = 0;

io.on("connection", (socket) => {
  console.log(`user ${socket.id} connected`);

  socket.on("Apick", ({ char }) => {
    // A pick thi chi can hien len o B
    console.log(`A pick ${char}`);
    socket.broadcast.emit("APicked", { char });
  });

  socket.on("Bpick", ({ char }) => {
    // A pick thi chi can hien len o B
    console.log(`B pick ${char}`);
    socket.broadcast.emit("BPicked", { char });
  });

  socket.on("Aban", ({ char }) => {
    // A pick thi chi can hien len o B
    console.log(`A ban ${char}`);
    socket.broadcast.emit("ABanned", { char });
  });

  socket.on("Bban", ({ char }) => {
    // A pick thi chi can hien len o B
    console.log(`B ban ${char}`);
    socket.broadcast.emit("BBanned", { char });
  });

  socket.on("Ajoin", () => {
    if (AjoinCount === 0) {
      AjoinCount++;
      socket.role = "A";
      socket.emit("Aok");
      checkStartRoom();
    } else {
      socket.emit("AlreadyA");
    }
  });

  socket.on("Bjoin", () => {
    if (BjoinCount === 0) {
      BjoinCount++;
      socket.role = "B";
      socket.emit("Bok");
      checkStartRoom();
    } else {
      socket.emit("AlreadyB");
    }
  });

  function checkStartRoom() {
    console.log(AjoinCount, BjoinCount);

    if (AjoinCount === 1 && BjoinCount === 1) {
      io.emit("startRoom");
    } else {
      io.emit("quitRoom");
    }
  }

  socket.on("Adone", () => {
    console.log("A done");
    playerADone = true;
    if (playerBDone) {
      console.log(`move to phase ${++phase}`);
      playerADone = false;
      playerBDone = false;
      io.emit("nextPhase");
    }
  });

  socket.on("Bdone", () => {
    console.log("B done");
    playerBDone = true;
    if (playerADone) {
      console.log(`move to phase ${++phase}`);
      playerADone = false;
      playerBDone = false;
      io.emit("nextPhase");
    }
  });

  socket.on("disconnect", () => {
    console.log(`user ${socket.id} disconnected`);
    if (socket.role === "A") {
      AjoinCount--;
      console.log(AjoinCount);
    } else if (socket.role === "B") {
      BjoinCount--;
      console.log(BjoinCount);
    }
    checkStartRoom();
  });
});

server.listen(3001, () => {
  console.log("SERVER LISTENING ON PORT 3001");
});
