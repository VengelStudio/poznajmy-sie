import React from 'react';
import {View, StyleSheet, TouchableOpacity, Text, Button} from 'react-native';

interface ButtonProps {
  onClick: () => void;
  text: string;
  secondary?: boolean;
}

const CustomButton: React.FC<ButtonProps> = ({onClick, text, secondary}) => {
  return (
    <TouchableOpacity
      onPress={() => onClick()}
      style={[styles.button, secondary ? styles.secondaryStyle : null]}>
      <Text style={styles.buttonText}>{text}</Text>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 180,
    display: 'flex',
    paddingVertical: 5,
    paddingHorizontal: 20,
    borderRadius: 40,
    borderWidth: 2,
    borderColor: 'transparent',
    backgroundColor: '#D30C7B',
    justifyContent: 'center',
    alignItems: 'center',
    elevation: 4,
    opacity: 0.9,
  },
  buttonText: {
    fontFamily: 'simplifica',
    fontSize: 35,
    color: 'white',
  },
  secondaryStyle: {
    backgroundColor: '#6e0f44',
    opacity: 0.9,
  },
});

export default CustomButton;
