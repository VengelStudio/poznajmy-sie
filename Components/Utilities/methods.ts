import {IGlobalState} from 'Components/Context/context';
import {IWheelPie} from './models.interface';
import * as scale from 'd3-scale';
import * as shape from 'd3-shape';
import {PieArcDatum} from 'd3-shape';

const d3 = {
  scale,
  shape,
};

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

const emojisAssets = {
  emojiMouse: require('../../Assets/Emoji/1F401.png'),
  emojiCow: require('../../Assets/Emoji/1F404.png'),
  emojiElephant: require('../../Assets/Emoji/1F418.png'),
  emojiTurtle: require('../../Assets/Emoji/1F422.png'),
  emojiChicken: require('../../Assets/Emoji/1F425.png'),
  emojiPinguin: require('../../Assets/Emoji/1F427.png'),
  emojiRabbit: require('../../Assets/Emoji/1F430.png'),
  emojiCat: require('../../Assets/Emoji/1F431.png'),
  emojiMonkey: require('../../Assets/Emoji/1F435.png'),
  emojiDog: require('../../Assets/Emoji/1F436.png'),
  emojiPig: require('../../Assets/Emoji/1F437.png'),
  emojiUnicorn: require('../../Assets/Emoji/1F984.png'),
  emojiDuck: require('../../Assets/Emoji/1F986.png'),
  emojiShark: require('../../Assets/Emoji/1F988.png'),
  emojiDinosaur: require('../../Assets/Emoji/1F995.png'),
} as {
  [key: string]: any;
};

const assetArray = Object.keys(emojisAssets).map(key => emojisAssets[key]);

export const getEmojiImage = (index: number) => {
  const asset = assetArray[index];
  return asset;
};

export const getRandomSpinValue = () => {
  const val = Math.random();
  return val;
};

export const getWinnerColor = (value: number, wheelData: IWheelPie[]) => {
  const rawAngle = value * 6 * Math.PI;
  const cleanAngle = rawAngle % (2 * Math.PI);

  for (let i = wheelData.length - 1; i >= 0; i--) {
    if (2 * Math.PI - cleanAngle >= wheelData[i].startAngle) {
      return wheelData[i];
    }
  }
};

export const getWinnerIndex = (angle: number, wheelData: IWheelPie[]) => {
  const rawAngle = angle * 6 * Math.PI;
  const cleanAngle = rawAngle % (2 * Math.PI);

  for (let i = wheelData.length - 1; i >= 0; i--) {
    if (2 * Math.PI - cleanAngle >= wheelData[i].startAngle) {
      return i;
    }
  }
  return -1;
};

export const generatePieChart = (numberOfPeople: number, fullWidth: number) => {
  const data = new Array(numberOfPeople).fill(1); //number of people which user chose in options

  const pieChart = d3.shape.pie()(data);

  const generatedColors = generateRandomColors(numberOfPeople);

  return pieChart.map((pie, i) => {
    const paths = d3.shape
      .arc<PieArcDatum<any>>()
      .outerRadius(fullWidth / 2 - 15)
      .padAngle(0)
      .innerRadius(20)(pie);

    return {
      paths,
      color: generatedColors[i],
      startAngle: pie.startAngle,
      endAngle: pie.endAngle,
      index: i,
    } as IWheelPie;
  });
};
