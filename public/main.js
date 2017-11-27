const socket = io.connect(location.href);

  // dom
const message = document.querySelector('#message'),
      handle = document.querySelector('#name'),
      btn = document.querySelector('#send'),
      output = document.querySelector('#output'),
      feedback = document.querySelector('#feedback'),
      clean = document.querySelector('#clean');
      // event
      btn.addEventListener('click', () => {
        if (message.value != '' && handle.value != '') {
          socket.emit('chat', {
            message: message.value,
            handle: handle.value
          });
        } else {
          alert('All fields are required!');
        }
        message.value = '';
      });

      message.addEventListener('keypress', () => {
        socket.emit('typing', handle.value);
      });

      socket.on('chat', data => {
        output.innerHTML += `<p><strong>${data.handle}: </strong>${data.message}</p>`;
      });
      let timer = setTimeout(makeNoTypingState, 1000);
      socket.on('typing', data => {
        feedback.innerHTML = `<p><em>${data} is typing a message...</em></p>`;
        clearTimeout(timer);
        timer = setTimeout(makeNoTypingState, 1000);
      });
      function makeNoTypingState() {
        feedback.innerHTML = "";
      }﻿
