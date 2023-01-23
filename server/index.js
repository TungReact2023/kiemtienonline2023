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

    // will fire for every new websocket connection
//     io.on("connection", (socket)=>{

// // echoes on the terminal every "hello" message this socket sends
//     socket.on("hello", helloMsg => console.info(`Socket ${socket.id} says: "${helloMsg}"`));
//     });
const io = new Server(server, {
  cors: {
    origin: "https://kiemtienonline2023.web.app/",
    methods: ["GET", "POST"],
  },
});
io.on("connection", (socket) => {
   socket.on("thongtinclient",  helloMsg =>  socket.emit("khachhangcilenserver", helloMsg));
  console.log(`User Connected: ${socket.id} dia chi ip cua khach la: ${socket.request.connection.remoteAddress}   port cua khach la: ${socket.request.connection.remotePort} `);
   socket.on("hello", helloMsg => console.info(`tttttttttttSocket ${socket.id} says: "${helloMsg}"`));
   socket.emit("ipkhach", socket.request.connection.remoteAddress);
   socket.emit("portkhach", socket.request.connection.remotePort)
   console.log("port", socket.request.connection.remotePort);
   socket.on("clientTime", date => 
   socket.emit("timecilent", date)
   
   );
  socket.on("join_room", (data) => {
     console.info(`Socket ${socket.id} says: "${data}"`);
     socket.join(data);
    console.log(`User with ID: ${socket.id} joined room: ${data}`);
  });
  socket.on("send_message", (data) => {
    socket.to(data.room).emit("receive_message", data);
    // console.log('New connection from ' + address.address + ':' + address.port);
  });
  socket.on("disconnect", () => {
    console.log("User Disconnected", socket.id);
  });
});
server.listen(4091, () => {
  console.log("SERVER RUNNING");
});
