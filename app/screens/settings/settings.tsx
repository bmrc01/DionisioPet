import React, { useContext, useState } from "react";
import { View, Text, ScrollView, Alert } from "react-native";
import { List, Switch } from "react-native-paper";
import { PreferencesContext } from "../../utils/preferencesContext";
import { ThemeSelector } from "../../components/themeSelector";

export function Settings({ navigation }): JSX.Element {

    return (
        <ScrollView style={{ padding: 8 }}>
            <List.Section>
                <ThemeSelector />
            </List.Section>
        </ScrollView>
    )
}