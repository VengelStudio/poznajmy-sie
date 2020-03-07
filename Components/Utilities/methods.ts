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
  currentQuestionIndex,
}: IGlobalState) => {
  console.log(filteredQuestions);
  console.log(currentQuestionIndex);
  if (filteredQuestions.length > 0) {
    const index = currentQuestionIndex % filteredQuestions.length;
    return filteredQuestions[index];
  } else {
    return null;
  }
};
