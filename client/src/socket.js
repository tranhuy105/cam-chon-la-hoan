import { io } from "socket.io-client";

// "undefined" means the URL will be computed from the `window.location` object
const URL = "https://cam-chon-la-hoan-server.onrender.com";
// const URL = "http://localhost:3001"

export const socket = io(URL);
