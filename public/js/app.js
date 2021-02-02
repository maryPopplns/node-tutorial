const weatherForm = document.querySelector('form');
const search = document.querySelector('input');

const messageOne = document.querySelector('#message-1');
const messageTwo = document.querySelector('#message-2');

weatherForm.addEventListener('submit', (e) => {
  e.preventDefault();

  const location = search.value;

  messageTwo.textContent = '';

  messageOne.textContent = 'loading.....';

  fetch(`/weather?address=${location}`).then((res) => {
    res.json().then((data) => {
      if (data.error) {
        messageOne.textContent = '';
        messageTwo.textContent = data.error;
        return;
      }
      // console.log(data);
      messageOne.textContent = '';
      messageTwo.textContent = data.forecastData;
    });
  });
});
