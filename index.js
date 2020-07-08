// DOM Element
var heading = document.querySelector('.heading');
var start_btn = document.querySelector('.btn-start');
var clock = document.querySelector('.time');
var question__title = document.querySelector('.question__title');
var question__selections = document.querySelector('.question__selections');
var user__result = document.querySelector('.user__result');

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

//create a function for render a single question
var renderQuestion = (i) => {
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
};

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

  renderQuestion(index);
});
