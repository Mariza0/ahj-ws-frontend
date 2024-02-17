/******/ (() => { // webpackBootstrap
/******/ 	"use strict";
var __webpack_exports__ = {};

;// CONCATENATED MODULE: ./src/js/chat.js
const users = document.querySelector(".users");
const subscriptions = document.querySelector(".subscriptions");
const popup = document.querySelector(".pseudonim-form");
class ChatApi {
  constructor() {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      this.apiUrl = "http://localhost:7070/";
    } else {
      this.apiUrl = "https://ahj-ws-backend-7dj6.onrender.com:10000/";
    }
  }
}
let flag = true;
document.addEventListener("DOMContentLoaded", () => {
  if (flag) {
    popup.style.display = "flex";
    flag = false;
  }
});

// добавление нового участника в контейнер
function addNickToContainer(data, myNickName) {
  users.innerHTML = "";
  const arr = data.split(",");
  arr.forEach(element => {
    const nickElement = document.createElement("div");
    nickElement.className = "nick-name";
    nickElement.style.color = "#808080";
    nickElement.style.fontSize = "22px";
    if (element === myNickName) {
      nickElement.textContent = "You";
      nickElement.style.color = "red";
    } else {
      nickElement.textContent = element;
    }
    users.appendChild(nickElement);
  });
}

// добавление нового сообщения в контейнер
function addMessageToContainer(data, myNickName) {
  // Создаем элемент сообщения
  const nickElement = document.createElement("div");
  const messageElement = document.createElement("div");
  messageElement.style.fontSize = "20px";
  nickElement.style.fontSize = "16px";

  // если сообщения от меня
  if (data.nickname === myNickName) {
    // контейнер сообщений от меня
    const myMessage = document.createElement("div");
    myMessage.className = "my-message";
    const myMessageContainer = document.createElement("div");
    myMessageContainer.className = "my-message_container";
    nickElement.textContent = "You" + ", " + data.currentTime;
    nickElement.style.color = "red";
    messageElement.textContent = data.message;
    subscriptions.appendChild(myMessageContainer);
    myMessageContainer.appendChild(myMessage);
    myMessage.appendChild(nickElement);
    myMessage.appendChild(messageElement);
  } else {
    //контейнер сообщений от юзеров
    const message = document.createElement("div");
    message.className = "message";
    const messageContainer = document.createElement("div");
    messageContainer.className = "message_container";
    nickElement.textContent = data.nickname + ", " + data.currentTime;
    nickElement.style.color = "#808080";
    messageElement.textContent = data.message;
    subscriptions.appendChild(messageContainer);
    messageContainer.appendChild(message);
    message.appendChild(nickElement);
    message.appendChild(messageElement);
  }

  // Прокручиваем контейнер вниз
  const messageContainer = document.querySelector(".subscriptions");
  messageContainer.scrollTop = messageContainer.scrollHeight;
}
;// CONCATENATED MODULE: ./src/js/ws.js

let myNickName;
const ws_popup = document.querySelector(".pseudonim-form");
class webSocketClient {
  constructor() {
    if (window.location.hostname === "localhost" || window.location.hostname === "127.0.0.1") {
      this.ws = new WebSocket("ws://localhost:7070/ws");
    } else {
      this.ws = new WebSocket("wss://ahj-ws-backend-7dj6.onrender.com/");
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
        ws_popup.style.display = "none";
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
    this.send({
      type: "sendMessage",
      message: message,
      nickname: myNickName
    });
  }
  joinChat(nickname) {
    this.send({
      type: "joinChat",
      nickname
    });
  }
  checkNickname(nickname) {
    this.send({
      type: "checkNickname",
      nickname: nickname
    });
  }
  send(data) {
    if (this.ws.readyState === WebSocket.OPEN) {
      this.ws.send(JSON.stringify(data));
    } else {
      console.error("WebSocket connection is not open");
    }
  }
}
;// CONCATENATED MODULE: ./src/js/app.js
const nameSend = document.querySelector(".input-class");
const chatSend = document.querySelector(".chat-message");
let app_myNickName;


const ws = new webSocketClient();
window.api = new ChatApi();
nameSend.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (nameSend.value == "") return;
    app_myNickName = nameSend.value;
    console.log("отправка checkNickname на сервер");
    ws.checkNickname(app_myNickName);
  }
});
chatSend.addEventListener("keydown", e => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (chatSend.value == "") return;
    let messageValue = document.querySelector(".chat-message").value;
    ws.sendMessage(messageValue, app_myNickName);
    document.querySelector(".chat-message").value = "";
  }
});
;// CONCATENATED MODULE: ./src/index.js



// TODO: write your code in app.js
/******/ })()
;