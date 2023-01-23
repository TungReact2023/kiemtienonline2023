const express = require("express");
const app = express();
const http = require("http");
const cors = require("cors");
const { Server } = require("socket.io");
app.use(cors());

    // create http server and wrap the express app
    const server = http.createServer(app);
    // bind socket.io to that server
    // const io = socketio(server);
    // example on how to serve a simple API
    app.get("/random", (req, res) => res.send(generateRandomNumber()));
    app.get('/', (req, res) => {
      res.send(`
          <!DOCTYPE html>
          <html>
          <head>
              <title>My Website</title>
          </head>
          <body>
         
              <h1>Welcome to my website!</h1>
              <p>This is the homepage.</p>
          </body>
          </html>
      `);
  });

    // // example on how to serve static files from a given folder
    app.use(express.static("public"));

const io = new Server(server, {
  cors: {
    origin: "https://kiemtienonline2023.web.app/",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
   
   socket.emit("portkhach", socket.request.connection.remotePort)
   console.log("port", socket.request.connection.remotePort);
   socket.on("clientTime", date => 
   socket.emit("timecilent", date)
   
   ); })
  
server.listen(4091, () => {
  console.log("SERVER RUNNING");
});
