import React, { useEffect, useState } from "react";
import { View, Image, ToastAndroid, ScrollView } from "react-native";
import { ActivityIndicator, Card, Text, FAB, Divider, List, Button, Portal, Dialog } from "react-native-paper";
import { useSafeAreaInsets } from 'react-native-safe-area-context';

import axiosClient from "../../utils/apiClient";
import { fullPet } from "../../components/petCard";
import { Alert } from "react-native";
import { mockVacinasPet } from "../../mock";

export function Detalhes({ route, navigation }): JSX.Element {
    const { id } = route.params;
    const [pet, setPet] = useState<fullPet>(null);
    const [isLoading, setLoading] = useState(true);

    const insets = useSafeAreaInsets();

    useEffect(() => {
        navigation.setOptions({
            animation: "fade"
        });

        axiosClient.get(`/pets/${id}`)
            .then((response) => {
                setPet(response.data);
                setLoading(false);
            })
            .catch((reason) => {
                navigation.goBack();
            })
    }, [])

    if (isLoading) {
        return (
            <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center' }}>
                <ActivityIndicator size="large" animating={true} />
                <Text variant="bodySmall">Carregando</Text>
            </View>
        )
    }

    return (
        <View style={{ flex: 1 }}>
            <ScrollView>
                <Image style={{ height: 250 }} source={{ uri: pet.image }}></Image>
                <Card style={{ borderTopLeftRadius: 0, borderTopRightRadius: 0 }}>
                    <Card.Content style={{ paddingHorizontal: 8, paddingTop: 8 }}>
                        <View style={{ flexDirection: 'row' }}>
                            <View style={{ flex: 1 }}>
                                <Text variant="headlineMedium" >{pet.name}</Text>
                                <Text variant="bodyMedium">{pet.race}</Text>
                            </View>
                            <View style={{}}>
                                <Text style={{ alignSelf: "flex-end" }} variant="labelMedium">Criado em: {new Date(pet.createdAt).toLocaleDateString("pt-BR")}</Text>
                            </View>
                        </View>
                        {
                            pet.description &&
                            <View style={{ marginTop: 8 }}>
                                <Text variant="bodyLarge" style={{ marginTop: 4, textAlign: 'justify' }}>
                                    {pet.description}
                                </Text>
                            </View>
                        }
                    </Card.Content>
                </Card>
                <View style={{ padding: 8 }}>
                    <Text variant="headlineSmall">
                        Vacinas
                    </Text>

                    {pet.vaccines.map((vacina, index) => (
                        <View key={index}>
                            <List.Item title={vacina.name} description={new Date(vacina.vaccineDate).toLocaleDateString("pt-BR")} left={props => <List.Icon icon="hospital-box" />} />
                            {index !== mockVacinasPet.length - 1 && <Divider></Divider>}
                        </View>
                    ))}
                </View>
            </ScrollView >
            <FAB
                label="Adotar"
                icon="heart"
                style={{
                    position: 'absolute',
                    margin: 16,
                    marginBottom: insets.bottom + 8,
                    right: 0,
                    bottom: 0
                }}
                onPress={() => navigation.navigate("Form", {
                    pet: pet
                })}

            // onPress={() => Alert.alert("", `Deseja adotar ${pet.name}?`, [
            //     {
            //         text: "Não"
            //     },
            //     {
            //         text: "Sim",
            //         onPress: () => {
            //             navigation.navigate("Form", {
            //                 pet: pet
            //             })
            //         }
            //     }
            // ])}
            />
        </View >
    );
}