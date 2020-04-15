import React from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  useColorScheme,
  // BackHandler,
} from 'react-native';
// import {useBackHandler} from '@react-native-community/hooks';

const Home = () => {
  // useBackHandler(() => {
  //   BackHandler.exitApp();
  //   return true;
  // });

  const colorScheme = useColorScheme();
  const isDarkTheme = colorScheme === 'dark';
  const barStyle = isDarkTheme ? 'light-content' : 'dark-content';
  const backgroundColor = isDarkTheme ? '#000' : '#fff';
  const styles = createStyles(isDarkTheme);

  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      <View style={styles.container} />
    </>
  );
};

// #7c1fa3
const createStyles = (isDarkTheme: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: isDarkTheme ? '#000' : '#fff',
      flex: 1,
    },
  });

export {Home};
