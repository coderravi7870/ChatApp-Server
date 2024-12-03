const corsOptions = {
    origin: [
      "http://localhost:3005",
      "http://localhost:4173",
      process.env.CLIENT_URL,
    ],
    methods: ["GET", "POST", "PUT", "DELETE"],
    credentials: true,
  };
  
  const CHATTU_TOKEN = "ChatRoom_Token";
  
  export { corsOptions, CHATTU_TOKEN };