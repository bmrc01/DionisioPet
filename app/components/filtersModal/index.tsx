import * as React from "react";
import { View } from "react-native";
import { Button, Card, Chip, Divider, IconButton, Modal, Text } from "react-native-paper";

export function FilterModal({ navigation, visible, usableTags, close }: { navigation: any, visible: boolean, usableTags: string[], close: (selectedTags: string[]) => void }): React.ReactElement {

    const [checkboxes, setCheckboxes] = React.useState(() => {
        const initialState = {};
        usableTags.forEach(item => {
            initialState[item] = false;
        });
        return initialState;
    });

    // Função para atualizar o estado quando um checkbox for clicado
    function handleCheckboxChange(item) {
        setCheckboxes(prevState => ({
            ...prevState,
            [item]: !prevState[item]
        }));
    };

    function clearAll() {
        const newCheckboxes = { ...checkboxes };
        Object.keys(newCheckboxes).forEach(item => {
            newCheckboxes[item] = false;
        });
        setCheckboxes(newCheckboxes);
    };

    return (
        <Modal
            visible={visible}
            onDismiss={() => close(null)}
            contentContainerStyle={{}}
            style={{ margin: 16 }}
        >
            <Card mode="elevated">
                <Card.Content style={{ margin: 8 }}>
                    <Text style={{ marginBottom: 16 }} variant="titleLarge">Filtrar por categoria</Text>
                    <View style={{ flexDirection: "row", flexWrap: "wrap" }}>
                        {
                            usableTags.sort().map((item, index) => {
                                return (
                                    <View key={index} style={{ margin: 4 }}>
                                        <Chip
                                            selected={checkboxes[item]}
                                            mode="outlined"
                                            style={{ margin: 2 }}
                                            onPress={() => {
                                                handleCheckboxChange(item)
                                            }}>{item}</Chip>
                                    </View>
                                )
                            })
                        }
                    </View>
                    <View style={{}}>
                        <Button icon="delete" style={{ alignSelf: "flex-start", marginBottom: 8 }} onPress={() => clearAll()}>Limpar</Button>
                        <Button mode="contained" onPress={() => {
                            close(Object.keys(checkboxes).filter((prop) => checkboxes[prop] !== false))
                        }}>Aplicar</Button>
                    </View>
                </Card.Content>
            </Card>
        </Modal>
    )
}
