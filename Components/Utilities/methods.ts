import {IGlobalState} from 'Components/Context/context';

export const getRandomColor = () => {
  var letters = '0123456789ABCDEF';
  var color = '#';
  for (var i = 0; i < 6; i++) {
    color += letters[Math.floor(Math.random() * 16)];
  }
  return color;
};

const randomBrightness = () => {
  return Math.floor(Math.random() * 20) + 40;
};

// get color from HSL wheel
export const generateRandomColors = (numberOfPeople: number) => {
  // const startingAngle = Math.floor(Math.random() * 360);
  const startingAngle = 0;
  let colors = [];
  colors.push(`hsl(${startingAngle}, 50%, 50%)`);

  const degreesToJump = 360 / numberOfPeople;
  for (let i = 1; i < numberOfPeople; i++) {
    colors.push(
      `hsl(${(degreesToJump * i) % 360}, 50%, ${randomBrightness()}%)`,
    );
  }

  return colors;
};

export const getRandomQuestion = ({
  filteredQuestions,
  currentQuestionIndex,
}: IGlobalState) => {
  if (filteredQuestions.length > 0) {
    const index = currentQuestionIndex % filteredQuestions.length;
    return filteredQuestions[index];
  } else {
    return null;
  }
};

const emojis = [
  '🐵',
  '🐶',
  '🕷',
  '🦊',
  '🦝',
  '🐱',
  '🦄',
  '🦁',
  '🐴',
  '🐮',
  '🐷',
  '🐭',
  '🐼',
  '🐔',
  '🐸',
  '🐌',
  '🐋',
  '🐢',
  '🐺',
  '🐍',
];

export const getEmoji = (index: number) => emojis[index];
