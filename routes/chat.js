import express from "express";
import { getMyProfile } from "../controllers/user.js";
import { isAuthenticated } from "../middlewares/auth.js";
import {
  getMyChats,
  newGroupChat,
  getMyGroups,
  addMembers,
  removeMembers,
  leaveGroup,
  sendAttachments,
  getChatDetails,
  renameGroup,
  deleteChat,
  getMessages,
} from "../controllers/chat.js";
import { attachmentsMulter } from "../middlewares/multer.js";
import {
  addMemberValidator,
  chatIdValidator,
  newGroupValidator,
  removeMemberValidator,
  renameValidator,
  sendattachmentsValidator,
  validateHandler,
} from "../lib/validator.js";

const app = express.Router();

// After here user must be logged in to access the routes

app.use(isAuthenticated);

app.post("/new", newGroupValidator(), validateHandler, newGroupChat);

app.get("/my", getMyChats);

app.get("/my/groups", getMyGroups);

app.put("/addmembers", addMemberValidator(), validateHandler, addMembers);

app.delete(
  "/removemember",
  removeMemberValidator(),
  validateHandler,
  removeMembers
);

app.delete("/leave/:id", chatIdValidator(), validateHandler, leaveGroup);

// send Attachments
app.post(
  "/message",
  attachmentsMulter,
  sendattachmentsValidator(),
  validateHandler,
  sendAttachments
);

// Get Message

app.get("/message/:id", chatIdValidator(), validateHandler, getMessages);

// Get Chat Details, rename, delete

// app.get("/chat/:id",A);
// app.put("/chat/:id",B);
// app.delete("/chat/:id",C);

app
  .route("/:id")
  .get(chatIdValidator(), validateHandler, getChatDetails)
  .put(renameValidator(), validateHandler,renameGroup)
  .delete(chatIdValidator(), validateHandler, deleteChat);

export default app;
