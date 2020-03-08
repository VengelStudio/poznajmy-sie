var React = require('react-native');

var {StyleSheet} = React;

module.exports = StyleSheet.create({
  Button: {
    display: 'flex',
    height: '8%',
    width: '50%',
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#D30C7B',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
  },
  ButtonText: {
    fontFamily: 'simplifica',
    fontSize: 35,
    color: 'white',
  },
  actionButtonBottomMargin: {
    marginBottom: 170,
  },
});
