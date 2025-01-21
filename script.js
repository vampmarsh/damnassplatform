const socket = io();

// Получение элементов
const messages = document.getElementById('messages');
const form = document.getElementById('message-form');
const input = document.getElementById('message-input');
const userCount = document.getElementById('user-count');

// Функция добавления сообщения
function appendMessage(text, type = 'other') {
    const messageElement = document.createElement('div');
    messageElement.textContent = text;
    messageElement.classList.add('message', type);
    messages.appendChild(messageElement);
    messages.scrollTop = messages.scrollHeight; // Автопрокрутка
}

// Обновление количества пользователей
socket.on('updateUserCount', (count) => {
    userCount.textContent = `Участники: ${count}`;
});

// Приём сообщений от сервера
socket.on('chatMessage', (msg) => {
    appendMessage(msg, 'other');
});

// Отправка сообщений
form.addEventListener('submit', (e) => {
    e.preventDefault();
    const message = input.value.trim();
    if (message) {
        appendMessage(message, 'self'); // Отображаем своё сообщение
        socket.emit('chatMessage', message); // Отправляем сообщение серверу
        input.value = ''; // Очищаем поле ввода
    }
});
