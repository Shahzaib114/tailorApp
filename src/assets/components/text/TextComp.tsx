import React from 'react';
import {Text as RNText, StyleSheet, TextStyle} from 'react-native';
import { Colors } from '../../../utils/appConstants';
// import {Typography} from '../../assets/fonts/Typography';
// import {textProps} from '../../utils/AppInterfaceTypes';
const generateTextStyle = ({
  style,
  color,
  letterSpacing,
  theme,
}: any): TextStyle[] => {
  const textColor = theme === 'dark' ? Colors.base.White : color;

  return [
    style as TextStyle,
    //@ts-ignore
    {color: textColor},
    //@ts-ignore
    letterSpacing && {letterSpacing: Typography.letterSpacing[letterSpacing]},
  ];
};

export const TextComp: React.FC<textProps> = ({
  label,
  style,
  color,
  letterSpacing,
  ...props
}) => {
  //@ts-ignore
  const textStyle = generateTextStyle({
    style,
    color,
    letterSpacing,
  });

  return (
    <RNText
      style={[styles.txtStyles, StyleSheet.flatten(textStyle)]}
      {...props}>
      {label}
    </RNText>
  );
};

const styles = StyleSheet.create({
  txtStyles: {
    color: Colors.base.Black,
  },
});
