let state = {
  socketId: null,
  localStream: null,
  remoteStream: null,
  screenSharingStream: null,
  allowConnfromStrangers: false,
  screenSharingActive: false,
};

export const setSocketId = (socketId) => {
  state = {
    ...state,
    socketId,
  };
};
export const setLocalStream = (stream) => {
  state = {
    ...state,
    localStream: stream,
  };
};
export const setRemoteStream = (stream) => {
  state = {
    ...state,
    remoteStream: stream,
  };
};
export const setAllowConnfromStrangers = (allowConnection) => {
  state = {
    ...state,
    allowConnfromStrangers: allowConnection,
  };
};

export const setScreenSharingActive = (sharing) => {
  state = {
    ...state,
    screenSharingActive: sharing,
  };
};
export const setScreenSharingStream = (sharing) => {
  state = {
    ...state,
    screenSharingStream: sharing,
  };
};

export const getState = () => state;
