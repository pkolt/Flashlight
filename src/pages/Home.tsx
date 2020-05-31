import React, { useCallback, useState, useEffect, useMemo } from 'react';
import { View, StyleSheet, StatusBar, useColorScheme, TouchableHighlight, Text } from 'react-native';

import lantern from 'react-native-lantern';
import I18n from '../i18n/i18n';
import { Colors } from '../styles/colors';

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
    return lantern.subscribe('onTurn', (event) => setTurnState(event.value));
  }, []);

  const colorScheme = useColorScheme();

  const handlePress = useCallback(async () => {
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
  const statusBarBgColor = isDarkTheme ? Colors.BLACK : Colors.WHITE;
  const btnUnderlayColor = turnState ? Colors.LIGHT_CRIMSON : Colors.LIGHT_PURPLE;
  const styles = useMemo(() => createStyles(isDarkTheme, turnState), [isDarkTheme, turnState]);

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
            onPress={handlePress}>
            <Text style={styles.buttonText}>{turnState ? I18n.t('turnOff') : I18n.t('turnOn')}</Text>
          </TouchableHighlight>
        </View>
      </View>
    </>
  );
};

const createStyles = (isDarkTheme: boolean, isTurnOn: boolean) =>
  StyleSheet.create({
    container: {
      backgroundColor: isDarkTheme ? Colors.BLACK : Colors.WHITE,
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
      backgroundColor: isTurnOn ? Colors.CRIMSON : Colors.PURPLE,
    },
    buttonText: {
      fontSize: 18,
      fontWeight: 'bold',
      color: Colors.GRAY,
    },
  });

export { Home };
