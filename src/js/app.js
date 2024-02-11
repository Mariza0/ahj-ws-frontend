const popup = document.querySelector('.pseudonim-form');

let flag = true;
console.log(flag,'flag')

document.addEventListener('DOMContentLoaded', () => {
  if (flag) {
    popup.style.display = "flex"
    flag = false;
  }
});

function scrollToBottom() {
  const messageContainer = document.querySelector('.subscriptions');
  messageContainer.scrollTop = messageContainer.scrollHeight;
}

const users = document.querySelector('.users');

// добавление нового участника в контейнер
function addNickToContainer(data, myNickName) {

  users.innerHTML = '';

  const arr = data.split(',');
  arr.forEach(element => {
    const nickElement = document.createElement('div');
    nickElement.className = "nick-name";
    nickElement.style.color = '#808080';
    nickElement.style.fontSize = '22px';

    if (element === myNickName) {
      nickElement.textContent = 'You';
      nickElement.style.color = 'red';

    } else {
      nickElement.textContent = element;
    }
    users.appendChild(nickElement);
  });
  
  // Добавляем сообщение в контейнер
  users.appendChild(nickElement);
  
  // // Прокручиваем контейнер вниз
  // scrollToBottom();
}

const subscriptions = document.querySelector('.subscriptions');

// добавление нового сообщения в контейнер
function addMessageToContainer(data, myNickName) {

  // Создаем элемент сообщения
  const nickElement = document.createElement('div');
  const messageElement = document.createElement('div');
  messageElement.style.fontSize = '20px';
  nickElement.style.fontSize = '16px';

  // если сообщения от меня
  if (data.nickname === myNickName) {

    // контейнер сообщений от меня
    const myMessage = document.createElement('div');
    myMessage.className = 'my-message';
    const myMessageContainer = document.createElement('div');
    myMessageContainer.className = 'my-message_container';

    nickElement.textContent = 'You' + ', ' + data.currentTime;
    nickElement.style.color = 'red';
    messageElement.textContent = data.message;

    subscriptions.appendChild(myMessageContainer);
    myMessageContainer.appendChild(myMessage);
    myMessage.appendChild(nickElement);
    myMessage.appendChild(messageElement);

  } else {

    //контейнер сообщений от юзеров
    const message = document.createElement('div');
    message.className = 'message';
    const messageContainer = document.createElement('div');
    messageContainer.className = 'message_container';

    nickElement.textContent = data.nickname + ', ' + data.currentTime;
    nickElement.style.color = '#808080';
    messageElement.textContent = data.message;

    subscriptions.appendChild(messageContainer);
    messageContainer.appendChild(message);
    message.appendChild(nickElement);
    message.appendChild(messageElement);

  }

  // Прокручиваем контейнер вниз
  scrollToBottom();
}



class SubscriptionApi {
  constructor(apiUrl) {
    this.apiUrl = apiUrl;
  }
}

const chat = document.querySelector('.chat');
const chatMessage = document.querySelector('.chat-message');
const chatSend = document.querySelector('.chat-message');

const nameSend = document.querySelector('.input-class');
let myNickName;

const ws = new WebSocket('ws://localhost:7070/ws');

ws.addEventListener('open', (e) => {
    console.log(e);
    console.log('ws open');
  });

nameSend.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {

    e.preventDefault();
    if (nameSend.value == '') return;
    myNickName = nameSend.value; 
    ws.send(JSON.stringify({ type: 'checkNickname', nickname: myNickName }));

  }
});

ws.addEventListener('message', (e) => {
  const data = JSON.parse(e.data);

  if (data.type === 'leaveChat') {

    console.log(`список пользователей ${data.activeUsers}`);
    console.log(myNickName,'myNickName')
    addNickToContainer(data.activeUsers, myNickName);
  }

  if (data.type === 'joinChat') {
    console.log(`событие ${data.type}`);
    console.log(`список пользователей ${data.activeUsers}`)
    addNickToContainer(data.activeUsers, myNickName);
  }
  if (data.type === 'nicknameStatus') {
    if (data.isAvailable) {
            
      // отправляем на сервер уведомление о присоединении к чату
      ws.send(JSON.stringify({ type: 'joinChat', nickname: data.nickname }));
      popup.style.display = 'none';
    } else {
        alert('Этот никнейм уже занят. Пожалуйста, выберите другой.');
    }
  } else if (data.type === 'message') {
      addMessageToContainer(data.message, myNickName);
    }
});

ws.addEventListener('close', (e) => {
  ws.send(JSON.stringify({ type: 'leaveChat', nickname: myNickName}));
  console.log('ws close'); 
});

ws.addEventListener('error', (e) => {
  console.log('ws error');
});
        
chatSend.addEventListener('keydown', (e) => {
  if (e.key === 'Enter') {

    e.preventDefault();
  
    if (chatSend.value == '') return;

      let messageValue = document.querySelector('.chat-message').value;
       ws.send(JSON.stringify({ type: 'sendMessage', message: messageValue, nickname: myNickName }));
       document.querySelector('.chat-message').value = '';
  }
});    
  
window.api = new SubscriptionApi('http://localhost:7070/');
