import express from "express";
import http from "http";
import { Server } from "socket.io";

//express는 http 프로토콜
const app = express();

app.set("view engine", "pug");
app.set("views", __dirname + "/views");
app.use("/public", express.static(__dirname + "/public"));
app.get("/", (req, res) => res.render("home"));
app.get("/*", (req, res) => res.redirect("/"));

const handleListen = () => {
  console.log("http://localhost:3000 & ws://localhost:3000");
};

//ws 는 웹소켓 프로토콜
//이렇게하면 http서버, webSocket서버 둘다 돌릴수있다
const httpServer = http.createServer(app);
const wsServer = new Server(httpServer);

wsServer.on("connection", (socket) => {
  console.log(socket);
});

// const wss = new WebSocket.Server({ server });
//누군가가 연결이 되면 이 배열에 추가해준다. => 그럼 1:1 이 아니라 서버를 통해 삼각형으로 메세지 주고받기 가능
// const sockets = [];

// wss.on("connection", (socket) => {
//   sockets.push(socket);
//   socket["nickname"] = "익명";
//   console.log("커넥트 브라우저 오케이");
//   socket.on("close", () => {
//     console.log("브라우저 연결 끊김");
//   });
//   //브라우저가 서버에 메세지를 보냈을때 일어나는 listener
//   socket.on("message", (msg) => {
//     const message = JSON.parse(msg);
//     switch (message.type) {
//       case "newMessage":
//         sockets.forEach((aSocket) =>
//           aSocket.send(`${socket.nickname}:${message.payload}`)
//         );
//         break;
//       case "nickname":
//         socket["nickname"] = message.payload;
//     }
//   });
// });

httpServer.listen(3000, handleListen);
