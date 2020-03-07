import {IGlobalState} from 'Components/Context/context';

export const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

// get color from HSL wheel
export const getWheelColor = (id: number) => {
  var letters = '0F';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 2)];
  }
  return color;
};

export const getRandomQuestion = ({
  filteredQuestions,
  currentQuestionId,
}: IGlobalState) => {
  console.log(filteredQuestions);
  console.log(currentQuestionId);
  if (filteredQuestions.length > 0) {
    return filteredQuestions.filter(q => {
      return q.id === currentQuestionId;
    })[0];
  } else {
    return null;
  }
};
