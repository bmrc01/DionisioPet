import React, { useEffect, useRef } from "react";
import { Platform, ScrollView, View } from "react-native";
import { Card, Text, Button, Chip, Checkbox } from "react-native-paper";

export type pet = {
    _id: string
    name: string,
    image: string,
    race: string
    vaccinated: boolean,
    tag: string
};

type vaccine = {
    _id: string,
    name: string,
    vaccineDate: string
}

type fullPetDetails = {
    createdAt: string,
    vaccines: vaccine[],
    description: string
}

export type fullPet = pet & fullPetDetails;

export type ItemProps = {
    pet: pet;
    onPress: () => void;
};

export function PetCard({ pet, onPress }: ItemProps): JSX.Element {
    return (
        <Card style={{}} onPress={onPress}>
            <Card.Cover
                source={{ uri: pet.image }}
                resizeMethod="scale"
            />
            <Card.Content style={{ marginTop: 4 }}>
                <View style={{ flexDirection: "row" }}>
                    <View style={{ flex: 1 }}>
                        <Text variant="headlineMedium" >{pet.name}</Text>
                        <Text variant="bodyMedium">{pet.race}</Text>
                    </View>

                    <View style={{ flexDirection: "row", alignSelf: "flex-start", alignItems: "center" }}>
                        <Text variant="labelLarge">Vacinado</Text>
                        <Checkbox status={pet.vaccinated ? "checked" : "unchecked"} ></Checkbox>
                    </View>
                </View>
                {
                    Platform.OS === "web" ?
                        (<View style={{ alignItems: "stretch", flex: 1, flexDirection: "row", flexWrap: "wrap" }}>
                            {/* {JSON.parse(pet.tag).map(tag => (<Chip style={{ margin: 4 }}>{tag}</Chip>))} */}
                        </View>)
                        :
                        (
                            <ScrollView
                                nestedScrollEnabled={true}
                                horizontal
                                showsHorizontalScrollIndicator={true}
                            >
                                {pet.tag && JSON.parse(pet.tag).map(tag => (
                                    <View style={{ marginVertical: 8, marginLeft: 0, marginRight: 4 }} key={tag}>
                                        <Chip style={{}}>{tag}</Chip>
                                    </View>
                                ))}
                            </ScrollView>
                        )
                }
            </Card.Content>
        </Card>
    );
}