import {Question} from './data.interface';

export const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

export const getRandomQuestion = (questions: Question[]) => {
  if (questions.length > 0) {
    return questions[Math.floor(Math.random() * questions.length)];
  } else {
    return null;
  }
};
