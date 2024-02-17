const nameSend = document.querySelector(".input-class");
const chatSend = document.querySelector(".chat-message");

let myNickName;

import { ChatApi } from "./chat";
import { webSocketClient } from "./ws";

const ws = new webSocketClient();
window.api = new ChatApi();

nameSend.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();
    if (nameSend.value == "") return;
    myNickName = nameSend.value;
    console.log("отправка checkNickname на сервер");
    ws.checkNickname(myNickName);
  }
});

chatSend.addEventListener("keydown", (e) => {
  if (e.key === "Enter") {
    e.preventDefault();

    if (chatSend.value == "") return;

    let messageValue = document.querySelector(".chat-message").value;

    ws.sendMessage(messageValue, myNickName);

    document.querySelector(".chat-message").value = "";
  }
});
