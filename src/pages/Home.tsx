import React, {useCallback, useState} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  useColorScheme,
  TouchableHighlight,
  Text,
} from 'react-native';
// import {useBackHandler} from '@react-native-community/hooks';

const Home = () => {
  // useBackHandler(() => {
  //   return true;
  // });

  const colorScheme = useColorScheme();

  const [isTurnOn, setTurnOn] = useState(false);

  const onPress = useCallback(() => {
    setTurnOn(!isTurnOn);
  }, [isTurnOn]);

  const isDarkTheme = colorScheme === 'dark';
  const barStyle = isDarkTheme ? 'light-content' : 'dark-content';
  const backgroundColor = isDarkTheme ? '#000' : '#fff';
  const underlayColor = isTurnOn ? '#ff616f' : '#af52d5';
  const styles = createStyles(isDarkTheme, isTurnOn);

  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor={backgroundColor} />
      <View style={styles.container}>
        <View style={styles.containerMain} />
        <View style={styles.containerFooter}>
          <TouchableHighlight
            style={styles.button}
            underlayColor={underlayColor}
            onPress={onPress}>
            <Text style={styles.buttonText}>
              {isTurnOn ? 'Выключить' : 'Включить'}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </>
  );
};

// 40% padding
// #7c1fa3
// #fffeff
const createStyles = (isDarkTheme: boolean, isTurnOn: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: isDarkTheme ? '#000' : '#fff',
      flex: 1,
    },
    containerMain: {
      flex: 1,
    },
    containerFooter: {
      marginBottom: 50,
      alignContent: 'center',
      justifyContent: 'center',
      flexDirection: 'row',
    },
    button: {
      borderRadius: 34,
      paddingHorizontal: 25,
      paddingVertical: 8,
      backgroundColor: isTurnOn ? '#ff1744' : '#7c1fa3',
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: '#eee',
    },
  });

export {Home};
