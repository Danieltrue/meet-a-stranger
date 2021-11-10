import * as state from "./state.js";
import * as ui from "./ui.js";
import * as wrtch from "./RTCHandler.js";

let socketIO = null;
//registering the socket connection from the WSS file to the MAIN.JS file
export const regSocketEvents = (socket) => {
  socket.on("connect", () => {
    console.log(`${socket.id} is Now Connected to the Server`);
    socketIO = socket;
    //setting the socketid to the user state
    state.setSocketId(socket.id);
    //sending the user personal code to the UI to display onthe html page
    ui.updateUserId(socket.id);
  });
  //listen to incoming call from a user to a user with pre-offer
  socket.on("pre-offer", (data) => {
    wrtch.handlePreOffer(data);
  });
  //this  is a functionality that answers the user
  socket.on("pre-offer-answer", (data) => {
    wrtch.handlePreOfferAnswer(data);
  });
};

export const sendPreOffer = (data) => {
  // sending the data we got from the rthandler to the server
  socketIO.emit("pre-offer", data);
};

export const sendPreOfferAnswer = (data) => {
  socketIO.emit("pre-offer-answer", data);
};
