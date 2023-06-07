import React from 'react';

import { StyleSheet, Dimensions, useColorScheme } from 'react-native';
import { Provider as PaperProvider, adaptNavigationTheme } from "react-native-paper";
import { StatusBar } from 'expo-status-bar';
import Constants from 'expo-constants';

import * as NavigationBar from 'expo-navigation-bar';
import * as SecureStore from 'expo-secure-store';

import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';

import { Detalhes } from './screens/detalhes/detalhes';
import { SettingsModal } from './components/settingsModal';
import { CustomNavigationBar } from './components/customNavigationBar';
import { Home } from './screens/home/home';
import { Settings } from './screens/settings/settings';

//IMPORTA OS TEMAS DO PAPER E DO NAVIGATION
import {
  DarkTheme as NavigationDarkTheme,
  DefaultTheme as NavigationDefaultTheme,
} from '@react-navigation/native';
import {
  MD3DarkTheme,
  MD3LightTheme,
} from 'react-native-paper';

import { PreferencesContext } from './utils/preferencesContext';
import { useMaterial3Theme } from '@pchmn/expo-material3-theme';
import { Form } from './screens/form/form';
import { Confirmacao } from './screens/confirmacao/confirmacao';

const themeKeyName = "theme";

async function save(key: string, value: any) {
  await SecureStore.setItemAsync(key, JSON.stringify(value));

  console.log("Salvo: " + key + " : " + JSON.stringify(value));
}

async function getValueFor(key: string): Promise<any> {
  let result = await SecureStore.getItemAsync(key);
  console.log("Lido: " + key + " : " + result);

  return JSON.parse(result);
}

export enum tema {
  light,
  dark,
  system
}

function isThemeDark(themeId, deviceTheme) {
  switch (themeId) {
    case tema.light:
      return false;

    case tema.dark:
      return true;

    case tema.system:
      if (deviceTheme === 'dark') {
        return true
      }
      return false;
  }
}

const Stack = createNativeStackNavigator();

export default function App(): JSX.Element {
  const { theme } = useMaterial3Theme();

  const myDarkTheme = { ...MD3DarkTheme, colors: theme.dark }
  const myLigthTheme = { ...MD3LightTheme, colors: theme.light }

  const { LightTheme, DarkTheme } = adaptNavigationTheme({
    reactNavigationLight: NavigationDefaultTheme,
    reactNavigationDark: NavigationDarkTheme,
  });

  const CombinedDefaultTheme = {
    ...myLigthTheme,
    ...LightTheme,
    colors: {
      ...LightTheme.colors,
      ...myLigthTheme.colors
    },
  };

  const CombinedDarkTheme = {
    ...myDarkTheme,
    ...DarkTheme,
    colors: {
      ...DarkTheme.colors,
      ...myDarkTheme.colors
    },
  };

  const colorScheme = useColorScheme();
  const [appTheme, setAppTheme] = React.useState(2);

  const toggleTheme = React.useCallback((id) => {
    save(themeKeyName, id).then(() => {
      setAppTheme(id);
    })
  }, [appTheme]);

  const preferences = React.useMemo(
    () => ({
      toggleTheme,
      appTheme,
    }),
    [toggleTheme, appTheme]
  );

  getValueFor(themeKeyName).then(result => {
    if (result !== undefined && result !== null) {
      setAppTheme(result);
    }
  });

  NavigationBar.setPositionAsync('absolute')
  NavigationBar.setBackgroundColorAsync('transparent')

  return (
    <PreferencesContext.Provider value={preferences}>
      <StatusBar
        style={isThemeDark(appTheme, colorScheme) ? "light" : "dark"} />
      <PaperProvider
        theme={isThemeDark(appTheme, colorScheme) ? CombinedDarkTheme : CombinedDefaultTheme}>
        <NavigationContainer
          theme={isThemeDark(appTheme, colorScheme) ? CombinedDarkTheme : CombinedDefaultTheme}>
          <Stack.Navigator
            initialRouteName='DionisioPet'
            screenOptions={{
              header: (props) => <CustomNavigationBar {...props} />,
            }}
          >
            <Stack.Group>
              <Stack.Screen name="Home" component={Home} />
              <Stack.Screen name="Detalhes" component={Detalhes} />
              <Stack.Screen name="Form" component={Form} />
              <Stack.Screen name="Confirmação" component={Confirmacao} />
              <Stack.Screen name="Configurações" component={Settings} />
            </Stack.Group>
            <Stack.Group screenOptions={{ presentation: 'transparentModal', headerShown: false }}>
              <Stack.Screen name="SettingsModal" component={SettingsModal} />
            </Stack.Group>
          </Stack.Navigator>
        </NavigationContainer>
      </PaperProvider>
    </PreferencesContext.Provider>
  );
}

