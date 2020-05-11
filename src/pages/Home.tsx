import React, {useCallback, useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  StatusBar,
  useColorScheme,
  TouchableHighlight,
  Text,
} from 'react-native';

// @ts-ignore
import lantern from 'react-native-lantern';

const Home = () => {
  const [disabledBtn, setDisabledBtn] = useState(true);
  const [turnState, setTurnState] = useState(false);

  useEffect(() => {
    (async () => {
      try {
        await lantern.ready();
        setDisabledBtn(false);
      } catch (err) {
        console.error(err);
      }
    })();
  }, []);

  useEffect(() => {
    return lantern.subscribe('onTurn', (event: any) =>
      setTurnState(event.value),
    );
  }, []);

  const colorScheme = useColorScheme();

  const onPress = useCallback(async () => {
    const value = !turnState;
    try {
      await lantern.turn(value);
      setTurnState(value);
    } catch (err) {
      console.log(err);
    }
  }, [turnState]);

  const isDarkTheme = colorScheme === 'dark';
  const barStyle = isDarkTheme ? 'light-content' : 'dark-content';
  const statusBarBgColor = isDarkTheme ? '#000' : '#fff';
  const btnUnderlayColor = turnState ? '#ff616f' : '#af52d5';
  const styles = createStyles(isDarkTheme, turnState);

  return (
    <>
      <StatusBar barStyle={barStyle} backgroundColor={statusBarBgColor} />
      <View style={styles.container}>
        <View style={styles.containerMain} />
        <View style={styles.containerFooter}>
          <TouchableHighlight
            style={styles.button}
            disabled={disabledBtn}
            underlayColor={btnUnderlayColor}
            onPress={onPress}>
            <Text style={styles.buttonText}>
              {turnState ? 'Выключить' : 'Включить'}
            </Text>
          </TouchableHighlight>
        </View>
      </View>
    </>
  );
};

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
