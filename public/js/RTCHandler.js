import * as wss from "./wss.js";
import * as constant from "./constant.js";
import * as ui from "./ui.js";

let connectedUserDetails;

export const sendPreOffer = (callType, calleePersonalCode) => {
  const connectedUserDetails = {
    socketId: calleePersonalCode,
    callType,
  };

  if (
    callType === constant.callType.CHAT_PERSONAL_CODE ||
    callType === constant.VIDEO_PERSONAL_CODE
  ) {
    //this is a data of the user we are trying to reach
    const data = {
      callType,
      calleePersonalCode,
    };
    //sending another type of preoffer data to wss.js
    ui.showCallingDialog(callingDialogRejectHandler);
    wss.sendPreOffer(data);
  }
};

//this variable store the caller data to our own state

export const handlePreOffer = (data) => {
  const { callType, callerId } = data;

  connectedUserDetails = {
    socketId: callerId,
    callType,
  };

  //sending the dialog to the ui to recieve the dialog on the UI
  if (
    callType === constant.callType.CHAT_PERSONAL_CODE ||
    callType === constant.callType.VIDEO_PERSONAL_CODE
  ) {
    ui.showIncomingCallDialog(callType, acceptCallHandler, rejectCallHandler);
  }
};

const acceptCallHandler = () => {
  console.log("Call Accepted");
  sendPreOfferAnswer(constant.preOfferAnswer.CALL_ACCEPTED);
};
const rejectCallHandler = () => {
  console.log("Call Rejected");
  sendPreOfferAnswer(constant.preOfferAnswer.CALL_REJECTED);
};
const callingDialogRejectHandler = () => {
  console.log("Stop calling the user");
};

//this function is used to answer a call from a user
const sendPreOfferAnswer = (preOfferAnswer) => {
  const data = {
    callerSocketId: connectedUserDetails.socketId,
    preOfferAnswer,
  };
  wss.sendPreOfferAnswer(data);
};

const handlePreOfferAnswer = (data) => {
  const { preOfferAnswer } = data;

  if (preOfferAnswer === constant.preOfferAnswer.CALL_ACCEPTED) {
    console.log({ data, success: true });
    //send a dialog to the server
  }
  if (preOfferAnswer === constant.preOfferAnswer.CALL_REJECTED) {
    //send a dialog to the server
  }
  if (preOfferAnswer === constant.preOfferAnswer.CALL_UNAVAILABLE) {
    //send a dialog to the server
  }
  if (preOfferAnswer === constant.preOfferAnswer.CALLEE_NOT_FOUND) {
  }
};
