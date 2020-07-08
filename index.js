/**********DOM**********/
var dropdown = document.querySelector('.dropdown-menu');
var clock = document.querySelector('.time');
var start_btn = document.querySelector('.btn-start');
var question__container = document.querySelector('.question__container');
var heading = document.querySelector('.heading');
var question__title = document.querySelector('.question__title');
var question__selections = document.querySelector('.question__selections');
var user__result = document.querySelector('.user__result');

/**********Init**********/
//Get users' data from localstorage
var users;

window.addEventListener('load', () => {
  if (localStorage.getItem('users')) {
    users = JSON.parse(localStorage.getItem('users'));
    users.forEach((user) => {
      dropdown.insertAdjacentHTML(
        'beforeend',
        ` <li class="dropdown-item d-flex justify-content-between"<span>${user.name}</span></span><span>${user.score}</span></li>`
      );
    });
  } else {
    users = [];
  }
});

//time limit
var time = 60;

//init score
var score = 0;

//init questions
var questions = [
  {
    title: 'Do you like pizza',
    slections: ['yes I do', 'no i do not'],
    answer: 'yes I do',
  },
  {
    title: 'Do you like apple',
    slections: ['yes', 'no '],
    answer: 'yes',
  },
];
// track question
var index = 0;

/**********Functionalities**********/

//game start
start_btn.addEventListener('click', () => {
  var game = setInterval(() => {
    clock.textContent = `Time: ${time}`;
    time--;
    if (time < 0) {
      clearInterval(game);
    }
  }, 1000);

  heading.style.display = 'none';
  start_btn.style.display = 'none';

  renderQuestion(0);
});

//create a function for render a single question
function renderQuestion(i) {
  //clear previous question
  question__selections.textContent = '';

  //render the current question
  question__title.textContent = questions[i].title;
  questions[i].slections.forEach((selection) => {
    var li = document.createElement('li');
    li.classList.add('list-group-item');
    li.innerHTML = `<button class="btn btn-primary text-capitalize select__btn" data-id="0">${selection}</button>`;
    question__selections.append(li);
  });

  //increase index by 1 for next render
  index++;
}

//check user's result
question__selections.addEventListener('click', (e) => {
  if (e.target.matches('button')) {
    if (
      e.target.textContent ===
      questions[e.target.getAttribute('data-id')].answer
    ) {
      score += 10;
      user__result.textContent = 'Correct!';
    } else {
      score -= 10;
      time -= 10;
      user__result.textContent = 'Wrong....';
    }
  }

  //clear the notification of user's result after 1s
  setTimeout(() => {
    user__result.textContent = '';
  }, 1000);

  //check if the game is over
  if (index < questions.length && time >= 0) {
    renderQuestion(index);
  } else {
    renderFinalPage();
  }
});

// render the final page
function renderFinalPage() {
  // clear all content inside of the question container
  question__container.innerHTML = `<form class="final__result p-5"><h2>Your Final Score is ${score} </h2><div class="input-group flex-nowrap"><div class="input-group-prepend"><label for="initial" class="input-group-text" id="addon-wrapping">Enter Initial</label></div><input type="text" class="form-control" id="initial" placeholder="Your Initial" aria-label="You Initial" required></div><button class="btn btn-success btn-lg return__btn mt-3">Go Back</button></form>`;

  var final__result = document.querySelector('.final__result');

  final__result.addEventListener('submit', (e) => {
    e.preventDefault();
    var userInital = document.querySelector('#initial');

    var user = { name: userInital.value, score: score };

    // Add the new player to localstorage
    users.push(user);
    localStorage.setItem('users', JSON.stringify(users));

    //redirect to loading page
    location.href = './index.html';
  });
}
