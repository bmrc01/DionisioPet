import React, { useContext, useState } from "react";
import { Divider, List, RadioButton, Surface } from "react-native-paper";
import { PreferencesContext } from "../../utils/preferencesContext";


export function ThemeSelector(): JSX.Element {
    const { toggleTheme, appTheme } = React.useContext(PreferencesContext);

    return (
        <List.Accordion title="Tema" description="Deixe o app com a sua cara">
            <Surface mode="flat" elevation={1} style={{ borderRadius: 8 }}>
                <List.Item
                    style={{ marginLeft: 16 }}
                    title="Claro"
                    description="Mata seus olhos aos poucos..."
                    left={() => <List.Icon icon="emoticon-dead-outline" />}
                    right={() => <RadioButton
                        value={'0'}
                        status={appTheme === 0 ? "checked" : "unchecked"}
                        onPress={() => toggleTheme(0)}></RadioButton>} />
                <Divider />
                <List.Item
                    style={{ marginLeft: 16 }}
                    title="Escuro"
                    description="A unica escolha certa."
                    left={() => <List.Icon icon="weather-night" />}
                    right={() => <RadioButton
                        value={'1'}
                        status={appTheme === 1 ? "checked" : "unchecked"}
                        onPress={() => toggleTheme(1)}></RadioButton>} />
                <Divider />
                <List.Item
                    style={{ marginLeft: 16 }}
                    title="Sistema"
                    description="Acompanha o tema do sistema"
                    left={() => <List.Icon icon="theme-light-dark" />}
                    right={() => <RadioButton
                        value={'2'}
                        status={appTheme === 2 ? "checked" : "unchecked"}
                        onPress={() => toggleTheme(2)} />} />
            </Surface>
        </List.Accordion>
    )
}