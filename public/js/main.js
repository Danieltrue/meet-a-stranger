import * as state from "./state.js";
import * as wss from "./wss.js";
import * as wrtch from "./RTCHandler.js";
import * as constant from "./constant.js";
//connecting the socket io with the frontend!
const socket = io("/");
//make the connection
wss.regSocketEvents(socket);

//element
//the button selected is for the chatting with specific user who you found their id
const perCodeVideoBtn = document.getElementById("personal_code_video_button");
const perCodeChatBtn = document.getElementById("personal_code_chat_button");
const codeInputLabel = document.getElementById("personal_code_input");

//function
perCodeChatBtn.addEventListener("click", () => {
  const callePersonalCode = codeInputLabel.value;
  //setting the calltype from the button
  const callType = constant.callType.CHAT_PERSONAL_CODE;
  //passing the user you want to reah code to the preoffer
  wrtch.sendPreOffer(callType, callePersonalCode);
});
perCodeVideoBtn.addEventListener("click", () => {
  const callePersonalCode = codeInputLabel.value;
  //setting the calltype from the button
  const callType = constant.callType.VIDEO_PERSONAL_CODE;
  //passing the user you want to reah code to the preoffer
  wrtch.sendPreOffer(callType, callePersonalCode);
});
