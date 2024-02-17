import { addNickToContainer, addMessageToContainer } from "./chat";
let myNickName;
const popup = document.querySelector(".pseudonim-form");

export class webSocketClient {
  constructor() {
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
      this.ws = new WebSocket("ws://localhost:7070/ws");
    } else {
      this.ws = new WebSocket("wss://mariza0.github.io/ahj-ws-frontend/");
    }
    this.ws.addEventListener("open", this.handleOpen.bind(this));
    this.ws.addEventListener("message", this.handleMessage.bind(this));
    this.ws.addEventListener("close", this.handleClose.bind(this));
    this.ws.addEventListener("error", this.handleError.bind(this));
  }

  handleOpen() {
    console.log("ws open");
  }

  handleMessage(e) {
    const data = JSON.parse(e.data);

    if (data.type === "leaveChat") {
      console.log(`список пользователей ${data.activeUsers}`);
      console.log(myNickName, "myNickName");
      addNickToContainer(data.activeUsers, myNickName);
    }

    if (data.type === "joinChat") {
      console.log(e, "e");
      console.log(`событие ${data.type}`);
      console.log(`список пользователей ${data.activeUsers}`);

      addNickToContainer(data.activeUsers, myNickName);
    }

    if (data.type === "nicknameStatus") {
      if (data.isAvailable) {
        // отправляем на сервер уведомление о присоединении к чату
        myNickName = data.nickname;
        this.joinChat(myNickName);
        popup.style.display = "none";
      } else {
        alert("Этот никнейм уже занят. Пожалуйста, выберите другой.");
      }
    }

    if (data.type === "message") {
      addMessageToContainer(data.message, myNickName);
    }
  }

  handleClose() {
    console.log("WebSocket connection closed");
  }

  handleError(error) {
    console.error("WebSocket error:", error);
  }

  sendMessage(message, myNickName) {
    this.send({ type: "sendMessage", message: message, nickname: myNickName });
  }

  joinChat(nickname) {
    this.send({ type: "joinChat", nickname });
  }

  checkNickname(nickname) {
    this.send({ type: "checkNickname", nickname: nickname });
  }

  send(data) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.error("WebSocket connection is not open");
    }
  }
}
