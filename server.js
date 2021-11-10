const express = require("express");
const http = require("http");
const dotenv = require("dotenv").config({ path: "./" });
const colors = require("colors");
//PORT
const PORT = process.env.PORT || 3000;
//Creating and Express intialization
const app = express();
const server = http.createServer(app);
//Creating the io server and connecting it to the server
const io = require("socket.io")(server);
//Setting the static file to be accessible outside our server
app.use(express.static("public"));
//Sending the public folder
app.get("/", (req, res, next) => {
  res.send(__dirname + "/public/index.html");
});
//Listening for connections on the server from the frontend!
let connectedPeers = [];
io.on("connection", (socket) => {
  //push connected users into this connected pair array
  connectedPeers.push(socket.id);
  console.log(connectedPeers);
  //recieving data from the client called pre-offer
  socket.on("pre-offer", (data) => {
    const { calleePersonalCode, callType } = data;
    //find if the user sent a call is online in the connected Peers
    const foundCallee = connectedPeers.find((peerId) => {
      return peerId === calleePersonalCode;
    });
    //check if the user was found online
    if (connectedPeers) {
      const callData = {
        callerId: socket.id,
        callType,
      };
      //emit an event if the connected peers was found!
      io.to(calleePersonalCode).emit("pre-offer", callData);
    }
  });
  //the socket connection is used to establish an answer connection
  socket.on("pre-offer-answer", (data) => {
    //check if the user who is calling exist
    const foundCaller = connectedPeers.find((peerId) => {
      return peerId === callerSocketId;
    });
    if (foundCaller) {
      io.to(data.callerSocketId).emit("pre-offer-aswer", data);
    }
  });
  //if the io is disconnected
  socket.on("disconnect", () => {
    connectedPeers = connectedPeers.filter((peers) => peers != socket.id);
    console.log(connectedPeers);
  });
});
//Listening to server
server.listen(PORT, () =>
  console.log(`Server Running on Port ${PORT}`.bgYellow.black)
);
