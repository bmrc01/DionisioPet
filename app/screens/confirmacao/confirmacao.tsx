import React from "react";
import { useNavigation } from "@react-navigation/native";

import { View, Image, StyleSheet, Dimensions } from "react-native";
import { Button, Dialog, Portal, Text } from "react-native-paper";
import { SafeAreaView, useSafeAreaInsets } from "react-native-safe-area-context";

import ConfettiCannon from 'react-native-confetti-cannon';
import { fullPet } from "../../components/petCard";
import { AdoptedPetsContext } from "../../utils/adoptedPetsContext";


export function Confirmacao({ route }: { route: any }): JSX.Element {
    const { pet }: { pet: fullPet } = route.params;
    const navigation = useNavigation();
    const insets = useSafeAreaInsets();

    const [shoot, setShoot] = React.useState(false);

    const { adoptedPets, setAdoptedPets, addPet } = React.useContext(AdoptedPetsContext);

    React.useEffect(() => {
        setShoot(true)
    }, [shoot]);


    const windowWidth = Dimensions.get('window').width;
    const windowHeight = Dimensions.get('window').height;

    React.useEffect(() => {
        navigation.setOptions({ headerShown: false })
    })

    React.useEffect(() => {
        navigation.addListener("beforeRemove", (e) => {
            if (e.data.action.type === "GO_BACK") {
                e.preventDefault();
                return;
            }

            navigation.dispatch(e.data.action);
        })
    });

    return (
        <SafeAreaView style={[{ flex: 1, paddingBottom: insets.bottom }]}>
            {shoot && (<ConfettiCannon
                explosionSpeed={350}
                fallSpeed={3000}
                count={100}
                fadeOut
                origin={{ x: windowWidth / 2, y: windowHeight / 2 }}
                onAnimationEnd={() => {
                    setTimeout(() => {
                        setShoot(false);
                    }, 2000);
                }}
            />)}

            <View style={[{ marginTop: 32, alignItems: "center", justifyContent: "center" }]}>

            </View>
            <View
                style={[
                    { flex: 1, alignItems: "center", justifyContent: "center" }
                ]}>
                <Text
                    variant="titleLarge"
                    style={{ marginBottom: 32 }}>Parabéns!</Text>
                <Image
                    style={{ height: 300, width: 300, borderRadius: 8, marginBottom: 16 }}
                    source={{ uri: pet.image }} />
                <Text
                    variant="titleLarge"
                    style={{ marginBottom: 16 }}>Você acaba de adotar {pet.name}</Text>
                <Text
                >Em breve entraremos em contato</Text>
            </View>
            <View style={[{ marginHorizontal: 16, justifyContent: "flex-end" }]}>
                <Button onPress={() => {
                    addPet(pet._id)
                    navigation.navigate("Home")
                }} mode="contained">Continuar</Button>
            </View>
        </SafeAreaView>
    )
}

const styles = StyleSheet.create({
    debug: {
        borderColor: "red",
        borderWidth: 1
    }
})