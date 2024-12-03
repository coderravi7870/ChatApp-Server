import { faker, simpleFaker } from "@faker-js/faker";
import { Chat } from "../models/chat.js";
import { Message } from "../models/message.js";
import { User } from "../models/user.js";


export const createSingleChats = async (numChats) => {
    try {
      const users = await User.find().select("_id");
  
      const chatsPromise = [];
  
      for (let i = 0; i < numChats; i++) {
        for (let j = i + 1; j < numChats; j++) {
          chatsPromise.push(
            Chat.create({
              name: faker.lorem.words(2),
              members: [users[i], users[j]],
            })
          );
        }
      }
  
      await Promise.all(chatsPromise);
      console.log("Chats created successfully");
  
      process.exit();
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  export const createGroupChats = async (numChats) => {
    try {
      const users = await User.find().select("_id");
  
      const chatsPromise = [];
  
      for (let i = 0; i < numChats; i++) {
        const numMembers = simpleFaker.number.int({
          min: 3,
          max: users.length,
        });
  
        const members = [];
  
        for (let i = 0; i < numMembers; i++) {
          const reandromIndex = Math.floor(Math.random() * users.length);
  
          const randomUser = users[reandromIndex];
  
          // Ensure the same user is not added twice
  
          if (!members.includes(randomUser)) {
            members.push(randomUser);
          }
        }
        const chat = Chat.create({
          groupChat: true,
          name: faker.lorem.words(1),
          members,
          creator: members[0],
        });
  
        chatsPromise.push(chat);
      }
  
      await Promise.all(chatsPromise);
      console.log("Group Chats created successfully");
  
      process.exit();
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  export const createMessage = async (numMessages) => {
    try {
      const users = await User.find().select("_id");
      const chats = await Chat.find().select("_id");
  
      const messagePromise = [];
  
      for (let i = 0; i < numMessages; i++) {
        const randomUser = users[Math.floor(Math.random() * users.length)];
  
        const randomChat = chats[Math.floor(Math.random() * chats.length)];
  
        messagePromise.push(
          Message.create({
            chat: randomChat,
            sender: randomUser,
            content: faker.lorem.sentence(),
          })
        );
      }
  
      await Promise.all(messagePromise);
      console.log("Messages created successfully");
  
      process.exit();
    } catch (error) {
      console.error(error);
      process.exit(1);
    }
  };
  
  export const createMessageInAChat = async (chatId,numMessages) => {
      try {
        const users = await User.find().select("_id");
       
        const messagePromise = [];
    
        for (let i = 0; i < numMessages; i++) {
          const randomUser = users[Math.floor(Math.random() * users.length)];    
    
          messagePromise.push(
            Message.create({
              chat: chatId,
              sender: randomUser,
              content: faker.lorem.sentence(),
            })
          );
        }
    
        await Promise.all(messagePromise);
        console.log("Messages created successfully");
    
        process.exit();
      } catch (error) {
        console.error(error);
        process.exit(1);
      }
    };