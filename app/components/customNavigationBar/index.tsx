import React from "react";

import { Appbar, Menu, Searchbar, Text } from "react-native-paper";
import { getHeaderTitle } from '@react-navigation/elements';
import { NativeStackNavigationOptions } from "@react-navigation/native-stack";
import { View } from "react-native";


export function CustomNavigationBar({ navigation, route, options, back }: { back?: { title: string; }; options: NativeStackNavigationOptions; route: any; navigation: any; }) {
    const title = getHeaderTitle(options, route.name);

    return (
        <Appbar.Header mode="small" elevated>
            {back ? <Appbar.BackAction onPress={navigation.goBack} /> : null}
            <Appbar.Content title={title} />

            {options.headerRight && options.headerRight(navigation)}
        </Appbar.Header>
    );
}