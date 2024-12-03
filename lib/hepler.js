import { userSocketIDs } from "../app.js";

export const getOtherMember = (members, userId) => {
  return members.find((member) => member._id.toString() !== userId.toString());
};

export const getSockets = (users = []) => {
  // console.log(users);

  const sockets = users.map((user) => userSocketIDs.get(user.toString()));
  // console.log(sockets);

  return sockets;
};

export const getBase64 = (file) =>
  `data:${file.mimetype};base64,${file.buffer.toString("base64")}`;
