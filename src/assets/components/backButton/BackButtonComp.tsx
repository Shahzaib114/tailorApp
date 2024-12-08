import { StyleSheet, TouchableOpacity } from 'react-native';
import React from 'react';
import { useNavigation, useNavigationState } from '@react-navigation/native';
import { SvgXml } from 'react-native-svg';
import { BackButtonArrow, BlackBackButtonArrow, Neutral600BackButtonArrow } from './BackButtonArrow';
import { TextComp } from '../text/TextComp';
import { GlobalStyles } from '../../../utils/GlobalStyles';
import { Colors } from '../../../utils/appConstants';
import { horizontalScale, verticalScale } from '../../../utils';

const BackButtonComp = ({
  prevName = '',
  navigateToPage = '',
  tempStyle,
  containerStyle = {},
  textStyle,
  textColor,
  onPress,
}: any) => {
  const navigation: any = useNavigation();
  const routes = useNavigationState(state => state?.routes);
  const currentRouteIndex = routes?.length - 1;
  const hasPreviousScreen = currentRouteIndex > 0;

  const previousRouteName =
    prevName !== '' ? prevName : routes[currentRouteIndex - 1]?.name;
  const handlePress = () => {
    if (onPress) {
      onPress();
    } else if (hasPreviousScreen) {
      navigation.goBack();
    } else if (navigateToPage !== '') {
      navigation.navigate(navigateToPage);
    } else {
      navigation.goBack();
    }
  };
  // function horizontalScale(arg0: number) {
  //   throw new Error('Function not implemented.');
  // }

  return (
    <TouchableOpacity
      onPress={handlePress}
      style={[tempStyle ? styles.button : styles.button2, containerStyle]}>
      <SvgXml
        xml={
          textColor === '#000000'
            ? BlackBackButtonArrow
            : textColor === '#666666'
              ? Neutral600BackButtonArrow
              : BackButtonArrow
        }
      />

      <TextComp
        label={previousRouteName}
        style={[
          GlobalStyles.heading3Medium,
          {
            paddingLeft: horizontalScale(12),
          },
          textStyle,
        ]}
        color={textColor ? textColor : Colors.base.White}
      />
    </TouchableOpacity>
  );
};

export default BackButtonComp;

const styles = StyleSheet.create({
  button2: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  button: {
    flexDirection: 'row',
    alignItems: 'center',
    position: 'absolute',
    top: verticalScale(65),
    left: horizontalScale(42),
  },
});
