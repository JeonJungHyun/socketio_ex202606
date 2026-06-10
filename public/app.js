const socket = io();

const statusEl = document.querySelector('#status');
const messagesEl = document.querySelector('#messages');
const formEl = document.querySelector('#message-form');
const inputEl = document.querySelector('#message-input');

function setStatus(label, className) {
  statusEl.textContent = label;
  statusEl.className = `status ${className}`;
}

function addMessage({ text, type = 'chat', meta = '' }) {
  const item = document.createElement('li');
  item.className = `message message--${type}`;

  const body = document.createElement('p');
  body.textContent = text;
  item.append(body);

  if (meta) {
    const small = document.createElement('small');
    small.textContent = meta;
    item.append(small);
  }

  messagesEl.append(item);
  messagesEl.scrollTop = messagesEl.scrollHeight;
}

socket.on('connect', () => {
  setStatus('Online', 'status--online');
});

socket.on('disconnect', () => {
  setStatus('Offline', 'status--offline');
});

socket.on('system:message', (message) => {
  addMessage({ text: message, type: 'system' });
});

socket.on('chat:message', (message) => {
  const sentAt = new Date(message.sentAt).toLocaleTimeString('ko-KR', {
    hour: '2-digit',
    minute: '2-digit'
  });

  addMessage({
    text: message.text,
    type: message.id === socket.id ? 'mine' : 'chat',
    meta: sentAt
  });
});

formEl.addEventListener('submit', (event) => {
  event.preventDefault();

  const message = inputEl.value.trim();
  if (!message) {
    return;
  }

  socket.emit('chat:message', message);
  inputEl.value = '';
  inputEl.focus();
});
