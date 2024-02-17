const users = document.querySelector(".users");
const subscriptions = document.querySelector(".subscriptions");
const popup = document.querySelector(".pseudonim-form");

export class ChatApi {
  constructor() {
    if (
      window.location.hostname === "localhost" ||
      window.location.hostname === "127.0.0.1"
    ) {
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
export function addNickToContainer(data, myNickName) {
  users.innerHTML = "";

  const arr = data.split(",");
  arr.forEach((element) => {
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
export function addMessageToContainer(data, myNickName) {
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
