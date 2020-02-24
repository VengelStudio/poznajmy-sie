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

// export const getRandomColor = () => {
//   var colors = [
//     {
//       colorName: 'Czerwony',
//       colorCode: '#FF0000',
//     },
//     {
//       colorName: 'Niebieski',
//       colorCode: '0000FF',
//     },
//     {
//       colorName: 'Zielony',
//       colorCode: '008000',
//     },
//     {
//       colorName: 'Fioletowy',
//       colorCode: '#800080',
//     },
//     {
//       colorName: 'Beżowy',
//       colorCode: '#C2B280',
//     },
//     {
//       colorName: 'Pomarańczowy',
//       colorCode: '#D4A017',
//     },
//     {
//       colorName: '#Różowy',
//       colorCode: '#C48793',
//     },
//     {
//       colorName: 'Szary',
//       colorCode: '#808080',
//     },
//     {
//       colorName: 'Brązowy',
//       colorCode: '#964B00',
//     },
//     {
//       colorName: 'Morski',
//       colorCode: '#008080',
//     },
//     {
//       colorName: 'Oliwkowy',
//       colorCode: '#808000',
//     },
//     {
//       colorName: 'Czerwony',
//       colorCode: '#FF0000',
//     },
//     {
//       colorName: 'Czerwony',
//       colorCode: '#FF0000',
//     },
//     {
//       colorName: 'Czerwony',
//       colorCode: '#FF0000',
//     },
//     {
//       colorName: 'Czerwony',
//       colorCode: '#FF0000',
//     },
//     {
//       colorName: 'Czerwony',
//       colorCode: '#FF0000',
//     },
//     {
//       colorName: 'Czerwony',
//       colorCode: '#FF0000',
//     },
//     {
//       colorName: 'Czerwony',
//       colorCode: '#FF0000',
//     },
//     {
//       colorName: 'Czerwony',
//       colorCode: '#FF0000',
//     },
//     {
//       colorName: 'Czerwony',
//       colorCode: '#FF0000',
//     },
//   ];
//   var randomNumber = Math.floor(Math.random() * 20);
//   var name = colors[randomNumber].colorName;
//   var code = colors[randomNumber].colorCode;
//   return code;
// };
