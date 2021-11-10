import * as state from "./state.js";
import * as element from "./element.js";
import * as constant from "./constant.js";

//element
const codePara = document.getElementById("personal_code_paragraph");
const copyButton = document.getElementById("personal_code_copy_button");

//events
copyButton.addEventListener("click", copyCode);
//function as math
export const updateUserId = (socket) => {
  //setting the inner text to the codeparagraph
  codePara.textContent = socket;
};
//this code is used to copy the user socket id to the clipboard
function copyCode() {
  const code = state.getState().socketId;
  navigator.clipboard && navigator.clipboard.writeText(code);
}

export const showIncomingCallDialog = (
  callType,
  acceptCallHandler,
  rejectCallHandler
) => {
  const callTypeInfo =
    callType === constant.callType.CHAT_PERSONAL_CODE ? "Chat" : "Video";
  //sending the result to the element js to create a dialog
  const incomingCall = element.getIncomingCallDialog(
    callTypeInfo,
    acceptCallHandler,
    rejectCallHandler
  );
  const dialog = document.getElementById("dialog");
  //remove all the dialog inside
  dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());
  //then append a new incoming call
  dialog.appendChild(incomingCall);
};

export const showCallingDialog = (rejctCallHandler) => {
  const callingDialog = element.getCallingDialog(rejctCallHandler);
  const dialog = document.getElementById("dialog");
  //remove all the dialog inside
  dialog.querySelectorAll("*").forEach((dialog) => dialog.remove());
  //then append a new incoming call
  dialog.appendChild(callingDialog);
};
